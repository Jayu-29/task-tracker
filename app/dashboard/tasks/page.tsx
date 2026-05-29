import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";
import { tasksTable } from "@/lib/db/schema";
import { user } from "@/lib/db/auth-schema";
import { eq, isNull } from "drizzle-orm";
import Link from "next/link";
import { categoryLabels, statusLabels } from "@/lib/utils";
import DeleteTaskButton from "@/components/tasks/delete-task-button";

export default async function TasksPage() {
  await requireAdmin();

  const tasks = await db
    .select({
      id: tasksTable.id,
      title: tasksTable.title,
      status: tasksTable.status,
      importance: tasksTable.importance,
      urgency: tasksTable.urgency,
      category: tasksTable.category,
      dueDate: tasksTable.dueDate,
      assigneeName: user.name,
      assigneeEmail: user.email,
    })
    .from(tasksTable)
    .leftJoin(user, eq(tasksTable.assignedTo, user.id))
    .where(isNull(tasksTable.deletedAt));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">All Tasks</h1>
          <p className="text-sm text-muted-foreground">{tasks.length} tasks total</p>
        </div>
        <Link
          href="/dashboard/tasks/new"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
        >
          + New Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="text-muted-foreground text-sm">No tasks yet.</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Assigned To</th>
                <th className="text-left px-4 py-3">Due Date</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{task.title}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted">
                      {statusLabels[task.status] ?? task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {categoryLabels[task.category] ?? task.category}
                  </td>
                  <td className="px-4 py-3">
                    {task.assigneeName ?? task.assigneeEmail ?? "Unassigned"}
                  </td>
                  <td className="px-4 py-3">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/tasks/${task.id}/edit`}
                        className="text-xs px-2 py-1 border rounded hover:bg-muted transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteTaskButton taskId={task.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}