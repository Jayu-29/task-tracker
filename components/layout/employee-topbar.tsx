"use client";

import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import type { User } from "@/lib/auth";

export default function EmployeeTopbar({ user }: { user: User }) {
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
        backgroundColor: "#1a1a1a",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center gap-1.5 text-sm">
        <span className="font-medium" style={{ color: "#f0f0f0" }}>
          TeamTasks
        </span>
        {parts.map((part, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span style={{ color: "#737373" }}>/</span>
            <span
              className="capitalize"
              style={{
                color: i === parts.length - 1 ? "#f0f0f0" : "#737373",
              }}
            >
              {part.replace(/-/g, " ")}
            </span>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
          style={{
            backgroundColor: "#2a2a2a",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#f0f0f0",
          }}
        >
          {user.name?.slice(0, 2).toUpperCase() ?? "??"}
        </div>
        <button
          onClick={handleSignOut}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#737373",
          }}
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}