"use client";

import { useState } from "react";
import { updateTaskStatus } from "@/actions/tasks";

type Status = "TODO" | "IN_PROGRESS" | "DONE" | "BLOCKED";

export default function UpdateTaskStatus({
  taskId,
  currentStatus,
}: {
  taskId: string;
  currentStatus: Status;
}) {
  const [status, setStatus] = useState<Status>(currentStatus);
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as Status;
    setLoading(true);
    await updateTaskStatus({ taskId, status: newStatus });
    setStatus(newStatus);
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium text-muted-foreground">Status:</label>
      <select
        value={status}
        onChange={handleChange}
        disabled={loading}
        className="text-xs border rounded-lg px-2 py-1 disabled:opacity-50"
      >
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
        <option value="BLOCKED">Blocked</option>
      </select>
      {loading && <span className="text-xs text-muted-foreground">Saving...</span>}
    </div>
  );
}