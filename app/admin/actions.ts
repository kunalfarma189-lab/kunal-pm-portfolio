"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { adminUsers, authEvents, loginAttempts } from "@/db/schema";
import { setSessionCookie } from "@/lib/auth";
import { dummyVerify, verifyPassword } from "@/lib/password";
import { evaluateLoginAttempts } from "@/lib/rate-limit";
import { clientIpHash, isSameOrigin, userAgent } from "@/lib/request-context";
import { createSessionRow } from "@/lib/session-db";
import { LOGIN_ERROR, loginSchema } from "@/lib/validation";

export interface LoginState {
  error: string | null;
}

const UNAVAILABLE =
  "Login is temporarily unavailable. Please try again in a moment.";

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  // CSRF: reject cross-site submissions before touching auth or the DB.
  if (!(await isSameOrigin())) {
    return { error: "Request blocked." };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: LOGIN_ERROR };
  }
  const { email, password } = parsed.data;

  let result: LoginState | null = null;
  try {
    const db = getDb();
    const ipHash = await clientIpHash();

    // Rate limit: 5 failures per email+IP in 15 minutes → lock.
    const recent = await db
      .select({ ok: loginAttempts.ok, at: loginAttempts.createdAt })
      .from(loginAttempts)
      .where(eq(loginAttempts.email, email));
    const { allowed, retryAfterMinutes } = evaluateLoginAttempts(
      recent.map((r) => ({ ok: r.ok, at: r.at })),
      new Date(),
    );
    if (!allowed) {
      await db
        .insert(authEvents)
        .values({ kind: "login_locked", email, ipHash });
      return {
        error: `Too many failed attempts. Try again in ${retryAfterMinutes} minute(s).`,
      };
    }

    const [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1);

    let ok = false;
    if (user) {
      ok = await verifyPassword(user.passwordHash, password);
    } else {
      await dummyVerify(password); // equalize timing for unknown emails
    }

    await db
      .insert(loginAttempts)
      .values({ email, ipHash, ok });

    if (!ok || !user) {
      await db
        .insert(authEvents)
        .values({ kind: "login_fail", email, ipHash });
      return { error: LOGIN_ERROR }; // generic — no user enumeration
    }

    const session = await createSessionRow(db, user.id, {
      ipHash,
      userAgent: await userAgent(),
    });
    await db
      .update(adminUsers)
      .set({ lastLoginAt: new Date() })
      .where(eq(adminUsers.id, user.id));
    await db
      .insert(authEvents)
      .values({ kind: "login_ok", email, ipHash });
    await setSessionCookie(session.token);
  } catch (err) {
    // DB/connection failures never leak details to the client.
    console.error("[admin] login failure:", err);
    result = { error: UNAVAILABLE };
  }

  if (result) return result;
  redirect("/admin"); // throws NEXT_REDIRECT — must stay outside try/catch
}

// Logout is a separate POST action so no GET request ever mutates state.
export async function logoutAction(): Promise<void> {
  const { destroySession } = await import("@/lib/auth");
  try {
    const db = getDb();
    const ipHash = await clientIpHash();
    // Best-effort audit entry; logout must succeed even if it fails.
    await db
      .insert(authEvents)
      .values({ kind: "logout", email: null, ipHash });
  } catch (err) {
    console.error("[admin] logout audit failed:", err);
  }
  await destroySession();
  redirect("/admin/login");
}
