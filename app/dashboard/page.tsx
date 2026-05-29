import { requireAdmin } from "@/lib/session";
import Link from "next/link";
import SignOutButton from "@/components/auth/sign-out-button";

export default async function DashboardPage() {
  const session = await requireAdmin();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Welcome, {session.user.name}</h1>
          <p className="text-sm text-muted-foreground">Admin Dashboard</p>
        </div>
        <SignOutButton />
      </div>

      <div className="flex gap-4">
        <Link
          href="/dashboard/tasks"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
        >
          View All Tasks
        </Link>
        <Link
          href="/dashboard/tasks/new"
          className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
        >
          Create Task
        </Link>
      </div>
    </div>
  );
}