import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";
import { user } from "@/lib/db/auth-schema";
import { eq } from "drizzle-orm";
import CreateTaskForm from "@/components/tasks/create-task-form";

export default async function NewTaskPage() {
  await requireAdmin();

  // Fetch all employees to populate the assignee dropdown
  const employees = await db
    .select({ id: user.id, name: user.name, email: user.email })
    .from(user)
    .where(eq(user.role, "EMPLOYEE"));

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create Task</h1>
        <p className="text-sm text-muted-foreground">
          Assign a new task to a team member
        </p>
      </div>
      <CreateTaskForm employees={employees} />
    </div>
  );
}