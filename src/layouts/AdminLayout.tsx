import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export function AdminLayout() {
  return (
    <div dir="rtl">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <div className="flex-1 flex flex-col min-h-screen">
            <AdminHeader />
            <main className="flex-1 overflow-auto p-6">
              <Outlet />
            </main>
          </div>
          <AdminSidebar />
        </div>
      </SidebarProvider>
    </div>
  );
}