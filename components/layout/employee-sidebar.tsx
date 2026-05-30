"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare, Bell, User, Layers } from "lucide-react";

const nav = [
  { href: "/employee", icon: CheckSquare, label: "My Tasks" },
  { href: "/employee/profile", icon: User, label: "Profile" },
];

export default function EmployeeSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Icon sidebar */}
      <div
        className="w-[52px] flex flex-col items-center py-4 gap-1"
        style={{
          backgroundColor: "#212121",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
          style={{ backgroundColor: "#f0f0f0" }}
        >
          <Layers className="w-4 h-4" style={{ color: "#1a1a1a" }} />
        </div>

        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{
              backgroundColor: pathname === item.href ? "#2a2a2a" : "transparent",
              color: pathname === item.href ? "#f0f0f0" : "#737373",
              border: pathname === item.href ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}
          >
            <item.icon className="w-4 h-4" />
          </Link>
        ))}
      </div>

      {/* Text nav */}
      <div
        className="w-[200px] flex flex-col"
        style={{
          backgroundColor: "#1a1a1a",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="px-4 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-sm font-medium" style={{ color: "#f0f0f0" }}>
            TeamTasks
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#737373" }}>
            Employee
          </p>
        </div>

        <div className="flex-1 py-2">
          <p
            className="text-[10px] uppercase tracking-widest px-4 py-2"
            style={{ color: "#737373" }}
          >
            Work
          </p>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-1.5 text-sm transition-colors"
              style={{
                color: pathname === item.href ? "#f0f0f0" : "#737373",
                backgroundColor:
                  pathname === item.href ? "rgba(255,255,255,0.05)" : "transparent",
                borderRight:
                  pathname === item.href ? "2px solid #f0f0f0" : "none",
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