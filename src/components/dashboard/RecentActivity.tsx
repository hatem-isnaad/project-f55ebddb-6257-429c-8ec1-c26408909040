import { motion } from "framer-motion";
import { LogIn, LogOut, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "check_in" | "check_out" | "task_completed" | "task_started" | "reminder";
  title: string;
  time: string;
  description?: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "check_in",
    title: "تسجيل الحضور",
    time: "08:30 ص",
    description: "المكتب الرئيسي",
  },
  {
    id: "2",
    type: "task_started",
    title: "بدأ العمل على مهمة",
    time: "09:00 ص",
    description: "تطوير واجهة المستخدم",
  },
  {
    id: "3",
    type: "task_completed",
    title: "أكمل مهمة",
    time: "11:30 ص",
    description: "مراجعة الكود",
  },
  {
    id: "4",
    type: "reminder",
    title: "تذكير",
    time: "02:00 م",
    description: "اجتماع الفريق بعد ساعة",
  },
];

const activityConfig = {
  check_in: {
    icon: LogIn,
    color: "bg-success/10 text-success",
    borderColor: "border-success",
  },
  check_out: {
    icon: LogOut,
    color: "bg-destructive/10 text-destructive",
    borderColor: "border-destructive",
  },
  task_completed: {
    icon: CheckCircle2,
    color: "bg-primary/10 text-primary",
    borderColor: "border-primary",
  },
  task_started: {
    icon: Clock,
    color: "bg-info/10 text-info",
    borderColor: "border-info",
  },
  reminder: {
    icon: AlertCircle,
    color: "bg-warning/10 text-warning",
    borderColor: "border-warning",
  },
};

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-2xl border border-border shadow-card"
    >
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-bold text-foreground">النشاط الأخير</h2>
        <p className="text-sm text-muted-foreground">آخر التحديثات اليوم</p>
      </div>

      <div className="p-4">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-0 bottom-0 right-5 w-px bg-border" />

          {/* Activities */}
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const config = activityConfig[activity.type];
              const Icon = config.icon;

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-4 relative"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center z-10 border-2 bg-card",
                    config.color,
                    config.borderColor
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-foreground text-sm">{activity.title}</p>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</span>
                    </div>
                    {activity.description && (
                      <p className="text-sm text-muted-foreground mt-0.5">{activity.description}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
