"use server";

import { db } from "@/lib/db";
import { tasksTable, activityLogsTable } from "@/lib/db/schema";
import { requireSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { createTaskSchema, updateTaskSchema, updateTaskStatusSchema } from "@/lib/validations/task";
import { canCreateTask, canUpdateTaskStatus, canDeleteTask, canEditTask } from "@/lib/permissions";

export async function createTask(formData: unknown) {
  const session = await requireSession();

  if (!canCreateTask(session.user)) {
    throw new Error("Not authorized");
  }

  const parsed = createTaskSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;
  const taskId = nanoid();

  await db.insert(tasksTable).values({
    id: taskId,
    ...data,
    createdBy: session.user.id,
  });

  await db.insert(activityLogsTable).values({
    id: nanoid(),
    userId: session.user.id,
    taskId,
    action: `Created task "${data.title}"`,
  });

  revalidatePath("/dashboard/tasks");
  return { success: true };
}

export async function updateTaskStatus(data: { taskId: string; status: string }) {
  const session = await requireSession();

  const parsed = updateTaskStatusSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid status" };
  }

  const task = await db.query.tasksTable.findFirst({
    where: eq(tasksTable.id, data.taskId),
  });

  if (!task) return { error: "Task not found" };

  if (!canUpdateTaskStatus(session.user, {
    createdBy: task.createdBy,
    assignedTo: task.assignedTo,
  })) {
    throw new Error("Not authorized");
  }

  await db
    .update(tasksTable)
    .set({
      status: parsed.data.status,
      completedAt: parsed.data.status === "DONE" ? new Date() : null,
    })
    .where(eq(tasksTable.id, data.taskId));

  await db.insert(activityLogsTable).values({
    id: nanoid(),
    userId: session.user.id,
    taskId: data.taskId,
    action: `Updated task status to ${parsed.data.status}`,
  });

  revalidatePath("/employee");
  revalidatePath("/dashboard/tasks");
  return { success: true };
}

export async function deleteTask(taskId: string) {
  const session = await requireSession();

  if (!canDeleteTask(session.user)) {
    throw new Error("Not authorized");
  }

  await db
    .update(tasksTable)
    .set({ deletedAt: new Date() })
    .where(eq(tasksTable.id, taskId));

  await db.insert(activityLogsTable).values({
    id: nanoid(),
    userId: session.user.id,
    taskId,
    action: "Deleted task",
  });

  revalidatePath("/dashboard/tasks");
  return { success: true };
}

export async function updateTask(taskId: string, formData: unknown) {
  const session = await requireSession();

  if (!canEditTask(session.user)) {
    throw new Error("Not authorized");
  }

  const parsed = updateTaskSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await db
    .update(tasksTable)
    .set(parsed.data)
    .where(eq(tasksTable.id, taskId));

  await db.insert(activityLogsTable).values({
    id: nanoid(),
    userId: session.user.id,
    taskId,
    action: `Updated task "${parsed.data.title ?? taskId}"`,
  });

  revalidatePath("/dashboard/tasks");
  return { success: true };
}