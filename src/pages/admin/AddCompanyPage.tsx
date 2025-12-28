import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Building2, MapPin, Clock, Globe, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { mockCompanies } from "@/data/mockData";

const AddCompanyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    currency: "SAR",
    language: "ar",
    parentCompanyId: "",
    workStart: "08:00",
    workEnd: "17:00",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إضافة الشركة",
      description: `تم إضافة ${formData.name} بنجاح`,
    });
    navigate("/admin/companies");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowRight className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">إضافة شركة جديدة</h1>
          <p className="text-muted-foreground">أدخل بيانات الشركة الجديدة</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              البيانات الأساسية
            </CardTitle>
            <CardDescription>المعلومات الأساسية للشركة</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>اسم الشركة *</Label>
              <Input 
                placeholder="أدخل اسم الشركة"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>العنوان *</Label>
              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="أدخل عنوان الشركة"
                  className="pr-10"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>العملة</Label>
              <Select value={formData.currency} onValueChange={(v) => setFormData({...formData, currency: v})}>
                <SelectTrigger>
                  <DollarSign className="w-4 h-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                  <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                  <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>اللغة</Label>
              <Select value={formData.language} onValueChange={(v) => setFormData({...formData, language: v})}>
                <SelectTrigger>
                  <Globe className="w-4 h-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-full">
              <Label>شركة رئيسية (اختياري)</Label>
              <Select value={formData.parentCompanyId} onValueChange={(v) => setFormData({...formData, parentCompanyId: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الشركة الرئيسية إن وجدت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">لا يوجد (شركة رئيسية)</SelectItem>
                  {mockCompanies.filter(c => !c.parentCompanyId).map((company) => (
                    <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              ساعات العمل
            </CardTitle>
            <CardDescription>تحديد أوقات الدوام الرسمية</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            إلغاء
          </Button>
          <Button type="submit">
            إضافة الشركة
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCompanyPage;
