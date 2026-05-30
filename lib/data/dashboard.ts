import { db } from "@/lib/db";
import { tasksTable } from "@/lib/db/schema";
import { isNull } from "drizzle-orm";

export async function getDashboardMetrics() {
  const allTasks = await db
    .select({
      status: tasksTable.status,
      dueDate: tasksTable.dueDate,
    })
    .from(tasksTable)
    .where(isNull(tasksTable.deletedAt));

  const now = new Date();

  const total = allTasks.length;
  const completed = allTasks.filter((t) => t.status === "DONE").length;
  const inProgress = allTasks.filter((t) => t.status === "IN_PROGRESS").length;
  const blocked = allTasks.filter((t) => t.status === "BLOCKED").length;
  const overdue = allTasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== "DONE"
  ).length;
  const todo = allTasks.filter((t) => t.status === "TODO").length;

  return { total, completed, inProgress, blocked, overdue, todo };
}