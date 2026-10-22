import {
  boolean,
  index,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Phase 1: authentication tables only. Content tables (case studies, AI
// projects, site settings, media assets) are documented in
// docs/admin-panel-plan.md and intentionally NOT created yet.
// Migrations are additive only — never drop or truncate.
// ---------------------------------------------------------------------------

export const adminUsers = pgTable(
  "admin_users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    // Argon2id hash — plaintext passwords are never stored
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  },
  (t) => [uniqueIndex("admin_users_email_unique").on(t.email)],
);

export const sessions = pgTable(
  "sessions",
  {
    // Primary key = SHA-256 hex of the opaque cookie token. The raw token
    // exists only inside the HttpOnly cookie, so a database leak cannot be
    // replayed as a valid session.
    id: text("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    // Sliding expiry (extended on activity)...
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    // ...capped by an absolute ceiling from session creation.
    absoluteExpiresAt: timestamp("absolute_expires_at", {
      withTimezone: true,
    }).notNull(),
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
  },
  (t) => [index("sessions_user_id_idx").on(t.userId)],
);

export const loginAttempts = pgTable(
  "login_attempts",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    ipHash: text("ip_hash").notNull(),
    ok: boolean("ok").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("login_attempts_email_ip_created_idx").on(
      t.email,
      t.ipHash,
      t.createdAt,
    ),
  ],
);

export const authEvents = pgTable(
  "auth_events",
  {
    id: serial("id").primaryKey(),
    // login_ok | login_fail | login_locked | logout | admin_created
    kind: text("kind").notNull(),
    email: text("email"),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("auth_events_created_at_idx").on(t.createdAt)],
);

export type AdminUser = typeof adminUsers.$inferSelect;
export type Session = typeof sessions.$inferSelect;
