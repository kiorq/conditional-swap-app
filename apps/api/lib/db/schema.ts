import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";

// table that will store all swap requests
export const swapRequests = sqliteTable("swap_requests", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),

  status: text("status").notNull(),

  fromToken: text("from_token").notNull(),
  toToken: text("to_token").notNull(),

  // Using text type to store precise decimal numbers
  fromAmount: text("from_amount").notNull(),
  toAmount: text("to_amount").notNull(),
  minThreshold: text("min_threshold").notNull(),

  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }).notNull(),
  instant: integer("instant", { mode: "boolean" }).notNull().default(false),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
