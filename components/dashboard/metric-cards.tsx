import { getDashboardMetrics } from "@/lib/data/dashboard";
import { CheckCircle, Clock, AlertTriangle, LayoutList } from "lucide-react";

export default async function MetricCards() {
  const metrics = await getDashboardMetrics();

  const cards = [
    {
      label: "Total tasks",
      value: metrics.total,
      icon: LayoutList,
      sub: "This month",
      color: "#f0f0f0",
    },
    {
      label: "In progress",
      value: metrics.inProgress,
      icon: Clock,
      sub: "Active",
      color: "#f0f0f0",
    },
    {
      label: "Completed",
      value: metrics.completed,
      icon: CheckCircle,
      sub: "This month",
      color: "#10b981",
    },
    {
      label: "Overdue",
      value: metrics.overdue,
      icon: AlertTriangle,
      sub: "Needs attention",
      color: "#ef4444",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg p-4 flex flex-col gap-3"
          style={{
            backgroundColor: "#242424",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#737373" }}>
              {card.label}
            </span>
            <card.icon className="w-4 h-4" style={{ color: card.color }} />
          </div>
          <span className="text-3xl font-medium" style={{ color: card.color }}>
            {card.value}
          </span>
          <span className="text-xs" style={{ color: "#737373" }}>
            {card.sub}
          </span>
        </div>
      ))}
    </div>
  );
}