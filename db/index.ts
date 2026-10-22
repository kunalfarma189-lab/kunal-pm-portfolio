import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Lazy singleton: importing this module never touches the database or
// DATABASE_URL, so builds and the public static site work without any DB.
// The connection is only created on first actual query.

let client: ReturnType<typeof postgres> | null = null;
let db: PostgresJsDatabase<typeof schema> | null = null;

export function getDb(): PostgresJsDatabase<typeof schema> {
  if (!db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Copy .env.example to .env.local, add your Neon connection string, and retry.",
      );
    }
    client = postgres(url, {
      ssl: "require",
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
    });
    db = drizzle(client, { schema });
  }
  return db;
}

export function closeDb(): Promise<void> {
  const c = client;
  client = null;
  db = null;
  return c ? c.end() : Promise.resolve();
}
