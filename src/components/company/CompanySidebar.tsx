import { 
  Clock, 
  LayoutDashboard, 
  ListTodo, 
  BarChart3, 
  Settings, 
  LogOut,
  User,
  Building2,
  Users,
  CalendarDays,
  GitBranch
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const companyMenuItems = [
  { title: "الرئيسية", url: "/", icon: LayoutDashboard },
  { title: "الشركات التابعة", url: "/sub-companies", icon: GitBranch },
  { title: "الموظفين", url: "/employees", icon: Users },
  { title: "المهام", url: "/tasks", icon: ListTodo },
  { title: "الحضور", url: "/attendance", icon: Clock },
  { title: "الإجازات", url: "/leaves", icon: CalendarDays },
  { title: "التقارير", url: "/reports", icon: BarChart3 },
];

const settingsItems = [
  { title: "إعدادات الشركة", url: "/settings", icon: Settings },
];

export function CompanySidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <Sidebar 
      className="border-r border-border bg-card h-screen sticky top-0"
      collapsible="icon"
      side="left"
    >
      <SidebarHeader className="p-4 border-b border-border">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft flex-shrink-0">
            <Clock className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-lg font-bold text-foreground">دوام</span>
              <p className="text-xs text-muted-foreground">لوحة التحكم</p>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground px-4 mb-2">
            {!collapsed && "القائمة الرئيسية"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {companyMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 transition-all duration-200",
                        isActive(item.url) 
                          ? "bg-primary text-primary-foreground shadow-soft" 
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs text-muted-foreground px-4 mb-2">
            {!collapsed && "الإعدادات"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 transition-all duration-200",
                        isActive(item.url) 
                          ? "bg-primary text-primary-foreground shadow-soft" 
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center gap-3",
          collapsed && "justify-center"
        )}>
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm truncate">أحمد محمد</p>
              <p className="text-xs text-muted-foreground truncate">مالك الشركة</p>
            </div>
          )}
          {!collapsed && (
            <button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
