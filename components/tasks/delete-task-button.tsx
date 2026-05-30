"use client";

import { useState } from "react";
import { deleteTask } from "@/actions/tasks";
import { Trash2 } from "lucide-react";

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
      className="w-7 h-7 rounded flex items-center justify-center transition-colors disabled:opacity-50"
      style={{
        border: "1px solid rgba(239,68,68,0.3)",
        color: "#f87171",
      }}
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}