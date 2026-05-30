"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Search } from "lucide-react";

export default function TaskFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  function handleChange(name: string, value: string) {
    router.push(pathname + "?" + createQueryString(name, value));
  }

  const selectStyle = {
    backgroundColor: "#161820",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#9ca3af",
    borderRadius: "0.5rem",
    padding: "6px 10px",
    fontSize: "12px",
    outline: "none",
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Search */}
      <div
        className="flex items-center gap-2 flex-1 min-w-[200px] px-3 py-1.5 rounded-lg"
        style={{
          backgroundColor: "#161820",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#6b7280" }} />
        <input
          type="text"
          placeholder="Search tasks..."
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => handleChange("search", e.target.value)}
          className="bg-transparent text-sm outline-none w-full"
          style={{ color: "#e8e8e8" }}
        />
      </div>

      {/* Status filter */}
      <select
        style={selectStyle}
        defaultValue={searchParams.get("status") ?? ""}
        onChange={(e) => handleChange("status", e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
        <option value="BLOCKED">Blocked</option>
      </select>

      {/* Importance filter */}
      <select
        style={selectStyle}
        defaultValue={searchParams.get("importance") ?? ""}
        onChange={(e) => handleChange("importance", e.target.value)}
      >
        <option value="">All Importance</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      {/* Category filter */}
      <select
        style={selectStyle}
        defaultValue={searchParams.get("category") ?? ""}
        onChange={(e) => handleChange("category", e.target.value)}
      >
        <option value="">All Categories</option>
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
  );
}