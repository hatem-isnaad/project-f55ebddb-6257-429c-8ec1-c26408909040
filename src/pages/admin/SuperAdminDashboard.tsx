import { motion } from "framer-motion";
import { 
  Building2, 
  Users, 
  Clock, 
  TrendingUp, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MoreVertical,
  Power
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { mockCompanies, mockSuperAdminStats } from "@/data/mockData";

const SuperAdminDashboard = () => {
  const stats = [
    {
      title: "إجمالي الشركات",
      value: mockSuperAdminStats.totalCompanies,
      change: "+2",
      changeType: "positive",
      icon: Building2,
      color: "primary",
    },
    {
      title: "الشركات النشطة",
      value: mockSuperAdminStats.activeCompanies,
      change: "75%",
      changeType: "neutral",
      icon: Power,
      color: "success",
    },
    {
      title: "إجمالي الموظفين",
      value: mockSuperAdminStats.totalEmployees,
      change: "+12",
      changeType: "positive",
      icon: Users,
      color: "accent",
    },
    {
      title: "ساعات العمل اليوم",
      value: `${mockSuperAdminStats.totalWorkHoursToday}`,
      change: "-3%",
      changeType: "negative",
      icon: Clock,
      color: "warning",
    },
    {
      title: "متوسط الإنتاجية",
      value: `${mockSuperAdminStats.averageProductivity}%`,
      change: "+5%",
      changeType: "positive",
      icon: TrendingUp,
      color: "info",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">لوحة تحكم المدير العام</h1>
        <p className="text-muted-foreground">نظرة عامة على جميع الشركات والإحصائيات</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${
                    stat.changeType === 'positive' ? 'text-success' :
                    stat.changeType === 'negative' ? 'text-destructive' :
                    'text-muted-foreground'
                  }`}>
                    {stat.changeType === 'positive' && <ArrowUpRight className="w-3 h-3" />}
                    {stat.changeType === 'negative' && <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Companies Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">الشركات المسجلة</CardTitle>
          <Button size="sm">
            <Building2 className="w-4 h-4 ml-2" />
            إضافة شركة
          </Button>
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
              {mockCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{company.name}</p>
                        {company.parentCompanyId && (
                          <p className="text-xs text-muted-foreground">شركة تابعة</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{company.address}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{company.employeeCount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {company.workingHours.start} - {company.workingHours.end}
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
                          <BarChart3 className="w-4 h-4 ml-2" />
                          التقارير
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Power className="w-4 h-4 ml-2" />
                          {company.isActive ? "تعطيل" : "تفعيل"}
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

      {/* Quick Stats Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">إحصائيات الحضور اليومي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "حاضرون", value: 82, color: "bg-success" },
                { label: "متأخرون", value: 12, color: "bg-warning" },
                { label: "غائبون", value: 6, color: "bg-destructive" },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">أداء الشركات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCompanies.filter(c => c.isActive).map((company) => (
                <div key={company.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-sm">{company.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 20) + 80}%</span>
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
