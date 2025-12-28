import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  MoreVertical,
  Shield,
  Building2,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  User
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockEmployees } from "@/data/mockData";

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'super_admin': return <Badge variant="destructive">مدير عام</Badge>;
    case 'company_owner': return <Badge className="bg-primary">مالك شركة</Badge>;
    case 'company_admin': return <Badge className="bg-accent">مدير شركة</Badge>;
    case 'manager': return <Badge variant="secondary">مدير</Badge>;
    default: return <Badge variant="outline">موظف</Badge>;
  }
};

const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const allUsers = mockEmployees;

  const filteredUsers = allUsers.filter((user) => {
    return `${user.firstName} ${user.lastName}`.includes(searchQuery) ||
      user.email.includes(searchQuery);
  });

  const stats = [
    { label: "إجمالي المستخدمين", value: allUsers.length, icon: Users },
    { label: "مستخدمين نشطين", value: allUsers.filter(e => e.isActive).length, icon: UserCheck },
    { label: "مديرين", value: allUsers.filter(e => e.role === 'manager').length, icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">إدارة المستخدمين</h1>
        <p className="text-muted-foreground">عرض وإدارة جميع مستخدمي النظام</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-destructive/10">
                  <stat.icon className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="البحث في المستخدمين..." 
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">قائمة المستخدمين ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">المستخدم</TableHead>
                <TableHead className="text-right">الشركة</TableHead>
                <TableHead className="text-right">الدور</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-destructive/10 text-destructive">
                          {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{user.companyName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "default" : "secondary"}>
                      {user.isActive ? "نشط" : "معطل"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <User className="w-4 h-4 ml-2" />
                          انتحال الهوية
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 ml-2" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 ml-2" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
