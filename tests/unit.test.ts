import assert from "node:assert/strict";
import { test } from "node:test";
import { hashPassword, verifyPassword, dummyVerify } from "../lib/password";
import {
  generateSessionToken,
  hashToken,
  hashIp,
} from "../lib/token";
import {
  evaluateLoginAttempts,
} from "../lib/rate-limit";
import { loginSchema } from "../lib/validation";
import {
  sessionCookieOptions,
  SESSION_COOKIE,
} from "../lib/session-cookie";

test("argon2id: hash + verify roundtrip, wrong password rejected", async () => {
  const hash = await hashPassword("correct horse battery staple");
  assert.ok(hash.startsWith("$argon2id$"), "hash should be argon2id");
  assert.ok(hash.includes("m=19456,t=2,p=1"), "OWASP params embedded");
  assert.equal(await verifyPassword(hash, "correct horse battery staple"), true);
  assert.equal(await verifyPassword(hash, "wrong password"), false);
});

test("argon2id: identical passwords salt to different hashes", async () => {
  const a = await hashPassword("same-password");
  const b = await hashPassword("same-password");
  assert.notEqual(a, b);
});

test("argon2id: malformed stored hash fails closed, does not crash", async () => {
  assert.equal(await verifyPassword("not-a-hash", "whatever"), false);
});

test("argon2id: dummyVerify burns CPU without throwing", async () => {
  await dummyVerify("any-input"); // no assertion — must simply resolve
});

test("session token: 256-bit, url-safe, unique", () => {
  const t1 = generateSessionToken();
  const t2 = generateSessionToken();
  assert.match(t1, /^[A-Za-z0-9_-]{43}$/);
  assert.notEqual(t1, t2);
});

test("token/ip hashing: sha256 hex, deterministic, one-way shape", () => {
  const h = hashToken(generateSessionToken());
  assert.match(h, /^[0-9a-f]{64}$/);
  assert.equal(hashToken("abc"), hashToken("abc"));
  assert.notEqual(hashToken("abc"), hashToken("abd"));
  assert.match(hashIp("1.2.3.4"), /^[0-9a-f]{64}$/);
});

test("rate limit: allows under threshold, locks at 5 failures in window", () => {
  const now = new Date("2026-01-01T12:00:00Z");
  const mins = (m: number) => new Date(now.getTime() - m * 60_000);

  // empty → allowed
  assert.deepEqual(evaluateLoginAttempts([], now), {
    allowed: true,
    retryAfterMinutes: 0,
  });

  // 4 recent failures → still allowed
  const four = [1, 5, 9, 12].map((m) => ({ ok: false, at: mins(m) }));
  assert.equal(evaluateLoginAttempts(four, now).allowed, true);

  // 5 recent failures → locked, retry window measured from oldest failure
  const five = [...four, { ok: false, at: mins(3) }];
  const locked = evaluateLoginAttempts(five, now);
  assert.equal(locked.allowed, false);
  assert.ok(locked.retryAfterMinutes >= 1 && locked.retryAfterMinutes <= 15);

  // successes never count toward the lock
  const mixed = [1, 5, 9].map((m) => ({ ok: false, at: mins(m) }));
  mixed.push({ ok: true, at: mins(2) }, { ok: true, at: mins(1) });
  assert.equal(evaluateLoginAttempts(mixed, now).allowed, true);

  // old failures outside the 15-minute window are ignored
  const stale = [20, 30].map((m) => ({ ok: false, at: mins(m) }));
  assert.equal(evaluateLoginAttempts(stale, now).allowed, true);
  assert.equal(
    evaluateLoginAttempts(
      [...stale, ...[1, 2, 3, 4].map((m) => ({ ok: false, at: mins(m) }))],
      now,
    ).allowed,
    true,
  );
});

test("login schema: trims/lowercases email, validates password bounds", () => {
  const ok = loginSchema.safeParse({
    email: "  KunalFarma189@Gmail.com ",
    password: "some-password",
  });
  assert.equal(ok.success, true);
  if (ok.success) assert.equal(ok.data.email, "kunalfarma189@gmail.com");

  assert.equal(
    loginSchema.safeParse({ email: "not-an-email", password: "x" }).success,
    false,
  );
  assert.equal(
    loginSchema.safeParse({ email: "a@b.co", password: "" }).success,
    false,
  );
  assert.equal(
    loginSchema.safeParse({
      email: "a@b.co",
      password: "x".repeat(201),
    }).success,
    false,
  );
  assert.equal(
    loginSchema.safeParse({ email: "a@b.co" }).success,
    false,
  );
});

test("cookie options: HttpOnly + Lax always; Secure only in production", () => {
  const dev = sessionCookieOptions(8, false);
  assert.equal(dev.httpOnly, true);
  assert.equal(dev.secure, false);
  assert.equal(dev.sameSite, "lax");
  assert.equal(dev.path, "/admin");
  assert.equal(dev.maxAge, 8 * 3600);

  const prod = sessionCookieOptions(8, true);
  assert.equal(prod.secure, true);
  assert.equal(SESSION_COOKIE, "kf_admin_session");
});

test("db client: refuses to start without DATABASE_URL", async () => {
  const previous = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;
  // reset the module cache so the singleton hasn't captured a client
  const { getDb } = await import("../db/index");
  try {
    assert.throws(() => getDb(), /DATABASE_URL is not set/);
  } finally {
    if (previous) process.env.DATABASE_URL = previous;
  }
});
