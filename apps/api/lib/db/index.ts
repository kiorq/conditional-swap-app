import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

// Initialize SQLite database
const sqlite = new Database("sqlite.db");

// Create Drizzle instance with schema
export const db = drizzle(sqlite, { schema });

// Export sqlite instance for direct access if needed
export { sqlite };
