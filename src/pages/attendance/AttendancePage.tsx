import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  Calendar,
  MapPin,
  Search,
  Filter,
  Download,
  UserCheck,
  UserX,
  AlertCircle,
  CheckCircle2
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockAttendance, mockEmployees } from "@/data/mockData";
import { AttendanceRecord, AttendanceStatus } from "@/types";

const getStatusBadge = (status: AttendanceStatus) => {
  switch (status) {
    case 'present':
      return <Badge className="bg-success/10 text-success border-success/20">حاضر</Badge>;
    case 'late':
      return <Badge className="bg-warning/10 text-warning border-warning/20">متأخر</Badge>;
    case 'absent':
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">غائب</Badge>;
    case 'early_leave':
      return <Badge className="bg-info/10 text-info border-info/20">مغادرة مبكرة</Badge>;
    default:
      return <Badge variant="secondary">غير معروف</Badge>;
  }
};

const formatDuration = (minutes?: number) => {
  if (!minutes) return '-';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}س ${mins}د`;
};

const AttendancePage = () => {
  const [attendance] = useState<AttendanceRecord[]>(mockAttendance);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const filteredAttendance = attendance.filter((record) => {
    const matchesSearch = record.employeeName.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    const matchesDate = record.date === selectedDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const todayStats = {
    present: attendance.filter(a => a.status === 'present').length,
    late: attendance.filter(a => a.status === 'late').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    total: mockEmployees.length,
  };

  const stats = [
    { 
      label: "حاضرون", 
      value: todayStats.present, 
      icon: UserCheck, 
      color: "success",
      percentage: Math.round((todayStats.present / todayStats.total) * 100)
    },
    { 
      label: "متأخرون", 
      value: todayStats.late, 
      icon: AlertCircle, 
      color: "warning",
      percentage: Math.round((todayStats.late / todayStats.total) * 100)
    },
    { 
      label: "غائبون", 
      value: todayStats.absent, 
      icon: UserX, 
      color: "destructive",
      percentage: Math.round((todayStats.absent / todayStats.total) * 100)
    },
    { 
      label: "نسبة الحضور", 
      value: `${Math.round(((todayStats.present + todayStats.late) / todayStats.total) * 100)}%`, 
      icon: CheckCircle2, 
      color: "primary",
      percentage: null
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">سجل الحضور والانصراف</h1>
          <p className="text-muted-foreground">متابعة حضور وانصراف الموظفين</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 ml-2" />
          تصدير التقرير
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                  </div>
                  {stat.percentage !== null && (
                    <span className="text-xs text-muted-foreground">{stat.percentage}%</span>
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
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
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="البحث بالاسم..." 
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-44"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <Filter className="w-4 h-4 ml-2" />
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="present">حاضر</SelectItem>
                <SelectItem value="late">متأخر</SelectItem>
                <SelectItem value="absent">غائب</SelectItem>
                <SelectItem value="early_leave">مغادرة مبكرة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">سجل اليوم ({filteredAttendance.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الموظف</TableHead>
                <TableHead className="text-right">وقت الحضور</TableHead>
                <TableHead className="text-right">وقت الانصراف</TableHead>
                <TableHead className="text-right">مدة العمل</TableHead>
                <TableHead className="text-right">الموقع</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">ملاحظات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {record.employeeName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{record.employeeName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {record.checkIn ? (
                      <div className="flex items-center gap-2 text-success">
                        <Clock className="w-4 h-4" />
                        {record.checkIn}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {record.checkOut ? (
                      <div className="flex items-center gap-2 text-destructive">
                        <Clock className="w-4 h-4" />
                        {record.checkOut}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatDuration(record.workDuration)}
                  </TableCell>
                  <TableCell>
                    {record.location ? (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate max-w-[150px]">{record.location.address}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {record.notes || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Live Check-in Widget */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            تسجيل الحضور المباشر
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-center md:text-right">
              <p className="text-4xl font-bold text-foreground">
                {new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex gap-3 mr-auto">
              <Button size="lg" className="gap-2">
                <UserCheck className="w-5 h-5" />
                تسجيل الحضور
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <UserX className="w-5 h-5" />
                تسجيل الانصراف
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendancePage;
