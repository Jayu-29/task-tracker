import { requireAdmin } from "@/lib/session";
import MetricCards from "@/components/dashboard/metric-cards";

export default async function DashboardPage() {
  const session = await requireAdmin();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-lg font-medium" style={{ color: "#e8e8e8" }}>
          Welcome back, {session.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "#6b7280" }}>
          Here's what's happening with your team today.
        </p>
      </div>

      <MetricCards />
    </div>
  );
}
