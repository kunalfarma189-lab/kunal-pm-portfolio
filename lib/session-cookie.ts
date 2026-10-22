export const SESSION_COOKIE = "kf_admin_session";
export const SESSION_TTL_HOURS_DEFAULT = 8;
export const SESSION_ABSOLUTE_CAP_HOURS = 24;

export function sessionTtlHours(): number {
  const raw = Number(process.env.SESSION_TTL_HOURS);
  if (!Number.isFinite(raw) || raw < 1) return SESSION_TTL_HOURS_DEFAULT;
  return Math.min(raw, SESSION_ABSOLUTE_CAP_HOURS);
}

export interface SessionCookieOptions {
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
}

export function sessionCookieOptions(
  ttlHours: number,
  isProduction: boolean,
): SessionCookieOptions {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/admin",
    maxAge: Math.round(ttlHours * 3600),
  };
}
