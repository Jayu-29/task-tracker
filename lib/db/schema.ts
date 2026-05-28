import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  integer,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";

// ENUMS
export const roleEnum = pgEnum("role", ["ADMIN", "EMPLOYEE"]);
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

// TABLES

// Users Table
export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  role: roleEnum("role").notNull().default("EMPLOYEE"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;

// Auth.js Required Tables
export const accountsTable = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export type SelectAccount = typeof accountsTable.$inferSelect;
export type InsertAccount = typeof accountsTable.$inferInsert;

export const sessionsTable = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export type SelectSession = typeof sessionsTable.$inferSelect;
export type InsertSession = typeof sessionsTable.$inferInsert;

export const verificationTokensTable = pgTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.identifier, table.token] }),
}));

export type SelectVerificationToken = typeof verificationTokensTable.$inferSelect;
export type InsertVerificationToken = typeof verificationTokensTable.$inferInsert;

// Tasks Table
export const tasksTable = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date", { mode: "date" }),
  importance: importanceEnum("importance").notNull().default("MEDIUM"),
  urgency: urgencyEnum("urgency").notNull().default("MEDIUM"),
  priority: integer("priority").default(5),
  status: statusEnum("status").notNull().default("TODO"),
  category: categoryEnum("category").notNull().default("OPERATIONS"),
  assignedTo: uuid("assigned_to").references(() => usersTable.id, {
    onDelete: "set null",
  }),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => usersTable.id),
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

// Activity Logs Table
export const activityLogsTable = pgTable("activity_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  taskId: uuid("task_id").references(() => tasksTable.id, {
    onDelete: "cascade",
  }),
  action: text("action").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export type SelectActivityLog = typeof activityLogsTable.$inferSelect;
export type InsertActivityLog = typeof activityLogsTable.$inferInsert;
