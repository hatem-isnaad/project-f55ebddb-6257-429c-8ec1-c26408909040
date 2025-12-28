import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Building2, 
  Clock, 
  MapPin, 
  Bell, 
  Shield, 
  Globe,
  Save,
  User,
  Lock,
  Palette,
  Moon,
  Sun
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    companyName: "شركة التقنية المتقدمة",
    companyEmail: "info@company.com",
    companyPhone: "+966501234567",
    workStartTime: "08:00",
    workEndTime: "17:00",
    allowRemoteCheckIn: true,
    gpsRequired: true,
    gpsRadius: 100,
    language: "ar",
    timezone: "Asia/Riyadh",
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true,
    slackIntegration: false,
  });

  const handleSave = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الإعدادات بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">الإعدادات</h1>
        <p className="text-muted-foreground">إدارة إعدادات النظام والشركة</p>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden md:inline">الشركة</span>
          </TabsTrigger>
          <TabsTrigger value="attendance" className="gap-2">
            <Clock className="w-4 h-4" />
            <span className="hidden md:inline">الحضور</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden md:inline">الإشعارات</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden md:inline">المظهر</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden md:inline">الأمان</span>
          </TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>معلومات الشركة</CardTitle>
              <CardDescription>إدارة البيانات الأساسية للشركة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>اسم الشركة</Label>
                  <Input 
                    value={settings.companyName}
                    onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>البريد الإلكتروني</Label>
                  <Input 
                    type="email"
                    value={settings.companyEmail}
                    onChange={(e) => setSettings({...settings, companyEmail: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>رقم الهاتف</Label>
                  <Input 
                    value={settings.companyPhone}
                    onChange={(e) => setSettings({...settings, companyPhone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>المنطقة الزمنية</Label>
                  <Select value={settings.timezone} onValueChange={(v) => setSettings({...settings, timezone: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Riyadh">الرياض (UTC+3)</SelectItem>
                      <SelectItem value="Asia/Dubai">دبي (UTC+4)</SelectItem>
                      <SelectItem value="Africa/Cairo">القاهرة (UTC+2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>اللغة</Label>
                  <Select value={settings.language} onValueChange={(v) => setSettings({...settings, language: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 ml-2" />
                  حفظ التغييرات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Settings */}
        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الحضور والانصراف</CardTitle>
              <CardDescription>تحديد سياسات تسجيل الحضور والموقع</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>بداية الدوام</Label>
                  <Input 
                    type="time"
                    value={settings.workStartTime}
                    onChange={(e) => setSettings({...settings, workStartTime: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>نهاية الدوام</Label>
                  <Input 
                    type="time"
                    value={settings.workEndTime}
                    onChange={(e) => setSettings({...settings, workEndTime: e.target.value})}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  إعدادات GPS
                </h3>
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="font-medium">تفعيل تتبع الموقع</p>
                    <p className="text-sm text-muted-foreground">يتطلب تسجيل الحضور تحديد الموقع</p>
                  </div>
                  <Switch 
                    checked={settings.gpsRequired}
                    onCheckedChange={(v) => setSettings({...settings, gpsRequired: v})}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="font-medium">السماح بالعمل عن بُعد</p>
                    <p className="text-sm text-muted-foreground">السماح بتسجيل الحضور من خارج نطاق الشركة</p>
                  </div>
                  <Switch 
                    checked={settings.allowRemoteCheckIn}
                    onCheckedChange={(v) => setSettings({...settings, allowRemoteCheckIn: v})}
                  />
                </div>
                {settings.gpsRequired && (
                  <div className="space-y-2">
                    <Label>نطاق الموقع المسموح (بالمتر)</Label>
                    <Input 
                      type="number"
                      value={settings.gpsRadius}
                      onChange={(e) => setSettings({...settings, gpsRadius: parseInt(e.target.value)})}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 ml-2" />
                  حفظ التغييرات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>التحكم في إشعارات النظام</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="font-medium">إشعارات البريد الإلكتروني</p>
                  <p className="text-sm text-muted-foreground">استلام الإشعارات عبر البريد</p>
                </div>
                <Switch 
                  checked={settings.emailNotifications}
                  onCheckedChange={(v) => setSettings({...settings, emailNotifications: v})}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="font-medium">إشعارات المتصفح</p>
                  <p className="text-sm text-muted-foreground">إشعارات فورية في المتصفح</p>
                </div>
                <Switch 
                  checked={settings.pushNotifications}
                  onCheckedChange={(v) => setSettings({...settings, pushNotifications: v})}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="font-medium">تكامل Slack</p>
                  <p className="text-sm text-muted-foreground">إرسال الإشعارات إلى قناة Slack</p>
                </div>
                <Switch 
                  checked={settings.slackIntegration}
                  onCheckedChange={(v) => setSettings({...settings, slackIntegration: v})}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 ml-2" />
                  حفظ التغييرات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات المظهر</CardTitle>
              <CardDescription>تخصيص مظهر التطبيق</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  {settings.darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <div>
                    <p className="font-medium">الوضع الداكن</p>
                    <p className="text-sm text-muted-foreground">تفعيل المظهر الداكن</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.darkMode}
                  onCheckedChange={(v) => setSettings({...settings, darkMode: v})}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 ml-2" />
                  حفظ التغييرات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الأمان</CardTitle>
              <CardDescription>إدارة كلمة المرور والأمان</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  تغيير كلمة المرور
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>كلمة المرور الحالية</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label>كلمة المرور الجديدة</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>تأكيد كلمة المرور</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 ml-2" />
                  تحديث كلمة المرور
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
