import { 
  Clock, 
  Building2, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Shield,
  Activity,
  ListTodo,
  CalendarDays,
  UserPlus,
  Cog,
  PanelRightClose,
  PanelRightOpen
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const adminMenuItems = [
  { title: "نظرة عامة", url: "/admin", icon: Activity },
  { title: "الشركات", url: "/admin/companies", icon: Building2 },
  { title: "إضافة شركة", url: "/admin/companies/add", icon: UserPlus },
  { title: "المستخدمين", url: "/admin/users", icon: Users },
  { title: "الموظفين", url: "/admin/employees", icon: Users },
  { title: "المهام", url: "/admin/tasks", icon: ListTodo },
  { title: "الحضور", url: "/admin/attendance", icon: Clock },
  { title: "الإجازات", url: "/admin/leaves", icon: CalendarDays },
  { title: "التقارير", url: "/admin/reports", icon: BarChart3 },
];

const settingsItems = [
  { title: "إعدادات النظام", url: "/admin/settings", icon: Settings },
  { title: "إعدادات التتبع", url: "/admin/tracking-settings", icon: Cog },
];

export function AdminSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const SidebarLink = ({ item }: { item: typeof adminMenuItems[0] }) => {
    const active = isActive(item.url);
    const linkContent = (
      <NavLink 
        to={item.url} 
        end={item.url === "/admin"}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full",
          collapsed ? "justify-center" : "",
          active 
            ? "bg-primary text-primary-foreground shadow-soft" 
            : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
        )}
      >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && <span className="font-medium">{item.title}</span>}
      </NavLink>
    );

    if (collapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="left" className="font-cairo">
            {item.title}
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  return (
    <Sidebar 
      className="border-l border-border bg-card"
      collapsible="icon"
      side="right"
    >
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 hover:bg-sidebar-hover transition-colors flex-shrink-0"
          >
            {collapsed ? (
              <PanelRightOpen className="w-5 h-5 text-primary" />
            ) : (
              <PanelRightClose className="w-5 h-5 text-primary" />
            )}
          </Button>
          {!collapsed && (
            <NavLink to="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft flex-shrink-0">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground">دوام</span>
                <p className="text-xs text-primary">المدير العام</p>
              </div>
            </NavLink>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4 px-2">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs text-muted-foreground px-3 mb-2 font-semibold">
              إدارة النظام
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0 h-auto hover:bg-transparent">
                    <SidebarLink item={item} />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          {!collapsed && (
            <SidebarGroupLabel className="text-xs text-muted-foreground px-3 mb-2 font-semibold">
              الإعدادات
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0 h-auto hover:bg-transparent">
                    <SidebarLink item={item} />
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
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ring-2 ring-primary/20">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">المدير العام</p>
                <p className="text-xs text-muted-foreground truncate">Super Admin</p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink 
                    to="/" 
                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="left" className="font-cairo">
                  تسجيل الخروج
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}