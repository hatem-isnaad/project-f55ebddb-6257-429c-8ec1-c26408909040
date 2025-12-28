import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  Search, 
  Calendar,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter
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
import { mockAttendance, mockCompanies } from "@/data/mockData";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { DatePicker } from "@/components/ui/date-picker";
import { AttendanceStatus } from "@/types";

const getStatusBadge = (status: AttendanceStatus) => {
  switch (status) {
    case 'present':
      return <Badge className="bg-success text-success-foreground gap-1"><CheckCircle2 className="w-3 h-3" /> حاضر</Badge>;
    case 'absent':
      return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" /> غائب</Badge>;
    case 'late':
      return <Badge className="bg-warning text-warning-foreground gap-1"><AlertCircle className="w-3 h-3" /> متأخر</Badge>;
    case 'early_leave':
      return <Badge variant="secondary" className="gap-1"><Clock className="w-3 h-3" /> خروج مبكر</Badge>;
    default:
      return <Badge variant="secondary">غير محدد</Badge>;
  }
};

const AdminAttendancePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCompany, setFilterCompany] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const companyOptions = [
    { value: "all", label: "جميع الشركات" },
    ...mockCompanies.map(c => ({ value: c.id, label: c.name }))
  ];

  const statusOptions = [
    { value: "all", label: "جميع الحالات" },
    { value: "present", label: "حاضر" },
    { value: "absent", label: "غائب" },
    { value: "late", label: "متأخر" },
    { value: "early_leave", label: "خروج مبكر" },
  ];

  const filteredAttendance = mockAttendance.filter((record) => {
    const matchesSearch = record.employeeName.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "إجمالي السجلات", value: mockAttendance.length, color: "admin" },
    { label: "حاضر", value: mockAttendance.filter(a => a.status === 'present').length, color: "success" },
    { label: "غائب", value: mockAttendance.filter(a => a.status === 'absent').length, color: "destructive" },
    { label: "متأخر", value: mockAttendance.filter(a => a.status === 'late').length, color: "warning" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">سجل الحضور</h1>
          <p className="text-muted-foreground">متابعة حضور وانصراف جميع الموظفين</p>
        </div>
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
            <Card className="hover:shadow-admin transition-shadow">
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
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="البحث بالاسم..." 
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <DatePicker
                date={selectedDate}
                onDateChange={setSelectedDate}
                placeholder="اختر التاريخ"
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

      {/* Attendance Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الموظف</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">وقت الحضور</TableHead>
                <TableHead className="text-right">وقت الانصراف</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الموقع</TableHead>
                <TableHead className="text-right">ملاحظات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.map((record) => (
                <TableRow key={record.id} className="hover:bg-secondary/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-admin/10 text-admin">
                          {record.employeeName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-medium text-foreground">{record.employeeName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground en-num">{record.date}</TableCell>
                  <TableCell className="text-muted-foreground en-num">{record.checkIn || '-'}</TableCell>
                  <TableCell className="text-muted-foreground en-num">{record.checkOut || '-'}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>
                    {record.location ? (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {record.location.address}
                      </div>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{record.notes || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAttendancePage;