import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  Plus, 
  Search, 
  MoreVertical,
  MapPin,
  Clock,
  Users,
  Edit,
  Trash2,
  Power,
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Link } from "react-router-dom";
import { mockCompanies } from "@/data/mockData";

const AdminCompaniesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = mockCompanies.filter((company) => {
    return company.name.includes(searchQuery) || company.address.includes(searchQuery);
  });

  const stats = [
    { label: "إجمالي الشركات", value: mockCompanies.length, icon: Building2, color: "primary" },
    { label: "شركات نشطة", value: mockCompanies.filter(c => c.isActive).length, icon: Power, color: "success" },
    { label: "إجمالي الموظفين", value: mockCompanies.reduce((acc, c) => acc + c.employeeCount, 0), icon: Users, color: "accent" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة الشركات</h1>
          <p className="text-muted-foreground">عرض وإدارة جميع الشركات في النظام</p>
        </div>
        <Button asChild>
          <Link to="/admin/companies/new">
            <Plus className="w-4 h-4 ml-2" />
            إضافة شركة
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
                <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
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
              placeholder="البحث في الشركات..." 
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">قائمة الشركات ({filteredCompanies.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الشركة</TableHead>
                <TableHead className="text-right">الموقع</TableHead>
                <TableHead className="text-right">الموظفين</TableHead>
                <TableHead className="text-right">ساعات العمل</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{company.name}</p>
                        {company.parentCompanyId && (
                          <p className="text-xs text-muted-foreground">شركة تابعة</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {company.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{company.employeeCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {company.workingHours.start} - {company.workingHours.end}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={company.isActive ? "default" : "secondary"}>
                      {company.isActive ? "نشطة" : "معطلة"}
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
                          <Eye className="w-4 h-4 ml-2" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 ml-2" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Power className="w-4 h-4 ml-2" />
                          {company.isActive ? "تعطيل" : "تفعيل"}
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

export default AdminCompaniesPage;
