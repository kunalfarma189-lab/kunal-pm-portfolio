import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  sessionTtlHours,
} from "@/lib/session-cookie";
import {
  deleteSessionRow,
  findSessionUser,
  type SessionUser,
} from "@/lib/session-db";

// Next.js request-facing session helpers. Security boundary: these run on
// the server only — nothing here is reachable from browser code.

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const db = getDb();
  return findSessionUser(db, token, new Date());
}

// Page guard — redirects anonymous visitors to the login page. Server
// actions must NOT rely on this alone; they call getSessionUser() themselves.
export async function requireAdminPage(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(
    SESSION_COOKIE,
    token,
    sessionCookieOptions(sessionTtlHours(), isProduction()),
  );
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  // Match path/attributes of the original cookie so the browser drops it.
  store.set(
    SESSION_COOKIE,
    "",
    { ...sessionCookieOptions(0, isProduction()), maxAge: 0 },
  );
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    const db = getDb();
    await deleteSessionRow(db, token);
  }
  await clearSessionCookie();
}
