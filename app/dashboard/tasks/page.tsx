import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";
import { tasksTable } from "@/lib/db/schema";
import { user } from "@/lib/db/auth-schema";
import { eq, isNull, and } from "drizzle-orm";
import Link from "next/link";
import { categoryLabels, statusLabels, importanceLabels } from "@/lib/utils";
import DeleteTaskButton from "@/components/tasks/delete-task-button";
import { Suspense } from "react";
import TaskFilters from "@/components/tasks/task-filters";
import { Pencil } from "lucide-react";

const statusColors: Record<string, { bg: string; color: string }> = {
  TODO: { bg: "rgba(255,255,255,0.06)", color: "#9ca3af" },
  IN_PROGRESS: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  DONE: { bg: "rgba(16,185,129,0.15)", color: "#34d399" },
  BLOCKED: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
};

const importanceColors: Record<string, { bg: string; color: string }> = {
  LOW: { bg: "rgba(16,185,129,0.12)", color: "#34d399" },
  MEDIUM: { bg: "rgba(245,158,11,0.12)", color: "#fcd34d" },
  HIGH: { bg: "rgba(239,68,68,0.12)", color: "#f87171" },
};

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: string;
    importance?: string;
    category?: string;
  }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const conditions = [isNull(tasksTable.deletedAt)];

  if (params.status) {
    conditions.push(eq(tasksTable.status, params.status as any));
  }
  if (params.importance) {
    conditions.push(eq(tasksTable.importance, params.importance as any));
  }
  if (params.category) {
    conditions.push(eq(tasksTable.category, params.category as any));
  }

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
    .where(and(...conditions));

  const filtered = params.search
    ? tasks.filter((t) =>
        t.title.toLowerCase().includes(params.search!.toLowerCase())
      )
    : tasks;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-medium" style={{ color: "#e8e8e8" }}>
            All Tasks
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#6b7280" }}>
            {filtered.length} tasks
            {params.search || params.status || params.importance || params.category
              ? " (filtered)"
              : " total"}
          </p>
        </div>
        <Link
          href="/dashboard/tasks/new"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#e8e8e8", color: "#0f1117" }}
        >
          + New Task
        </Link>
      </div>

      <Suspense>
        <TaskFilters />
      </Suspense>

      {filtered.length === 0 ? (
        <p className="text-sm" style={{ color: "#6b7280" }}>
          No tasks found.
        </p>
      ) : (
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  backgroundColor: "#161820",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {["Key", "Title", "Status", "Importance", "Category", "Assignee", "Due Date", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-[11px] uppercase tracking-wider font-medium"
                      style={{ color: "#6b7280" }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((task, index) => {
                const statusStyle = statusColors[task.status] ?? statusColors.TODO;
                const importanceStyle = importanceColors[task.importance] ?? importanceColors.MEDIUM;

                return (
                  <tr
                    key={task.id}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <td
                      className="px-4 py-3 font-mono text-[11px]"
                      style={{ color: "#6b7280" }}
                    >
                      TT-{String(index + 1).padStart(2, "0")}
                    </td>
                    <td
                      className="px-4 py-3 font-medium"
                      style={{ color: "#e8e8e8" }}
                    >
                      {task.title}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-1 rounded text-[11px] font-medium"
                        style={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color,
                        }}
                      >
                        {statusLabels[task.status] ?? task.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-1 rounded text-[11px] font-medium"
                        style={{
                          backgroundColor: importanceStyle.bg,
                          color: importanceStyle.color,
                        }}
                      >
                        {importanceLabels[task.importance] ?? task.importance}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-[12px]"
                      style={{ color: "#9ca3af" }}
                    >
                      {categoryLabels[task.category] ?? task.category}
                    </td>
                    <td
                      className="px-4 py-3 text-[12px]"
                      style={{ color: "#9ca3af" }}
                    >
                      {task.assigneeName ?? task.assigneeEmail ?? "—"}
                    </td>
                    <td
                      className="px-4 py-3 text-[12px]"
                      style={{ color: "#9ca3af" }}
                    >
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/tasks/${task.id}/edit`}
                          className="w-7 h-7 rounded flex items-center justify-center transition-colors"
                          style={{
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#9ca3af",
                          }}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Link>
                        <DeleteTaskButton taskId={task.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}