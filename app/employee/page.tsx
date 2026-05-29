import { requireSession } from "@/lib/session";
import { db } from "@/lib/db";
import { tasksTable } from "@/lib/db/schema";
import { eq, isNull, and } from "drizzle-orm";
import UpdateTaskStatus from "@/components/tasks/update-task-status";
import { categoryLabels, importanceLabels, urgencyLabels } from "@/lib/utils";
import SignOutButton from "@/components/auth/sign-out-button";

export default async function EmployeeDashboardPage() {
  const session = await requireSession();

  const tasks = await db
    .select()
    .from(tasksTable)
    .where(
      and(
        eq(tasksTable.assignedTo, session.user.id),
        isNull(tasksTable.deletedAt),
      ),
    );
return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">My Tasks</h1>
          <p className="text-sm text-muted-foreground">
            {tasks.length} tasks assigned to you
          </p>
        </div>
        <SignOutButton />
      </div>

      {tasks.length === 0 ? (
        <p className="text-muted-foreground text-sm">No tasks assigned yet.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-medium">{task.title}</h2>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {task.description}
                    </p>
                  )}
                </div>
                <span className="text-xs px-2 py-1 bg-muted rounded-full">
                  {categoryLabels[task.category]}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Importance: {importanceLabels[task.importance]}</span>
                <span>Urgency: {urgencyLabels[task.urgency]}</span>
                {task.dueDate && (
                  <span>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>

              <UpdateTaskStatus taskId={task.id} currentStatus={task.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
