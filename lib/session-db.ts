import { and, eq, lt } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { adminUsers, sessions } from "@/db/schema";
import type * as schema from "@/db/schema";
import { generateSessionToken, hashToken } from "@/lib/token";
import {
  SESSION_ABSOLUTE_CAP_HOURS,
  sessionTtlHours,
} from "@/lib/session-cookie";

type Db = PostgresJsDatabase<typeof schema>;

// Database-side session logic, separated from Next.js request APIs so it can
// be integration-tested directly. The raw session token exists only inside
// the HttpOnly cookie; this layer persists and looks up its SHA-256 hash.

export interface SessionUser {
  userId: string;
  email: string;
  expiresAt: Date;
}

export interface CreatedSession {
  token: string;
  expiresAt: Date;
  absoluteExpiresAt: Date;
}

export async function createSessionRow(
  db: Db,
  userId: string,
  meta: { ipHash?: string | null; userAgent?: string | null } = {},
): Promise<CreatedSession> {
  const token = generateSessionToken();
  const now = Date.now();
  const ttlMs = sessionTtlHours() * 3_600_000;
  const expiresAt = new Date(now + ttlMs);
  const absoluteExpiresAt = new Date(
    now + SESSION_ABSOLUTE_CAP_HOURS * 3_600_000,
  );

  await db.insert(sessions).values({
    id: hashToken(token),
    userId,
    expiresAt,
    absoluteExpiresAt,
    ipHash: meta.ipHash ?? null,
    userAgent: meta.userAgent ?? null,
  });

  return { token, expiresAt, absoluteExpiresAt };
}

export async function findSessionUser(
  db: Db,
  token: string,
  now: Date,
): Promise<SessionUser | null> {
  const rows = await db
    .select({
      sessionId: sessions.id,
      userId: adminUsers.id,
      email: adminUsers.email,
      expiresAt: sessions.expiresAt,
      absoluteExpiresAt: sessions.absoluteExpiresAt,
    })
    .from(sessions)
    .innerJoin(adminUsers, eq(sessions.userId, adminUsers.id))
    .where(eq(sessions.id, hashToken(token)))
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  const expired =
    row.expiresAt.getTime() <= now.getTime() ||
    row.absoluteExpiresAt.getTime() <= now.getTime();
  if (expired) {
    await db.delete(sessions).where(eq(sessions.id, row.sessionId));
    return null;
  }

  // Sliding renewal: extend idle expiry when half the TTL has passed,
  // never beyond the absolute cap.
  const ttlMs = sessionTtlHours() * 3_600_000;
  const remaining = row.expiresAt.getTime() - now.getTime();
  if (remaining < ttlMs / 2) {
    const renewed = new Date(
      Math.min(
        now.getTime() + ttlMs,
        row.absoluteExpiresAt.getTime(),
      ),
    );
    await db
      .update(sessions)
      .set({ expiresAt: renewed })
      .where(
        and(eq(sessions.id, row.sessionId), lt(sessions.expiresAt, renewed)),
      );
    return { userId: row.userId, email: row.email, expiresAt: renewed };
  }

  return {
    userId: row.userId,
    email: row.email,
    expiresAt: row.expiresAt,
  };
}

export async function deleteSessionRow(
  db: Db,
  token: string,
): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, hashToken(token)));
}

export async function deleteExpiredSessions(
  db: Db,
  now: Date,
): Promise<number> {
  const removed = await db
    .delete(sessions)
    .where(lt(sessions.absoluteExpiresAt, now))
    .returning({ id: sessions.id });
  return removed.length;
}
