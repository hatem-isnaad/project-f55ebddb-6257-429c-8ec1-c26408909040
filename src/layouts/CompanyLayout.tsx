import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CompanySidebar } from "@/components/company/CompanySidebar";
import { CompanyHeader } from "@/components/company/CompanyHeader";

export function CompanyLayout() {
  return (
    <SidebarProvider>
      <div dir="rtl" className="min-h-screen flex w-full bg-background">
        <CompanySidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <CompanyHeader />
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}