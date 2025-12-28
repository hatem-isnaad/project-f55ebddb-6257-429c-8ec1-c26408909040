import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Mail,
  Building2,
  Edit,
  Trash2,
  UserCheck,
  UserX
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { mockEmployees, mockDepartments } from "@/data/mockData";
import { Employee } from "@/types";

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case 'manager': return 'secondary';
    default: return 'outline';
  }
};

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'manager': return 'مدير';
    default: return 'موظف';
  }
};

const EmployeesPage = () => {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = 
      `${employee.firstName} ${employee.lastName}`.includes(searchQuery) ||
      employee.email.includes(searchQuery);
    const matchesDepartment = filterDepartment === "all" || employee.departmentId === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const stats = [
    { label: "إجمالي الموظفين", value: employees.length, icon: Users },
    { label: "موظفين نشطين", value: employees.filter(e => e.isActive).length, icon: UserCheck },
    { label: "موظفين معطلين", value: employees.filter(e => !e.isActive).length, icon: UserX },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة الموظفين</h1>
          <p className="text-muted-foreground">عرض وإدارة بيانات الموظفين</p>
        </div>
        <Button asChild>
          <Link to="/employees/new">
            <Plus className="w-4 h-4 ml-2" />
            إضافة موظف
          </Link>
        </Button>
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
                <div className="p-3 rounded-lg bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="البحث بالاسم أو البريد..." 
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 ml-2" />
                <SelectValue placeholder="القسم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأقسام</SelectItem>
                {mockDepartments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">قائمة الموظفين ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الموظف</TableHead>
                <TableHead className="text-right">المنصب</TableHead>
                <TableHead className="text-right">القسم</TableHead>
                <TableHead className="text-right">الدور</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {employee.firstName[0]}{employee.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.firstName} {employee.lastName}</p>
                        <p className="text-xs text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{employee.position}</TableCell>
                  <TableCell className="text-muted-foreground">{employee.departmentName}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(employee.role)}>
                      {getRoleLabel(employee.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={employee.isActive ? "default" : "secondary"}>
                      {employee.isActive ? "نشط" : "معطل"}
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

export default EmployeesPage;
