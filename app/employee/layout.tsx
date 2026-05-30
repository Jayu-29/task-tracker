import { requireSession } from "@/lib/session";
import EmployeeSidebar from "@/components/layout/employee-sidebar";
import EmployeeBottomNav from "@/components/layout/employee-bottom-nav";
import EmployeeTopbar from "@/components/layout/employee-topbar";

export default async function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "#1a1a1a", color: "#f0f0f0" }}
    >
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <EmployeeSidebar />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <EmployeeTopbar user={session.user} />
        <main
          className="flex-1 overflow-y-auto pb-16 md:pb-0"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden">
        <EmployeeBottomNav />
      </div>
    </div>
  );
}