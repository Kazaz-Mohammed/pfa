import { Pool } from "pg"
import dotenv from "dotenv"
// Load environment variables from .env file
dotenv.config();


declare global {
  var pool: Pool | undefined;
}

export function createClient() {
  if (!global.pool) {
    global.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    });
  }
  return global.pool;
}
