import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Layouts
import { AdminLayout } from "./layouts/AdminLayout";
import { CompanyLayout } from "./layouts/CompanyLayout";

// Company Pages
import CompanyDashboard from "./pages/company/CompanyDashboard";
import SubCompaniesPage from "./pages/company/SubCompaniesPage";
import EmployeesPage from "./pages/company/EmployeesPage";
import AddEmployeePage from "./pages/company/AddEmployeePage";
import TasksPage from "./pages/company/TasksPage";
import AttendancePage from "./pages/company/AttendancePage";
import LeavesPage from "./pages/company/LeavesPage";
import ReportsPage from "./pages/company/ReportsPage";
import CompanySettingsPage from "./pages/company/CompanySettingsPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCompaniesPage from "./pages/admin/AdminCompaniesPage";
import AddCompanyPage from "./pages/admin/AddCompanyPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminReportsPage from "./pages/admin/AdminReportsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminEmployeesPage from "./pages/admin/AdminEmployeesPage";
import AdminTasksPage from "./pages/admin/AdminTasksPage";
import AdminAttendancePage from "./pages/admin/AdminAttendancePage";
import AdminLeavesPage from "./pages/admin/AdminLeavesPage";
import AdminTrackingSettingsPage from "./pages/admin/AdminTrackingSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/landing" element={<Index />} />
          
          {/* Company Owner / Employee Dashboard - starts with / */}
          <Route path="/" element={<CompanyLayout />}>
            <Route index element={<CompanyDashboard />} />
            <Route path="sub-companies" element={<SubCompaniesPage />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="employees/add" element={<AddEmployeePage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="leaves" element={<LeavesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<CompanySettingsPage />} />
          </Route>

          {/* Super Admin Dashboard - starts with /admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="companies" element={<AdminCompaniesPage />} />
            <Route path="companies/add" element={<AddCompanyPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="employees" element={<AdminEmployeesPage />} />
            <Route path="tasks" element={<AdminTasksPage />} />
            <Route path="attendance" element={<AdminAttendancePage />} />
            <Route path="leaves" element={<AdminLeavesPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="tracking-settings" element={<AdminTrackingSettingsPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;