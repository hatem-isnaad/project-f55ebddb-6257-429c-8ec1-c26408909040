import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Cog, 
  MapPin,
  Clock,
  Globe,
  Shield,
  Save
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const AdminTrackingSettingsPage = () => {
  const [settings, setSettings] = useState({
    enableGPS: true,
    enableGeofencing: true,
    geofenceRadius: 100,
    requireLocationForCheckIn: true,
    enableRemoteWork: false,
    maxLateMinutes: 15,
    autoCheckOut: true,
    autoCheckOutTime: "18:00",
    enableOvertime: true,
    maxOvertimeHours: 4,
  });

  const handleSave = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات التتبع بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إعدادات التتبع</h1>
          <p className="text-muted-foreground">تكوين إعدادات تتبع الحضور والموقع</p>
        </div>
        <Button className="bg-admin hover:bg-admin-hover" onClick={handleSave}>
          <Save className="w-4 h-4 ml-2" />
          حفظ التغييرات
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* GPS Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-admin" />
                إعدادات الموقع
              </CardTitle>
              <CardDescription>تكوين تتبع GPS والسياج الجغرافي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تفعيل تتبع GPS</Label>
                  <p className="text-xs text-muted-foreground">تتبع موقع الموظفين عند تسجيل الحضور</p>
                </div>
                <Switch
                  checked={settings.enableGPS}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableGPS: checked })}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تفعيل السياج الجغرافي</Label>
                  <p className="text-xs text-muted-foreground">تحديد نطاق جغرافي مسموح للحضور</p>
                </div>
                <Switch
                  checked={settings.enableGeofencing}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableGeofencing: checked })}
                />
              </div>
              
              {settings.enableGeofencing && (
                <div className="space-y-2">
                  <Label>نطاق السياج (متر)</Label>
                  <Input
                    type="number"
                    value={settings.geofenceRadius}
                    onChange={(e) => setSettings({ ...settings, geofenceRadius: parseInt(e.target.value) })}
                    className="en-num"
                  />
                </div>
              )}
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>إلزام الموقع لتسجيل الحضور</Label>
                  <p className="text-xs text-muted-foreground">يجب تفعيل الموقع لتسجيل الحضور</p>
                </div>
                <Switch
                  checked={settings.requireLocationForCheckIn}
                  onCheckedChange={(checked) => setSettings({ ...settings, requireLocationForCheckIn: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Time Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-admin" />
                إعدادات الوقت
              </CardTitle>
              <CardDescription>تكوين أوقات الحضور والانصراف</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>الحد الأقصى للتأخير (دقيقة)</Label>
                <Input
                  type="number"
                  value={settings.maxLateMinutes}
                  onChange={(e) => setSettings({ ...settings, maxLateMinutes: parseInt(e.target.value) })}
                  className="en-num"
                />
                <p className="text-xs text-muted-foreground">الدقائق المسموحة قبل اعتبار الموظف متأخراً</p>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تسجيل انصراف تلقائي</Label>
                  <p className="text-xs text-muted-foreground">تسجيل الانصراف تلقائياً في وقت محدد</p>
                </div>
                <Switch
                  checked={settings.autoCheckOut}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoCheckOut: checked })}
                />
              </div>
              
              {settings.autoCheckOut && (
                <div className="space-y-2">
                  <Label>وقت الانصراف التلقائي</Label>
                  <Input
                    type="time"
                    value={settings.autoCheckOutTime}
                    onChange={(e) => setSettings({ ...settings, autoCheckOutTime: e.target.value })}
                    className="en-num"
                  />
                </div>
              )}
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>السماح بالعمل الإضافي</Label>
                  <p className="text-xs text-muted-foreground">السماح بتسجيل ساعات عمل إضافية</p>
                </div>
                <Switch
                  checked={settings.enableOvertime}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableOvertime: checked })}
                />
              </div>
              
              {settings.enableOvertime && (
                <div className="space-y-2">
                  <Label>الحد الأقصى للعمل الإضافي (ساعة)</Label>
                  <Input
                    type="number"
                    value={settings.maxOvertimeHours}
                    onChange={(e) => setSettings({ ...settings, maxOvertimeHours: parseInt(e.target.value) })}
                    className="en-num"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Remote Work Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-admin" />
                العمل عن بُعد
              </CardTitle>
              <CardDescription>إعدادات العمل من المنزل</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>السماح بالعمل عن بُعد</Label>
                  <p className="text-xs text-muted-foreground">السماح للموظفين بتسجيل الحضور من أي مكان</p>
                </div>
                <Switch
                  checked={settings.enableRemoteWork}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableRemoteWork: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-admin" />
                الأمان
              </CardTitle>
              <CardDescription>إعدادات الأمان والتحقق</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>التحقق بالوجه</Label>
                  <p className="text-xs text-muted-foreground">استخدام التعرف على الوجه للحضور</p>
                </div>
                <Switch />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>التحقق بالبصمة</Label>
                  <p className="text-xs text-muted-foreground">استخدام بصمة الإصبع للحضور</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminTrackingSettingsPage;