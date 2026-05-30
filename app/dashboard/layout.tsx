import { requireAdmin } from "@/lib/session";
import Sidebar from "@/components/layout/sidebar";
import BottomNav from "@/components/layout/bottom-nav";
import Topbar from "@/components/layout/topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "#1a1a1a", color: "#f0f0f0" }}
    >
      {/* Desktop: icon sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar user={session.user} />
        <main
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          {children}
        </main>
      </div>

      {/* Mobile: bottom nav */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}