import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, MapPin, CheckCircle2, BarChart3, Users, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden pt-20">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-160px)]">
          {/* Content */}
          <div className="text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4" />
              <span>منصة إدارة الوقت الأذكى</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              إدارة الوقت{" "}
              <span className="text-gradient">بذكاء</span>
              <br />
              وبلا حدود
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 lg:mr-0"
            >
              تبسيط الحضور، رفع الإنتاجية، وتوفير رؤى شاملة عبر نظام تتبع وقت متقدم مصمم لكل دور داخل الشركة
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="hero" size="xl">
                ابدأ تجربتك المجانية
              </Button>
              <Button variant="glass" size="xl">
                شاهد العرض التوضيحي
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50"
            >
              <div className="text-center lg:text-right">
                <div className="text-2xl md:text-3xl font-bold text-foreground">+500</div>
                <div className="text-sm text-muted-foreground">شركة نشطة</div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-2xl md:text-3xl font-bold text-foreground">+10K</div>
                <div className="text-sm text-muted-foreground">موظف يومياً</div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-2xl md:text-3xl font-bold text-foreground">99%</div>
                <div className="text-sm text-muted-foreground">رضا العملاء</div>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Dashboard Card */}
            <div className="relative bg-card rounded-2xl shadow-card p-6 border border-border/50">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">لوحة التحكم</div>
                    <div className="text-xs text-muted-foreground">اليوم، 28 ديسمبر</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full text-sm">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span>متصل</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Users className="w-4 h-4" />
                    <span>الحاضرون</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">47</div>
                  <div className="text-xs text-success">+12% من الأمس</div>
                </div>
                <div className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>ساعات العمل</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">386</div>
                  <div className="text-xs text-muted-foreground">ساعة اليوم</div>
                </div>
              </div>

              {/* Employee List */}
              <div className="space-y-3">
                {[
                  { name: "أحمد محمد", role: "مطور برمجيات", status: "حاضر", time: "08:30" },
                  { name: "سارة علي", role: "مصممة UI/UX", status: "حاضر", time: "08:45" },
                  { name: "محمد خالد", role: "مدير المشروع", status: "في مهمة", time: "09:00" },
                ].map((employee, index) => (
                  <motion.div
                    key={employee.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between bg-background rounded-lg p-3 border border-border/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{employee.name}</div>
                        <div className="text-xs text-muted-foreground">{employee.role}</div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        employee.status === "حاضر" 
                          ? "bg-success/10 text-success" 
                          : "bg-info/10 text-info"
                      }`}>
                        {employee.status}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{employee.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 bg-card rounded-xl shadow-card p-4 border border-border/50"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">تم تسجيل الحضور</div>
                  <div className="text-sm font-semibold text-foreground">08:30 ص</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -right-4 bg-card rounded-xl shadow-card p-4 border border-border/50"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">الموقع</div>
                  <div className="text-sm font-semibold text-foreground">المكتب الرئيسي</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
