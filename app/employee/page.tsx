import { requireSession } from "@/lib/session";
import { db } from "@/lib/db";
import { tasksTable } from "@/lib/db/schema";
import { eq, isNull, and } from "drizzle-orm";
import { categoryLabels, importanceLabels, urgencyLabels, statusLabels } from "@/lib/utils";
import UpdateTaskStatus from "@/components/tasks/update-task-status";

const statusColors: Record<string, { bg: string; color: string }> = {
  TODO: { bg: "rgba(255,255,255,0.06)", color: "#a3a3a3" },
  IN_PROGRESS: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  DONE: { bg: "rgba(16,185,129,0.15)", color: "#34d399" },
  BLOCKED: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
};

const importanceColors: Record<string, { bg: string; color: string }> = {
  LOW: { bg: "rgba(16,185,129,0.12)", color: "#34d399" },
  MEDIUM: { bg: "rgba(245,158,11,0.12)", color: "#fcd34d" },
  HIGH: { bg: "rgba(239,68,68,0.12)", color: "#f87171" },
};

export default async function EmployeeDashboardPage() {
  const session = await requireSession();

  const tasks = await db
    .select()
    .from(tasksTable)
    .where(
      and(
        eq(tasksTable.assignedTo, session.user.id),
        isNull(tasksTable.deletedAt)
      )
    );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-lg font-medium" style={{ color: "#f0f0f0" }}>
          Hey, {session.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "#737373" }}>
          {tasks.length} tasks assigned to you
        </p>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm" style={{ color: "#737373" }}>
          No tasks assigned yet.
        </p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => {
            const statusStyle = statusColors[task.status] ?? statusColors.TODO;
            const importanceStyle = importanceColors[task.importance] ?? importanceColors.MEDIUM;

            return (
              <div
                key={task.id}
                className="rounded-lg p-4 space-y-3"
                style={{
                  backgroundColor: "#212121",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h2
                      className="font-medium text-sm"
                      style={{ color: "#f0f0f0" }}
                    >
                      {task.title}
                    </h2>
                    {task.description && (
                      <p
                        className="text-xs mt-1 line-clamp-2"
                        style={{ color: "#737373" }}
                      >
                        {task.description}
                      </p>
                    )}
                  </div>
                  <span
                    className="px-2 py-1 rounded text-[11px] font-medium flex-shrink-0"
                    style={{
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color,
                    }}
                  >
                    {statusLabels[task.status]}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="px-2 py-1 rounded text-[11px] font-medium"
                    style={{
                      backgroundColor: importanceStyle.bg,
                      color: importanceStyle.color,
                    }}
                  >
                    {importanceLabels[task.importance]}
                  </span>
                  <span
                    className="px-2 py-1 rounded text-[11px]"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: "#a3a3a3",
                    }}
                  >
                    {categoryLabels[task.category]}
                  </span>
                  {task.dueDate && (
                    <span
                      className="text-[11px]"
                      style={{ color: "#737373" }}
                    >
                      Due {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div
                  className="pt-3 flex items-center gap-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-xs" style={{ color: "#737373" }}>
                    Update status:
                  </span>
                  <UpdateTaskStatus
                    taskId={task.id}
                    currentStatus={task.status}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}