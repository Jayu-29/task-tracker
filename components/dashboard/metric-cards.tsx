import { getDashboardMetrics } from "@/lib/data/dashboard";
import { CheckCircle, Clock, AlertTriangle, Ban, ListTodo, LayoutList } from "lucide-react";

export default async function MetricCards() {
  const metrics = await getDashboardMetrics();

  const cards = [
    {
      label: "Total Tasks",
      value: metrics.total,
      icon: LayoutList,
      sub: "All active tasks",
      color: "#e8e8e8",
    },
    {
      label: "In Progress",
      value: metrics.inProgress,
      icon: Clock,
      sub: "Currently active",
      color: "#e8e8e8",
    },
    {
      label: "Completed",
      value: metrics.completed,
      icon: CheckCircle,
      sub: "Done this month",
      color: "#10b981",
    },
    {
      label: "Overdue",
      value: metrics.overdue,
      icon: AlertTriangle,
      sub: "Needs attention",
      color: "#ef4444",
    },
    {
      label: "Todo",
      value: metrics.todo,
      icon: ListTodo,
      sub: "Not started yet",
      color: "#e8e8e8",
    },
    {
      label: "Blocked",
      value: metrics.blocked,
      icon: Ban,
      sub: "Needs unblocking",
      color: "#f59e0b",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg p-4 flex flex-col gap-2"
          style={{
            backgroundColor: "#161820",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#6b7280" }}>
              {card.label}
            </span>
            <card.icon className="w-4 h-4" style={{ color: card.color }} />
          </div>
          <span className="text-2xl font-medium" style={{ color: card.color }}>
            {card.value}
          </span>
          <span className="text-xs" style={{ color: "#6b7280" }}>
            {card.sub}
          </span>
        </div>
      ))}
    </div>
  );
}