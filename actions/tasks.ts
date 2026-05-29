"use server";

import { db } from "@/lib/db";
import { tasksTable, activityLogsTable } from "@/lib/db/schema";
import { createTaskSchema } from "@/lib/validations/task";
import { requireSession } from "@/lib/session";
import { canCreateTask } from "@/lib/permissions";
import { calculatePriority } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";

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
  const priority = calculatePriority(data.importance, data.urgency);
  const taskId = nanoid();

  await db.insert(tasksTable).values({
    id: taskId,
    ...data,
    priority,
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