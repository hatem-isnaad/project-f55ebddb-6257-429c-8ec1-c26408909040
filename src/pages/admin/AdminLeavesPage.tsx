import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CalendarDays, 
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  MoreVertical,
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
import { mockLeaveRequests, mockCompanies } from "@/data/mockData";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { LeaveStatus, LeaveType } from "@/types";

const getStatusBadge = (status: LeaveStatus) => {
  switch (status) {
    case 'approved':
      return <Badge className="bg-success text-success-foreground gap-1"><CheckCircle2 className="w-3 h-3" /> موافق عليه</Badge>;
    case 'rejected':
      return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" /> مرفوض</Badge>;
    case 'pending':
      return <Badge className="bg-warning text-warning-foreground gap-1"><Clock className="w-3 h-3" /> قيد الانتظار</Badge>;
    default:
      return <Badge variant="secondary">غير محدد</Badge>;
  }
};

const getTypeBadge = (type: LeaveType) => {
  switch (type) {
    case 'annual':
      return <Badge variant="outline" className="text-primary border-primary">سنوية</Badge>;
    case 'sick':
      return <Badge variant="outline" className="text-destructive border-destructive">مرضية</Badge>;
    case 'unpaid':
      return <Badge variant="outline" className="text-muted-foreground border-muted-foreground">بدون راتب</Badge>;
    default:
      return <Badge variant="outline">أخرى</Badge>;
  }
};

const AdminLeavesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const statusOptions = [
    { value: "all", label: "جميع الحالات" },
    { value: "pending", label: "قيد الانتظار" },
    { value: "approved", label: "موافق عليه" },
    { value: "rejected", label: "مرفوض" },
  ];

  const typeOptions = [
    { value: "all", label: "جميع الأنواع" },
    { value: "annual", label: "سنوية" },
    { value: "sick", label: "مرضية" },
    { value: "unpaid", label: "بدون راتب" },
  ];

  const filteredLeaves = mockLeaveRequests.filter((leave) => {
    const matchesSearch = leave.employeeName.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || leave.status === filterStatus;
    const matchesType = filterType === "all" || leave.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = [
    { label: "إجمالي الطلبات", value: mockLeaveRequests.length, color: "admin" },
    { label: "قيد الانتظار", value: mockLeaveRequests.filter(l => l.status === 'pending').length, color: "warning" },
    { label: "موافق عليها", value: mockLeaveRequests.filter(l => l.status === 'approved').length, color: "success" },
    { label: "مرفوضة", value: mockLeaveRequests.filter(l => l.status === 'rejected').length, color: "destructive" },
  ];

  const handleApprove = (id: string) => {
    console.log('Approve leave:', id);
  };

  const handleReject = (id: string) => {
    console.log('Reject leave:', id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">طلبات الإجازات</h1>
          <p className="text-muted-foreground">مراجعة وإدارة طلبات إجازات الموظفين</p>
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
              <SearchableSelect
                options={statusOptions}
                value={filterStatus}
                onValueChange={setFilterStatus}
                placeholder="الحالة"
              />
            </div>
            <div className="w-full md:w-40">
              <SearchableSelect
                options={typeOptions}
                value={filterType}
                onValueChange={setFilterType}
                placeholder="النوع"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaves Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الموظف</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">من</TableHead>
                <TableHead className="text-right">إلى</TableHead>
                <TableHead className="text-right">السبب</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeaves.map((leave) => (
                <TableRow key={leave.id} className="hover:bg-secondary/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-admin/10 text-admin">
                          {leave.employeeName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-medium text-foreground">{leave.employeeName}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(leave.type)}</TableCell>
                  <TableCell className="text-muted-foreground en-num">{leave.startDate}</TableCell>
                  <TableCell className="text-muted-foreground en-num">{leave.endDate}</TableCell>
                  <TableCell className="text-muted-foreground max-w-[200px] truncate">{leave.reason}</TableCell>
                  <TableCell>{getStatusBadge(leave.status)}</TableCell>
                  <TableCell>
                    {leave.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          className="bg-success hover:bg-success/90 h-8"
                          onClick={() => handleApprove(leave.id)}
                        >
                          موافقة
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="h-8"
                          onClick={() => handleReject(leave.id)}
                        >
                          رفض
                        </Button>
                      </div>
                    ) : (
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
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
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

export default AdminLeavesPage;