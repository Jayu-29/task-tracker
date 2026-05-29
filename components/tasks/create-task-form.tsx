"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "@/actions/tasks";

type Employee = { id: string; name: string | null; email: string };

export default function CreateTaskForm({ employees }: { employees: Employee[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
      dueDate: (form.elements.namedItem("dueDate") as HTMLInputElement).value || undefined,
      importance: (form.elements.namedItem("importance") as HTMLSelectElement).value,
      urgency: (form.elements.namedItem("urgency") as HTMLSelectElement).value,
      status: (form.elements.namedItem("status") as HTMLSelectElement).value,
      category: (form.elements.namedItem("category") as HTMLSelectElement).value,
      assignedTo: (form.elements.namedItem("assignedTo") as HTMLSelectElement).value || undefined,
    };

    const result = await createTask(data);

    if (result?.error) {
      setError("Please check the form and try again.");
    } else {
      router.push("/dashboard/tasks");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium">Title *</label>
        <input
          name="title"
          required
          className="w-full border rounded-lg px-3 py-2 text-sm"
          placeholder="Task title"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          rows={3}
          className="w-full border rounded-lg px-3 py-2 text-sm"
          placeholder="Task description"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Due Date</label>
        <input
          name="dueDate"
          type="date"
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Importance</label>
          <select
            name="importance"
            defaultValue="MEDIUM"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Urgency</label>
          <select
            name="urgency"
            defaultValue="MEDIUM"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Category</label>
        <select
          name="category"
          defaultValue="OPERATIONS"
          className="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="OPERATIONS">Operations</option>
          <option value="PURCHASE">Purchase</option>
          <option value="SALES">Sales</option>
          <option value="MARKETING">Marketing</option>
          <option value="R_AND_D">R&D</option>
          <option value="FINANCE">Finance</option>
          <option value="EXPANSION">Expansion</option>
          <option value="PERSONAL">Personal</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Status</label>
        <select
          name="status"
          defaultValue="TODO"
          className="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
          <option value="BLOCKED">Blocked</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Assign To</label>
        <select
          name="assignedTo"
          defaultValue=""
          className="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Unassigned</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name ?? emp.email}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}