import { 
  Clock, 
  LayoutDashboard, 
  ListTodo, 
  BarChart3, 
  Settings, 
  LogOut,
  User,
  Users,
  CalendarDays,
  GitBranch,
  UserPlus,
  ChevronLeft,
  ChevronRight
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const companyMenuItems = [
  { title: "الرئيسية", url: "/", icon: LayoutDashboard },
  { title: "الشركات التابعة", url: "/sub-companies", icon: GitBranch },
  { title: "الموظفين", url: "/employees", icon: Users },
  { title: "إضافة موظف", url: "/employees/add", icon: UserPlus },
  { title: "المهام", url: "/tasks", icon: ListTodo },
  { title: "الحضور", url: "/attendance", icon: Clock },
  { title: "الإجازات", url: "/leaves", icon: CalendarDays },
  { title: "التقارير", url: "/reports", icon: BarChart3 },
];

const settingsItems = [
  { title: "إعدادات الشركة", url: "/settings", icon: Settings },
];

export function CompanySidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const SidebarLink = ({ item }: { item: typeof companyMenuItems[0] }) => {
    const active = isActive(item.url);
    const linkContent = (
      <NavLink 
        to={item.url} 
        end={item.url === "/"}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full",
          collapsed ? "justify-center" : "",
          active 
            ? "bg-primary text-primary-foreground shadow-soft" 
            : "text-muted-foreground hover:bg-company-light hover:text-foreground"
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
      className={cn(
        "border-l border-border bg-card h-screen sticky top-0 transition-all duration-300",
        collapsed ? "w-[4rem]" : "w-[16rem]"
      )}
      collapsible="icon"
      side="right"
    >
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft flex-shrink-0">
              <Clock className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-lg font-bold text-foreground">دوام</span>
                <p className="text-xs text-primary">لوحة التحكم</p>
              </div>
            )}
          </NavLink>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              "h-8 w-8 rounded-full hover:bg-company-light transition-colors",
              collapsed && "absolute -left-4 top-6 bg-card border border-border shadow-sm"
            )}
          >
            {collapsed ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4 px-2">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs text-muted-foreground px-3 mb-2 font-semibold">
              القائمة الرئيسية
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {companyMenuItems.map((item) => (
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
            <User className="w-5 h-5 text-primary" />
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">أحمد محمد</p>
                <p className="text-xs text-muted-foreground truncate">مالك الشركة</p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
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