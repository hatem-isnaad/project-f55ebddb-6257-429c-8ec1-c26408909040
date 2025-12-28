import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, User, Mail, Phone, Building2, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { mockDepartments, mockCompanies } from "@/data/mockData";

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    departmentId: "",
    companyId: "",
    role: "employee",
    allowRemoteWork: false,
    workStart: "08:00",
    workEnd: "17:00",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إضافة الموظف",
      description: `تم إضافة ${formData.firstName} ${formData.lastName} بنجاح`,
    });
    navigate("/employees");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowRight className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">إضافة موظف جديد</h1>
          <p className="text-muted-foreground">أدخل بيانات الموظف الجديد</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              البيانات الشخصية
            </CardTitle>
            <CardDescription>المعلومات الأساسية للموظف</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>الاسم الأول *</Label>
              <Input 
                placeholder="أدخل الاسم الأول"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>الاسم الأخير *</Label>
              <Input 
                placeholder="أدخل الاسم الأخير"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>البريد الإلكتروني *</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="email"
                  placeholder="email@example.com"
                  className="pr-10"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>رقم الهاتف *</Label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="+966..."
                  className="pr-10"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              البيانات الوظيفية
            </CardTitle>
            <CardDescription>معلومات العمل والوظيفة</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>المنصب *</Label>
              <Input 
                placeholder="المسمى الوظيفي"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>القسم *</Label>
              <Select value={formData.departmentId} onValueChange={(v) => setFormData({...formData, departmentId: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  {mockDepartments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>الشركة *</Label>
              <Select value={formData.companyId} onValueChange={(v) => setFormData({...formData, companyId: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الشركة" />
                </SelectTrigger>
                <SelectContent>
                  {mockCompanies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>الدور *</Label>
              <Select value={formData.role} onValueChange={(v) => setFormData({...formData, role: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الدور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">موظف</SelectItem>
                  <SelectItem value="manager">مدير</SelectItem>
                  <SelectItem value="company_admin">مدير الشركة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>بداية الدوام</Label>
              <Input 
                type="time"
                value={formData.workStart}
                onChange={(e) => setFormData({...formData, workStart: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>نهاية الدوام</Label>
              <Input 
                type="time"
                value={formData.workEnd}
                onChange={(e) => setFormData({...formData, workEnd: e.target.value})}
              />
            </div>
            <div className="col-span-full flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <p className="font-medium">السماح بالعمل عن بُعد</p>
                <p className="text-sm text-muted-foreground">يمكن للموظف تسجيل الحضور من خارج الشركة</p>
              </div>
              <Switch 
                checked={formData.allowRemoteWork}
                onCheckedChange={(v) => setFormData({...formData, allowRemoteWork: v})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            إلغاء
          </Button>
          <Button type="submit">
            إضافة الموظف
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeePage;
