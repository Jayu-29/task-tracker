"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  BarChart2,
  Activity,
  Settings,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/tasks", icon: CheckSquare, label: "All Tasks" },
  { href: "/dashboard/team", icon: Users, label: "Team" },
];

const reportNav = [
  { href: "/dashboard/analytics", icon: BarChart2, label: "Analytics" },
  { href: "/dashboard/activity", icon: Activity, label: "Activity Log" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Icon sidebar */}
      <div
        className="w-[52px] flex flex-col items-center py-4 gap-1"
        style={{
          backgroundColor: "#161820",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
          style={{ backgroundColor: "#e8e8e8" }}
        >
          <Layers className="w-4 h-4" style={{ color: "#0f1117" }} />
        </div>

        {[...mainNav, ...reportNav].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{
              backgroundColor:
                pathname === item.href
                  ? "#1c1e28"
                  : "transparent",
              color:
                pathname === item.href
                  ? "#e8e8e8"
                  : "#6b7280",
              border:
                pathname === item.href
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "none",
            }}
          >
            <item.icon className="w-4 h-4" />
          </Link>
        ))}

        <div className="mt-auto flex flex-col items-center gap-2">
          <Link
            href="/dashboard/settings"
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{ color: "#6b7280" }}
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Text nav column */}
      <div
        className="w-[200px] flex flex-col"
        style={{
          backgroundColor: "#0f1117",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="px-4 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-sm font-medium" style={{ color: "#e8e8e8" }}>
            TeamTasks
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
            Workspace
          </p>
        </div>

        <div className="flex-1 py-2">
          <p
            className="text-[10px] uppercase tracking-widest px-4 py-2"
            style={{ color: "#6b7280" }}
          >
            Planning
          </p>
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-1.5 text-sm transition-colors"
              style={{
                color: pathname === item.href ? "#e8e8e8" : "#6b7280",
                backgroundColor:
                  pathname === item.href
                    ? "rgba(255,255,255,0.05)"
                    : "transparent",
                borderRight:
                  pathname === item.href
                    ? "2px solid #e8e8e8"
                    : "none",
                fontWeight: pathname === item.href ? 500 : 400,
              }}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </Link>
          ))}

          <p
            className="text-[10px] uppercase tracking-widest px-4 py-2 mt-2"
            style={{ color: "#6b7280" }}
          >
            Manage
          </p>
          {reportNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-1.5 text-sm transition-colors"
              style={{
                color: pathname === item.href ? "#e8e8e8" : "#6b7280",
                backgroundColor:
                  pathname === item.href
                    ? "rgba(255,255,255,0.05)"
                    : "transparent",
                borderRight:
                  pathname === item.href
                    ? "2px solid #e8e8e8"
                    : "none",
                fontWeight: pathname === item.href ? 500 : 400,
              }}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}