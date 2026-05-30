"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare, Bell, User } from "lucide-react";

const nav = [
  { href: "/employee", icon: CheckSquare, label: "My Tasks" },
  { href: "/employee/profile", icon: User, label: "Profile" },
];

export default function EmployeeBottomNav() {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-14 flex items-center z-50"
      style={{
        backgroundColor: "#1a1a1a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors"
          style={{
            color: pathname === item.href ? "#f0f0f0" : "#737373",
          }}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px]">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}