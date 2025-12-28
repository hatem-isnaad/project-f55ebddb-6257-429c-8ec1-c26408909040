import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Plus,
  Calendar,
  Flag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed";
  dueDate: string;
  timeSpent: number; // in seconds
  isTracking: boolean;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "تطوير واجهة المستخدم",
    description: "إنشاء صفحة لوحة التحكم الجديدة",
    priority: "high",
    status: "in_progress",
    dueDate: "2024-12-30",
    timeSpent: 7200,
    isTracking: false,
  },
  {
    id: "2",
    title: "مراجعة الكود",
    description: "مراجعة طلبات السحب المعلقة",
    priority: "medium",
    status: "pending",
    dueDate: "2024-12-29",
    timeSpent: 0,
    isTracking: false,
  },
  {
    id: "3",
    title: "اجتماع الفريق",
    description: "اجتماع أسبوعي لمناقشة التقدم",
    priority: "low",
    status: "completed",
    dueDate: "2024-12-28",
    timeSpent: 3600,
    isTracking: false,
  },
  {
    id: "4",
    title: "تحديث الوثائق",
    description: "تحديث وثائق API",
    priority: "medium",
    status: "pending",
    dueDate: "2024-12-31",
    timeSpent: 0,
    isTracking: false,
  },
];

const priorityConfig = {
  high: { label: "عالية", color: "bg-destructive/10 text-destructive" },
  medium: { label: "متوسطة", color: "bg-warning/10 text-warning" },
  low: { label: "منخفضة", color: "bg-success/10 text-success" },
};

const statusConfig = {
  pending: { label: "قيد الانتظار", color: "bg-muted text-muted-foreground" },
  in_progress: { label: "قيد التنفيذ", color: "bg-info/10 text-info" },
  completed: { label: "مكتملة", color: "bg-success/10 text-success" },
};

export function TasksList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}س ${minutes}د`;
  };

  const toggleTracking = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        if (!task.isTracking) {
          toast({
            title: "بدأ تتبع الوقت",
            description: `المهمة: ${task.title}`,
          });
          setActiveTaskId(taskId);
        } else {
          toast({
            title: "تم إيقاف تتبع الوقت",
            description: `الوقت المستغرق: ${formatTime(task.timeSpent)}`,
          });
          setActiveTaskId(null);
        }
        return { ...task, isTracking: !task.isTracking, status: "in_progress" as const };
      }
      return { ...task, isTracking: false };
    }));
  };

  const completeTask = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        toast({
          title: "تم إكمال المهمة",
          description: task.title,
        });
        return { ...task, status: "completed" as const, isTracking: false };
      }
      return task;
    }));
    if (activeTaskId === taskId) setActiveTaskId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-2xl border border-border shadow-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="text-lg font-bold text-foreground">المهام</h2>
          <p className="text-sm text-muted-foreground">{tasks.filter(t => t.status !== "completed").length} مهمة نشطة</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          مهمة جديدة
        </Button>
      </div>

      {/* Tasks List */}
      <div className="divide-y divide-border">
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "p-4 hover:bg-secondary/30 transition-colors",
                task.isTracking && "bg-primary/5 border-r-4 border-primary"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Status Checkbox */}
                <button
                  onClick={() => task.status !== "completed" && completeTask(task.id)}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors",
                    task.status === "completed" 
                      ? "bg-success border-success" 
                      : "border-border hover:border-primary"
                  )}
                >
                  {task.status === "completed" && (
                    <CheckCircle2 className="w-4 h-4 text-success-foreground" />
                  )}
                </button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={cn(
                      "font-medium text-foreground",
                      task.status === "completed" && "line-through text-muted-foreground"
                    )}>
                      {task.title}
                    </h3>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      priorityConfig[task.priority].color
                    )}>
                      {priorityConfig[task.priority].label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(task.dueDate).toLocaleDateString('ar-SA')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(task.timeSpent)}
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full",
                      statusConfig[task.status].color
                    )}>
                      {statusConfig[task.status].label}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {task.status !== "completed" && (
                    <Button
                      size="icon"
                      variant={task.isTracking ? "default" : "outline"}
                      className={cn(
                        "w-10 h-10 rounded-xl",
                        task.isTracking && "animate-pulse-glow"
                      )}
                      onClick={() => toggleTracking(task.id)}
                    >
                      {task.isTracking ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                  <Button size="icon" variant="ghost" className="w-8 h-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
