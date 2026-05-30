"use client";

import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, LogOut } from "lucide-react";
import type { User } from "@/lib/auth";

export default function Topbar({ user }: { user: User }) {
  const pathname = usePathname();
  const router = useRouter();
  const parts = pathname.split("/").filter(Boolean);

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <div
      className="h-12 flex items-center justify-between px-4 flex-shrink-0"
      style={{
        backgroundColor: "#0f1117",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Breadcrumb */}
<div className="flex items-center gap-1.5 text-sm">
  <span className="font-medium" style={{ color: "#e8e8e8" }}>
    TeamTasks
  </span>
  {parts.map((part, i) => (
    <span key={i} className="flex items-center gap-1.5">
      <span style={{ color: "#6b7280" }}>/</span>
      <span className="capitalize" style={{ color: i === parts.length - 1 ? "#e8e8e8" : "#6b7280" }}>
        {part.replace(/-/g, " ")}
      </span>
    </span>
  ))}
</div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/tasks/new"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#e8e8e8", color: "#0f1117" }}
        >
          <Plus className="w-3.5 h-3.5" />
          New Task
        </Link>
        <div
          className="flex items-center gap-2 pl-2"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
            style={{
              backgroundColor: "#1c1e28",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e8e8e8",
            }}
          >
            {user.name?.slice(0, 2).toUpperCase() ?? "??"}
          </div>
          <button
            onClick={handleSignOut}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#6b7280",
            }}
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}