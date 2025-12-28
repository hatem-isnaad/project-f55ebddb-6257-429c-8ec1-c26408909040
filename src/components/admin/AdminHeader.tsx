import { Bell, Search, Menu, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { mockNotifications } from "@/data/mockData";

export function AdminHeader() {
  const today = new Date().toLocaleDateString('ar-SA', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SidebarTrigger>
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="gap-1">
              <Shield className="w-3 h-3" />
              وضع المدير العام
            </Badge>
            <span className="text-sm text-muted-foreground hidden md:inline">{today}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="بحث..." 
              className="bg-transparent border-none outline-none text-sm w-40 placeholder:text-muted-foreground"
            />
          </div>

          {/* Impersonate */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                <span className="hidden md:inline">انتحال هوية</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2 text-sm font-semibold">الدخول كـ</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/">مالك شركة - أحمد محمد</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/">مدير - سارة علي</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/">موظف - خالد العمري</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 font-semibold border-b">الإشعارات</div>
              {mockNotifications.slice(0, 3).map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-xs text-muted-foreground">{notification.message}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-destructive/10 text-destructive text-sm">
                    <Shield className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="p-2">
                <p className="font-medium">المدير العام</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>إعدادات النظام</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">تسجيل الخروج</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
