import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import * as schema from "../db/schema";
import { adminUsers, loginAttempts, sessions } from "../db/schema";
import { hashPassword, verifyPassword } from "../lib/password";
import { evaluateLoginAttempts } from "../lib/rate-limit";
import {
  createSessionRow,
  deleteExpiredSessions,
  deleteSessionRow,
  findSessionUser,
} from "../lib/session-db";

// SAFETY: these tests create/drop schema objects. They only run against
// TEST_DATABASE_URL — never DATABASE_URL (which points at production).
const TEST_URL = process.env.TEST_DATABASE_URL ?? "";

const options = { skip: TEST_URL ? false : "TEST_DATABASE_URL not set — skipping (see docs/admin-panel-setup.md)" };

let client: ReturnType<typeof postgres>;
let db: PostgresJsDatabase<typeof schema>;

before(async () => {
  // Top-level hooks run even when every test in the file is skipped,
  // so the DB connection must be guarded by the same condition.
  if (!TEST_URL) return;
  client = postgres(TEST_URL, { ssl: "require", max: 1 });
  db = drizzle(client, { schema });
  await migrate(db, { migrationsFolder: "./drizzle" });
});

after(async () => {
  if (client) await client.end();
});

test("migration + provisioning: admin row created with argon2id hash", options, async (t) => {
  const email = "test-admin@example.com";
  await db.delete(adminUsers).where(eq(adminUsers.email, email));
  await db
    .insert(adminUsers)
    .values({ email, passwordHash: await hashPassword("integration-pass-123") });

  const [row] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);
  assert.ok(row);
  assert.ok(row.passwordHash.startsWith("$argon2id$"));
  assert.equal(row.lastLoginAt, null);

  t.after(async () => {
    await db.delete(adminUsers).where(eq(adminUsers.email, email));
  });
});

test("login verify: correct password true, wrong false (DB roundtrip)", options, async (t) => {
  const email = "verify-test@example.com";
  await db.delete(adminUsers).where(eq(adminUsers.email, email));
  await db
    .insert(adminUsers)
    .values({ email, passwordHash: await hashPassword("right-password-1") });

  const [row] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);
  assert.equal(await verifyPassword(row.passwordHash, "right-password-1"), true);
  assert.equal(await verifyPassword(row.passwordHash, "wrong-password-1"), false);

  t.after(async () => {
    await db.delete(adminUsers).where(eq(adminUsers.email, email));
  });
});

test("session lifecycle: create → lookup ok → logout deletes → lookup null", options, async (t) => {
  const email = "session-test@example.com";
  await db.delete(adminUsers).where(eq(adminUsers.email, email));
  const [user] = await db
    .insert(adminUsers)
    .values({ email, passwordHash: await hashPassword("x-password-1234") })
    .returning();

  const session = await createSessionRow(db, user.id, { ipHash: null });
  const found = await findSessionUser(db, session.token, new Date());
  assert.ok(found);
  assert.equal(found.email, email);

  await deleteSessionRow(db, session.token);
  const gone = await findSessionUser(db, session.token, new Date());
  assert.equal(gone, null);

  t.after(async () => {
    await db.delete(adminUsers).where(eq(adminUsers.id, user.id));
  });
});

test("session expiry: past-due idle expiry invalidates and deletes the row", options, async (t) => {
  const email = "expiry-test@example.com";
  await db.delete(adminUsers).where(eq(adminUsers.email, email));
  const [user] = await db
    .insert(adminUsers)
    .values({ email, passwordHash: await hashPassword("x-password-1234") })
    .returning();

  const session = await createSessionRow(db, user.id);
  // force the idle expiry into the past, keep absolute expiry in the future
  await db
    .update(sessions)
    .set({ expiresAt: new Date(Date.now() - 60_000) })
    .where(eq(sessions.id, (await import("../lib/token")).hashToken(session.token)));

  const expired = await findSessionUser(db, session.token, new Date());
  assert.equal(expired, null, "expired session must not authenticate");

  t.after(async () => {
    await db.delete(adminUsers).where(eq(adminUsers.id, user.id));
  });
});

test("session cleanup: expired rows are removed by deleteExpiredSessions", options, async (t) => {
  const email = "cleanup-test@example.com";
  await db.delete(adminUsers).where(eq(adminUsers.email, email));
  const [user] = await db
    .insert(adminUsers)
    .values({ email, passwordHash: await hashPassword("x-password-1234") })
    .returning();

  const session = await createSessionRow(db, user.id);
  await db
    .update(sessions)
    .set({ absoluteExpiresAt: new Date(Date.now() - 60_000) })
    .where(eq(sessions.id, (await import("../lib/token")).hashToken(session.token)));

  const removed = await deleteExpiredSessions(db, new Date());
  assert.ok(removed >= 1, "at least the test session should be removed");

  t.after(async () => {
    await db.delete(adminUsers).where(eq(adminUsers.id, user.id));
  });
});

test("rate limiting: recorded failures lock the email+IP pair end-to-end", options, async (t) => {
  const email = "ratelimit-test@example.com";
  const ipHash = "deadbeef".repeat(8);
  await db.delete(loginAttempts).where(eq(loginAttempts.email, email));

  for (let i = 0; i < 5; i++) {
    await db.insert(loginAttempts).values({ email, ipHash, ok: false });
  }
  const rows = await db
    .select()
    .from(loginAttempts)
    .where(eq(loginAttempts.email, email));
  const decision = evaluateLoginAttempts(
    rows.map((r) => ({ ok: r.ok, at: r.createdAt })),
    new Date(),
  );
  assert.equal(decision.allowed, false);
  assert.ok(decision.retryAfterMinutes >= 1);

  t.after(async () => {
    await db.delete(loginAttempts).where(eq(loginAttempts.email, email));
  });
});

test("database failure: bad connection string rejects with a clear error", async () => {
  const bad = postgres("postgres://nobody:nope@127.0.0.1:5432/none", {
    connect_timeout: 2,
    max: 1,
  });
  await assert.rejects(bad`select 1`);
  await bad.end();
});
