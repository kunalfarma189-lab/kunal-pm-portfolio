import { eq } from "drizzle-orm";
import { closeDb, getDb } from "../db";
import { adminUsers, authEvents } from "../db/schema";
import { hashPassword } from "../lib/password";

// One-time admin provisioning. Usage:
//   ADMIN_EMAIL=... ADMIN_INITIAL_PASSWORD=... npm run create-admin
// or run interactively — the password is read with echo disabled and is
// never stored, logged, or printed.

const DEFAULT_ADMIN_EMAIL = "kunalfarma189@gmail.com";
const MIN_PASSWORD_LENGTH = 10;

async function askHidden(question: string): Promise<string> {
  // Raw stdin with echo disabled — works on Windows and POSIX terminals,
  // and the password never appears on screen or in any log.
  process.stdout.write(question);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  let input = "";
  await new Promise<void>((resolve) => {
    process.stdin.on("data", (chunk: Buffer) => {
      for (const byte of chunk) {
        if (byte === 13 || byte === 10) {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdout.write("\n");
          resolve();
          return;
        }
        if (byte === 3) {
          process.stdout.write("\nAborted.\n");
          process.exit(1);
        }
        if (byte === 8 || byte === 127) {
          input = input.slice(0, -1);
          continue;
        }
        input += String.fromCharCode(byte);
      }
    });
  });
  return input;
}

async function main() {
  const email = (
    process.env.ADMIN_EMAIL ?? DEFAULT_ADMIN_EMAIL
  ).trim().toLowerCase();
  let password = process.env.ADMIN_INITIAL_PASSWORD ?? "";

  if (!password) {
    password = await askHidden(
      `Set the initial password for ${email} (min ${MIN_PASSWORD_LENGTH} chars, input hidden): `,
    );
    const confirm = await askHidden("Confirm password: ");
    if (password !== confirm) {
      console.error("Passwords do not match. Aborting — nothing was written.");
      process.exit(1);
    }
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    console.error(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters. Aborting — nothing was written.`,
    );
    process.exit(1);
  }

  const db = getDb();
  const existingCount = (await db.select({ id: adminUsers.id }).from(adminUsers))
    .length;
  const [existing] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  if (existingCount > 0 && !existing && process.env.ALLOW_SECOND_ADMIN !== "1") {
    console.error(
      "An admin account already exists for a different email. Set ALLOW_SECOND_ADMIN=1 to override (not recommended — this phase is single-admin by design).",
    );
    await closeDb();
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);

  if (existing) {
    await db
      .update(adminUsers)
      .set({ passwordHash, updatedAt: new Date(), lastLoginAt: null })
      .where(eq(adminUsers.id, existing.id));
    console.log(`Updated password for existing admin: ${email}`);
  } else {
    await db
      .insert(adminUsers)
      .values({ email, passwordHash });
    console.log(`Admin account created: ${email}`);
  }

  await db
    .insert(authEvents)
    .values({ kind: "admin_created", email, ipHash: null });
  console.log(
    "Done. If ADMIN_INITIAL_PASSWORD was set in your environment, delete it now — it is no longer needed.",
  );
  await closeDb();
}

main().catch(async (err) => {
  console.error("Provisioning failed:", err instanceof Error ? err.message : err);
  await closeDb();
  process.exit(1);
});
