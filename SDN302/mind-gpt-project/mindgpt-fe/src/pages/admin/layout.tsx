import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  LogOut,
  Home,
  Users,
  Building2,
  MapIcon,
  BrainCircuit,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-center h-16 ">
          <BrainCircuit className="size-6 text-primary" />
          <h1 className="text-lg ml-2 font-semibold">Trang chủ Admin</h1>
        </div>
        <nav className="mt-8">
          <NavItem
            href="/admin/users"
            icon={<Users className="h-5 w-5" />}
            text="Người dùng"
          />
          <NavItem
            href="/admin/orgs"
            icon={<Building2 className="h-5 w-5" />}
            text="Tổ chức"
          />
          <NavItem
            href="/admin/mindmaps"
            icon={<MapIcon className="h-5 w-5" />}
            text="Mindmaps"
          />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>
          <Link to={"/login"}>
            <Button variant="ghost" className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
            </Button>
          </Link>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <Link
      to={href}
      className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
    >
      {icon}
      <span className="mx-3">{text}</span>
    </Link>
  );
}
