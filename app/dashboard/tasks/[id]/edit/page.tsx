import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";
import { tasksTable } from "@/lib/db/schema";
import { user } from "@/lib/db/auth-schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditTaskForm from "@/components/tasks/edit-task-form";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const task = await db.query.tasksTable.findFirst({
    where: eq(tasksTable.id, id),
  });

  if (!task) notFound();

  const employees = await db
    .select({ id: user.id, name: user.name, email: user.email })
    .from(user)
    .where(eq(user.role, "EMPLOYEE"));

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Edit Task</h1>
        <p className="text-sm text-muted-foreground">Update task details</p>
      </div>
      <EditTaskForm task={task} employees={employees} />
    </div>
  );
}