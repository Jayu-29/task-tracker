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
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
      className="text-xs rounded-lg px-2 py-1 outline-none disabled:opacity-50"
      style={{
        backgroundColor: "#2a2a2a",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#f0f0f0",
      }}
    >
      <option value="TODO">Todo</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="DONE">Done</option>
      <option value="BLOCKED">Blocked</option>
    </select>
  );
}