import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
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

  fromAmount: real("from_amount").notNull(),
  toAmount: real("to_amount").notNull(),
  minThreshold: real("min_threshold").notNull(),

  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }).notNull(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
