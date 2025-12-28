import { 
  Clock, 
  Building2, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  User,
  Shield,
  Activity
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

const adminMenuItems = [
  { title: "نظرة عامة", url: "/admin", icon: Activity },
  { title: "الشركات", url: "/admin/companies", icon: Building2 },
  { title: "المستخدمين", url: "/admin/users", icon: Users },
  { title: "التقارير", url: "/admin/reports", icon: BarChart3 },
];

const settingsItems = [
  { title: "إعدادات النظام", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar 
      className="border-r border-border bg-card h-screen sticky top-0"
      collapsible="icon"
      side="left"
    >
      <SidebarHeader className="p-4 border-b border-border">
        <NavLink to="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-destructive flex items-center justify-center shadow-soft flex-shrink-0">
            <Shield className="w-5 h-5 text-destructive-foreground" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-lg font-bold text-foreground">دوام</span>
              <p className="text-xs text-destructive">المدير العام</p>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground px-4 mb-2">
            {!collapsed && "إدارة النظام"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/admin"}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 transition-all duration-200",
                        isActive(item.url) 
                          ? "bg-destructive text-destructive-foreground shadow-soft" 
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
                          ? "bg-destructive text-destructive-foreground shadow-soft" 
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
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-destructive" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm truncate">المدير العام</p>
              <p className="text-xs text-muted-foreground truncate">Super Admin</p>
            </div>
          )}
          {!collapsed && (
            <NavLink to="/" className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
              <LogOut className="w-4 h-4" />
            </NavLink>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
