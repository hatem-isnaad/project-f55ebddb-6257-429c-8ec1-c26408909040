import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Download, 
  Calendar,
  Users,
  Clock,
  TrendingUp,
  FileText,
  PieChart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockDashboardStats, mockCompanies, mockEmployees } from "@/data/mockData";

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedCompany, setSelectedCompany] = useState("all");

  const reportTypes = [
    { id: "attendance", title: "تقرير الحضور", icon: Clock, description: "تفاصيل حضور وانصراف الموظفين" },
    { id: "productivity", title: "تقرير الإنتاجية", icon: TrendingUp, description: "معدلات إنجاز المهام" },
    { id: "employees", title: "تقرير الموظفين", icon: Users, description: "بيانات وإحصائيات الموظفين" },
    { id: "leaves", title: "تقرير الإجازات", icon: Calendar, description: "ملخص الإجازات والغيابات" },
  ];

  const stats = mockDashboardStats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">التقارير والتحليلات</h1>
          <p className="text-muted-foreground">عرض وتحليل بيانات الشركة</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير PDF
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 ml-2" />
            تصدير Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Input type="date" className="w-44" />
              <span className="text-muted-foreground">إلى</span>
              <Input type="date" className="w-44" />
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="الفترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">أسبوعي</SelectItem>
                <SelectItem value="month">شهري</SelectItem>
                <SelectItem value="quarter">ربع سنوي</SelectItem>
                <SelectItem value="year">سنوي</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="الشركة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الشركات</SelectItem>
                {mockCompanies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "إجمالي الموظفين", value: stats.totalEmployees, icon: Users, color: "primary" },
          { label: "نسبة الحضور", value: `${Math.round((stats.presentToday / stats.totalEmployees) * 100)}%`, icon: Clock, color: "success" },
          { label: "المهام المكتملة", value: stats.completedTasks, icon: TrendingUp, color: "accent" },
          { label: "معدل الإنتاجية", value: `${stats.productivityRate}%`, icon: BarChart3, color: "info" },
        ].map((stat, index) => (
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

      {/* Report Types */}
      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="mb-4 grid grid-cols-2 md:grid-cols-4 w-full">
          {reportTypes.map((report) => (
            <TabsTrigger key={report.id} value={report.id} className="gap-2">
              <report.icon className="w-4 h-4" />
              <span className="hidden md:inline">{report.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="attendance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">توزيع الحضور اليومي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "حاضرون في الوقت", value: 75, color: "bg-success" },
                    { label: "متأخرون", value: 15, color: "bg-warning" },
                    { label: "غائبون", value: 10, color: "bg-destructive" },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                      <div className="h-3 bg-secondary rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${item.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">متوسط ساعات العمل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-5xl font-bold text-primary mb-2">{stats.averageWorkHours}</div>
                  <p className="text-muted-foreground">ساعة يومياً</p>
                  <div className="mt-4 flex justify-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">+0.5</p>
                      <p className="text-xs text-muted-foreground">مقارنة بالشهر السابق</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="productivity">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">معدل الإنتاجية حسب القسم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { dept: "تقنية المعلومات", productivity: 92 },
                  { dept: "الموارد البشرية", productivity: 88 },
                  { dept: "المالية", productivity: 85 },
                  { dept: "التسويق", productivity: 90 },
                  { dept: "المبيعات", productivity: 78 },
                ].map((item, index) => (
                  <div key={item.dept} className="flex items-center gap-4">
                    <span className="w-32 text-sm text-muted-foreground">{item.dept}</span>
                    <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.productivity}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <span className="font-medium w-12 text-left">{item.productivity}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">توزيع الموظفين حسب القسم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { dept: "تقنية المعلومات", count: 15, color: "bg-primary" },
                    { dept: "الموارد البشرية", count: 8, color: "bg-success" },
                    { dept: "المالية", count: 6, color: "bg-warning" },
                    { dept: "التسويق", count: 10, color: "bg-accent" },
                    { dept: "المبيعات", count: 12, color: "bg-info" },
                  ].map((item) => (
                    <div key={item.dept} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="font-medium">{item.dept}</span>
                      </div>
                      <Badge variant="secondary">{item.count} موظف</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">حالة الموظفين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <p className="text-3xl font-bold text-success">{mockEmployees.filter(e => e.isActive).length}</p>
                    <p className="text-sm text-muted-foreground">موظف نشط</p>
                  </div>
                  <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <p className="text-3xl font-bold text-destructive">{mockEmployees.filter(e => !e.isActive).length}</p>
                    <p className="text-sm text-muted-foreground">موظف معطل</p>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <p className="text-3xl font-bold text-primary">{mockEmployees.filter(e => e.role === 'manager').length}</p>
                    <p className="text-sm text-muted-foreground">مديرين</p>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <p className="text-3xl font-bold text-accent">{mockEmployees.filter(e => e.allowRemoteWork).length}</p>
                    <p className="text-sm text-muted-foreground">عمل عن بُعد</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaves">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ملخص الإجازات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-6 bg-primary/10 rounded-lg">
                  <p className="text-4xl font-bold text-primary">24</p>
                  <p className="text-sm text-muted-foreground">إجازة سنوية</p>
                </div>
                <div className="text-center p-6 bg-destructive/10 rounded-lg">
                  <p className="text-4xl font-bold text-destructive">8</p>
                  <p className="text-sm text-muted-foreground">إجازة مرضية</p>
                </div>
                <div className="text-center p-6 bg-warning/10 rounded-lg">
                  <p className="text-4xl font-bold text-warning">3</p>
                  <p className="text-sm text-muted-foreground">بدون راتب</p>
                </div>
                <div className="text-center p-6 bg-success/10 rounded-lg">
                  <p className="text-4xl font-bold text-success">92%</p>
                  <p className="text-sm text-muted-foreground">نسبة الموافقة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
