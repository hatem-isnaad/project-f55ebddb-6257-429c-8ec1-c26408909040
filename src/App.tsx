import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import { DashboardLayout } from "./layouts/DashboardLayout";
import NotFound from "./pages/NotFound";

// Admin Pages
import SuperAdminDashboard from "./pages/admin/SuperAdminDashboard";

// Employee Pages
import EmployeesPage from "./pages/employees/EmployeesPage";

// Task Pages
import TasksPage from "./pages/tasks/TasksPage";

// Attendance Pages
import AttendancePage from "./pages/attendance/AttendancePage";

// Company Pages
import CompaniesPage from "./pages/companies/CompaniesPage";

// Leave Pages
import LeavesPage from "./pages/leaves/LeavesPage";

// Reports Pages
import ReportsPage from "./pages/reports/ReportsPage";

// Settings Pages
import SettingsPage from "./pages/settings/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="admin" element={<SuperAdminDashboard />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="leaves" element={<LeavesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
