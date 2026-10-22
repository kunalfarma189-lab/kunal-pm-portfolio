import { hash, verify } from "@node-rs/argon2";

// Argon2id with OWASP baseline parameters (19 MiB memory, 2 iterations,
// 1 lane). The hash embeds a unique salt, so identical passwords produce
// different hashes.
const ARGON2_OPTIONS = {
  memoryCost: 19_456,
  timeCost: 2,
  parallelism: 1,
} as const;

export async function hashPassword(password: string): Promise<string> {
  return hash(password, ARGON2_OPTIONS);
}

export async function verifyPassword(
  passwordHash: string,
  password: string,
): Promise<boolean> {
  try {
    return await verify(passwordHash, password, ARGON2_OPTIONS);
  } catch {
    // Malformed hash stored in DB — treat as failed verification, never crash
    return false;
  }
}

let dummyHash: string | null = null;

// Burn the same CPU time for unknown emails as for real ones so response
// timing cannot reveal whether an account exists.
export async function dummyVerify(password: string): Promise<void> {
  dummyHash ??= await hashPassword("timing-equalizer-not-a-login");
  await verifyPassword(dummyHash, password);
}
