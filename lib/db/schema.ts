import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

// Enums 

export const importanceEnum = pgEnum("importance", ["LOW", "MEDIUM", "HIGH"]);
export const urgencyEnum = pgEnum("urgency", ["LOW", "MEDIUM", "HIGH"]);
export const statusEnum = pgEnum("status", [
  "TODO",
  "IN_PROGRESS",
  "DONE",
  "BLOCKED",
]);
export const categoryEnum = pgEnum("category", [
  "OPERATIONS",
  "PURCHASE",
  "SALES",
  "MARKETING",
  "R_AND_D",
  "FINANCE",
  "EXPANSION",
  "PERSONAL",
]);

// Tasks 
// Note: assignedTo and createdBy use text to match Better Auth's user IDs

export const tasksTable = pgTable("tasks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date", { mode: "date" }),
  importance: importanceEnum("importance").notNull().default("MEDIUM"),
  urgency: urgencyEnum("urgency").notNull().default("MEDIUM"),
  priority: integer("priority").default(5),
  status: statusEnum("status").notNull().default("TODO"),
  category: categoryEnum("category").notNull().default("OPERATIONS"),
  assignedTo: text("assigned_to"),
  createdBy: text("created_by").notNull(),
  completedAt: timestamp("completed_at", { mode: "date" }),
  deletedAt: timestamp("deleted_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type SelectTask = typeof tasksTable.$inferSelect;
export type InsertTask = typeof tasksTable.$inferInsert;

// Activity Logs 

export const activityLogsTable = pgTable("activity_logs", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  taskId: text("task_id"),
  action: text("action").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export type SelectActivityLog = typeof activityLogsTable.$inferSelect;
export type InsertActivityLog = typeof activityLogsTable.$inferInsert;