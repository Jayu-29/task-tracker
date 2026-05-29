import type { Config } from "drizzle-kit";
import { configDotenv } from "dotenv";

configDotenv({ path: ".env.local" });

export default {
  schema: ["./lib/db/schema.ts", "./lib/db/auth-schema.ts"],
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;