import "server-only";
import { headers } from "next/headers";

// Defense-in-depth CSRF check for mutating server actions. Next.js already
// verifies Origin/Host for Server Actions; this explicit check additionally
// rejects cross-site origins before any auth logic runs.
export async function isSameOrigin(): Promise<boolean> {
  const h = await headers();
  const origin = h.get("origin");
  if (!origin) return true; // non-browser clients; Next's own check still applies
  const host = h.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function clientIpHash(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "local";
  const { hashIp } = await import("@/lib/token");
  return hashIp(ip);
}

export async function userAgent(): Promise<string | null> {
  const h = await headers();
  return h.get("user-agent");
}
