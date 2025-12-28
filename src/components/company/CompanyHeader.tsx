import { Bell, Search, Menu, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export function CompanyHeader() {
  const today = new Date().toLocaleDateString('en-US', { 
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
          <div>
            <p className="text-sm text-muted-foreground en-num">{today}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="بحث..." 
              className="bg-transparent border-none outline-none text-sm w-40 placeholder:text-muted-foreground focus:ring-0"
            />
          </div>

          {/* Admin Access */}
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 border-admin/30 text-admin hover:bg-admin/10 hover:text-admin hover:border-admin/50 transition-colors" 
            asChild
          >
            <Link to="/admin">
              <Shield className="w-4 h-4" />
              <span className="hidden md:inline">لوحة المدير</span>
            </Link>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center en-num">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 font-semibold border-b">الإشعارات</div>
              {mockNotifications.slice(0, 3).map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-secondary">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-xs text-muted-foreground">{notification.message}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary hover:text-primary cursor-pointer">
                عرض جميع الإشعارات
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Avatar className="w-8 h-8 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">أم</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="p-2">
                <p className="font-medium">أحمد محمد</p>
                <p className="text-xs text-muted-foreground">مالك الشركة</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-secondary">الملف الشخصي</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-secondary">الإعدادات</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive cursor-pointer hover:bg-destructive/10 hover:text-destructive">
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}