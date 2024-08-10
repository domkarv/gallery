import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { env } from "~/env";

if (!env.POSTGRES_URL) {
  throw new Error("🥲 Database credentials missing!");
}

const sql: NeonQueryFunction<boolean, boolean> = neon(env.POSTGRES_URL);

export const db = drizzle(sql, { schema });
