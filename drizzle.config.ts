import { defineConfig } from "drizzle-kit";
import { env } from "~/env";

export default defineConfig({
  schema: "src/server/db/schema.ts",
  out: "migrations",
  dialect: "postgresql",
  tablesFilter: ["gallry_*"],
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
});
