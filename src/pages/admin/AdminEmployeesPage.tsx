import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Plus, 
  Search, 
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockEmployees, mockCompanies } from "@/data/mockData";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Link } from "react-router-dom";

const AdminEmployeesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCompany, setFilterCompany] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const companyOptions = [
    { value: "all", label: "جميع الشركات" },
    ...mockCompanies.map(c => ({ value: c.id, label: c.name }))
  ];

  const statusOptions = [
    { value: "all", label: "جميع الحالات" },
    { value: "active", label: "نشط" },
    { value: "inactive", label: "غير نشط" },
  ];

  const filteredEmployees = mockEmployees.filter((emp) => {
    const matchesSearch = 
      `${emp.firstName} ${emp.lastName}`.includes(searchQuery) ||
      emp.email.includes(searchQuery) ||
      emp.position.includes(searchQuery);
    const matchesCompany = filterCompany === "all" || emp.companyId === filterCompany;
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "active" ? emp.isActive : !emp.isActive);
    return matchesSearch && matchesCompany && matchesStatus;
  });

  const stats = [
    { label: "إجمالي الموظفين", value: mockEmployees.length, color: "primary" },
    { label: "نشط", value: mockEmployees.filter(e => e.isActive).length, color: "success" },
    { label: "غير نشط", value: mockEmployees.filter(e => !e.isActive).length, color: "muted" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة الموظفين</h1>
          <p className="text-muted-foreground">عرض وإدارة جميع موظفين النظام</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" asChild>
          <Link to="/admin/companies/add">
            <Plus className="w-4 h-4 me-2" />
            إضافة موظف
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-soft transition-shadow">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-foreground en-num">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="البحث بالاسم أو البريد..." 
                className="ps-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <SearchableSelect
                options={companyOptions}
                value={filterCompany}
                onValueChange={setFilterCompany}
                placeholder="الشركة"
              />
            </div>
            <div className="w-full md:w-40">
              <SearchableSelect
                options={statusOptions}
                value={filterStatus}
                onValueChange={setFilterStatus}
                placeholder="الحالة"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">الموظف</TableHead>
                <TableHead className="text-start">المنصب</TableHead>
                <TableHead className="text-start">الشركة</TableHead>
                <TableHead className="text-start">القسم</TableHead>
                <TableHead className="text-start">الحالة</TableHead>
                <TableHead className="text-start">تاريخ التعيين</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className="hover:bg-secondary/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {employee.firstName[0]}{employee.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {employee.firstName} {employee.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{employee.position}</TableCell>
                  <TableCell className="text-muted-foreground">{employee.companyName}</TableCell>
                  <TableCell className="text-muted-foreground">{employee.departmentName}</TableCell>
                  <TableCell>
                    <Badge variant={employee.isActive ? "default" : "secondary"} className={employee.isActive ? "bg-success" : ""}>
                      {employee.isActive ? "نشط" : "غير نشط"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground en-num">{employee.hireDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer hover:bg-secondary">
                          <Eye className="w-4 h-4 me-2" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-secondary">
                          <Edit className="w-4 h-4 me-2" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive cursor-pointer hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4 me-2" />
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

export default AdminEmployeesPage;