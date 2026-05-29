"use client";

import { useState } from "react";
import { deleteTask } from "@/actions/tasks";

export default function DeleteTaskButton({ taskId }: { taskId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this task?")) return;
    setLoading(true);
    await deleteTask(taskId);
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs px-2 py-1 border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}