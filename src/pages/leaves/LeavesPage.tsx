import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CalendarDays, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockLeaveRequests } from "@/data/mockData";
import { LeaveRequest, LeaveType, LeaveStatus } from "@/types";

const getStatusBadge = (status: LeaveStatus) => {
  switch (status) {
    case 'approved':
      return <Badge className="bg-success/10 text-success border-success/20">موافق عليها</Badge>;
    case 'rejected':
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">مرفوضة</Badge>;
    default:
      return <Badge className="bg-warning/10 text-warning border-warning/20">قيد المراجعة</Badge>;
  }
};

const getTypeLabel = (type: LeaveType) => {
  switch (type) {
    case 'annual': return 'سنوية';
    case 'sick': return 'مرضية';
    case 'unpaid': return 'بدون راتب';
    default: return 'مخصصة';
  }
};

const getTypeBadge = (type: LeaveType) => {
  switch (type) {
    case 'annual':
      return <Badge variant="outline" className="bg-primary/10">سنوية</Badge>;
    case 'sick':
      return <Badge variant="outline" className="bg-destructive/10">مرضية</Badge>;
    case 'unpaid':
      return <Badge variant="outline" className="bg-warning/10">بدون راتب</Badge>;
    default:
      return <Badge variant="outline">مخصصة</Badge>;
  }
};

const LeavesPage = () => {
  const [leaves] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch = leave.employeeName.includes(searchQuery) || leave.reason.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || leave.status === filterStatus;
    const matchesType = filterType === "all" || leave.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = [
    { label: "إجمالي الطلبات", value: leaves.length, icon: CalendarDays, color: "primary" },
    { label: "قيد المراجعة", value: leaves.filter(l => l.status === 'pending').length, icon: Clock, color: "warning" },
    { label: "موافق عليها", value: leaves.filter(l => l.status === 'approved').length, icon: CheckCircle2, color: "success" },
    { label: "مرفوضة", value: leaves.filter(l => l.status === 'rejected').length, icon: XCircle, color: "destructive" },
  ];

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة الإجازات</h1>
          <p className="text-muted-foreground">عرض وإدارة طلبات الإجازات</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              طلب إجازة جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>طلب إجازة جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>نوع الإجازة</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الإجازة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">سنوية</SelectItem>
                    <SelectItem value="sick">مرضية</SelectItem>
                    <SelectItem value="unpaid">بدون راتب</SelectItem>
                    <SelectItem value="custom">مخصصة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>تاريخ البداية</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>تاريخ النهاية</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>السبب</Label>
                <Textarea placeholder="أدخل سبب الإجازة" rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>إلغاء</Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>إرسال الطلب</Button>
            </div>
          </DialogContent>
        </Dialog>
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

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="البحث بالاسم أو السبب..." 
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="النوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="annual">سنوية</SelectItem>
                <SelectItem value="sick">مرضية</SelectItem>
                <SelectItem value="unpaid">بدون راتب</SelectItem>
                <SelectItem value="custom">مخصصة</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <Filter className="w-4 h-4 ml-2" />
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد المراجعة</SelectItem>
                <SelectItem value="approved">موافق عليها</SelectItem>
                <SelectItem value="rejected">مرفوضة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leaves Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">طلبات الإجازات ({filteredLeaves.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الموظف</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">من</TableHead>
                <TableHead className="text-right">إلى</TableHead>
                <TableHead className="text-right">المدة</TableHead>
                <TableHead className="text-right">السبب</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {leave.employeeName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{leave.employeeName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(leave.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {leave.startDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {leave.endDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {calculateDays(leave.startDate, leave.endDate)} يوم
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {leave.reason}
                  </TableCell>
                  <TableCell>{getStatusBadge(leave.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {leave.status === 'pending' && (
                          <>
                            <DropdownMenuItem className="text-success">
                              <CheckCircle2 className="w-4 h-4 ml-2" />
                              قبول
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="w-4 h-4 ml-2" />
                              رفض
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem>
                          <AlertCircle className="w-4 h-4 ml-2" />
                          عرض التفاصيل
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

export default LeavesPage;
