import crypto from "node:crypto";

// 256-bit opaque session token. Only its SHA-256 hash is persisted; the raw
// token lives solely inside the HttpOnly cookie.
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("base64url");
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex");
}
