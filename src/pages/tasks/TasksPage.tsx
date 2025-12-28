import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { 
  ListTodo, 
  Columns3, 
  Plus, 
  Search, 
  Calendar,
  Clock,
  MoreVertical,
  Play,
  Pause,
  CheckCircle2,
  Circle,
  GripVertical,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockTasks, mockEmployees } from "@/data/mockData";
import { Task, TaskStatus, TaskPriority } from "@/types";
import { DatePicker } from "@/components/ui/date-picker";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { cn } from "@/lib/utils";

const getStatusIcon = (status: TaskStatus) => {
  switch (status) {
    case 'completed': return <CheckCircle2 className="w-4 h-4 text-success" />;
    case 'in_progress': return <Clock className="w-4 h-4 text-warning" />;
    default: return <Circle className="w-4 h-4 text-muted-foreground" />;
  }
};

const getStatusLabel = (status: TaskStatus) => {
  switch (status) {
    case 'completed': return 'مكتملة';
    case 'in_progress': return 'قيد التنفيذ';
    default: return 'معلقة';
  }
};

const getPriorityBadge = (priority: TaskPriority) => {
  switch (priority) {
    case 'high': return <Badge variant="destructive" className="text-xs">عالية</Badge>;
    case 'medium': return <Badge className="bg-warning text-warning-foreground text-xs">متوسطة</Badge>;
    default: return <Badge variant="secondary" className="text-xs">منخفضة</Badge>;
  }
};

const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

interface SortableTaskCardProps {
  task: Task;
  onMenuAction: (action: string, task: Task) => void;
}

function SortableTaskCard({ task, onMenuAction }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-4 bg-card border border-border rounded-lg transition-all duration-200",
        isDragging ? "opacity-50 shadow-lg scale-105" : "hover:shadow-soft"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-secondary rounded"
          >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
          </button>
          {getStatusIcon(task.status)}
          <h3 className="font-medium text-foreground text-sm">{task.title}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onMenuAction('start', task)}>
              <Play className="w-4 h-4 ml-2" />
              بدء العمل
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onMenuAction('pause', task)}>
              <Pause className="w-4 h-4 ml-2" />
              إيقاف مؤقت
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onMenuAction('complete', task)}>
              <CheckCircle2 className="w-4 h-4 ml-2" />
              إكمال
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {getPriorityBadge(task.priority)}
        {task.timeSpent > 0 && (
          <Badge variant="outline" className="gap-1 text-xs en-num">
            <Clock className="w-3 h-3" />
            {formatTime(task.timeSpent)}
          </Badge>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {task.assigneeName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{task.assigneeName}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground en-num">
          <Calendar className="w-3 h-3" />
          {task.dueDate}
        </div>
      </div>
    </div>
  );
}

function TaskCardOverlay({ task }: { task: Task }) {
  return (
    <div className="p-4 bg-card border-2 border-primary rounded-lg shadow-lg opacity-90">
      <div className="flex items-center gap-2 mb-2">
        {getStatusIcon(task.status)}
        <h3 className="font-medium text-foreground text-sm">{task.title}</h3>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
    </div>
  );
}

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
  onMenuAction: (action: string, task: Task) => void;
}

function KanbanColumn({ title, tasks, status, onMenuAction }: KanbanColumnProps) {
  const bgColor = status === 'pending' 
    ? 'bg-kanban-pending border-kanban-pending-border' 
    : status === 'in_progress' 
    ? 'bg-kanban-progress border-kanban-progress-border' 
    : 'bg-kanban-completed border-kanban-completed-border';

  return (
    <div className={cn("flex-1 min-w-[320px] rounded-xl p-4 border-2", bgColor)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {getStatusIcon(status)}
          <h3 className="font-semibold text-foreground">{title}</h3>
          <Badge variant="secondary" className="text-xs en-num">{tasks.length}</Badge>
        </div>
      </div>
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 min-h-[200px]">
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} onMenuAction={onMenuAction} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [pendingDrag, setPendingDrag] = useState<{ taskId: string; newStatus: TaskStatus } | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // Form state
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("");
  const [newTaskStartDate, setNewTaskStartDate] = useState<Date>();
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date>();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.includes(searchQuery) || task.description.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const tasksByStatus = {
    pending: filteredTasks.filter(t => t.status === 'pending'),
    in_progress: filteredTasks.filter(t => t.status === 'in_progress'),
    completed: filteredTasks.filter(t => t.status === 'completed'),
  };

  const stats = [
    { label: "إجمالي المهام", value: tasks.length, color: "primary" },
    { label: "قيد التنفيذ", value: tasksByStatus.in_progress.length, color: "warning" },
    { label: "مكتملة", value: tasksByStatus.completed.length, color: "success" },
    { label: "معلقة", value: tasksByStatus.pending.length, color: "muted" },
  ];

  const employeeOptions = mockEmployees.map(emp => ({
    value: emp.id,
    label: `${emp.firstName} ${emp.lastName}`
  }));

  const priorityOptions = [
    { value: 'high', label: 'عالية' },
    { value: 'medium', label: 'متوسطة' },
    { value: 'low', label: 'منخفضة' },
  ];

  const statusOptions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'pending', label: 'معلقة' },
    { value: 'in_progress', label: 'قيد التنفيذ' },
    { value: 'completed', label: 'مكتملة' },
  ];

  const priorityFilterOptions = [
    { value: 'all', label: 'جميع الأولويات' },
    { value: 'high', label: 'عالية' },
    { value: 'medium', label: 'متوسطة' },
    { value: 'low', label: 'منخفضة' },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Optional: Add visual feedback during drag
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Determine new status based on where it was dropped
    let newStatus: TaskStatus | null = null;
    
    // Check if dropped on a task in a different column
    const overTask = tasks.find(t => t.id === over.id);
    if (overTask && overTask.status !== task.status) {
      newStatus = overTask.status;
    }

    // Check if dropped directly in a column
    const overElement = document.elementFromPoint(event.activatorEvent instanceof MouseEvent ? event.activatorEvent.clientX : 0, event.activatorEvent instanceof MouseEvent ? event.activatorEvent.clientY : 0);
    const columnElement = overElement?.closest('[data-status]');
    if (columnElement) {
      const columnStatus = columnElement.getAttribute('data-status') as TaskStatus;
      if (columnStatus && columnStatus !== task.status) {
        newStatus = columnStatus;
      }
    }

    // If status would change, show confirmation dialog
    if (newStatus && newStatus !== task.status) {
      setPendingDrag({ taskId, newStatus });
      setIsConfirmDialogOpen(true);
    }
  };

  const confirmStatusChange = () => {
    if (pendingDrag) {
      setTasks(tasks.map(t => 
        t.id === pendingDrag.taskId 
          ? { ...t, status: pendingDrag.newStatus }
          : t
      ));
      setPendingDrag(null);
    }
    setIsConfirmDialogOpen(false);
  };

  const cancelStatusChange = () => {
    setPendingDrag(null);
    setIsConfirmDialogOpen(false);
  };

  const handleMenuAction = (action: string, task: Task) => {
    let newStatus: TaskStatus = task.status;
    if (action === 'start') newStatus = 'in_progress';
    if (action === 'complete') newStatus = 'completed';
    if (action === 'pause') newStatus = 'pending';

    if (newStatus !== task.status) {
      setPendingDrag({ taskId: task.id, newStatus });
      setIsConfirmDialogOpen(true);
    }
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const employee = mockEmployees.find(e => e.id === newTaskAssignee);
    const newTask: Task = {
      id: String(Date.now()),
      title: newTaskTitle,
      description: newTaskDescription,
      status: 'pending',
      priority: (newTaskPriority as TaskPriority) || 'medium',
      assigneeId: newTaskAssignee || '1',
      assigneeName: employee ? `${employee.firstName} ${employee.lastName}` : 'غير محدد',
      companyId: '1',
      startDate: newTaskStartDate ? newTaskStartDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      dueDate: newTaskDueDate ? newTaskDueDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      timeSpent: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTasks([...tasks, newTask]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskAssignee("");
    setNewTaskPriority("");
    setNewTaskStartDate(undefined);
    setNewTaskDueDate(undefined);
  };

  const pendingTask = pendingDrag ? tasks.find(t => t.id === pendingDrag.taskId) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة المهام</h1>
          <p className="text-muted-foreground">عرض وإدارة مهام الفريق</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 ml-2" />
              مهمة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>إضافة مهمة جديدة</DialogTitle>
              <DialogDescription>
                أدخل تفاصيل المهمة الجديدة
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>عنوان المهمة</Label>
                <Input 
                  placeholder="أدخل عنوان المهمة" 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>الوصف</Label>
                <Textarea 
                  placeholder="أدخل وصف المهمة" 
                  rows={3}
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>تعيين إلى</Label>
                  <SearchableSelect
                    options={employeeOptions}
                    value={newTaskAssignee}
                    onValueChange={setNewTaskAssignee}
                    placeholder="اختر الموظف"
                    searchPlaceholder="ابحث عن موظف..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>الأولوية</Label>
                  <SearchableSelect
                    options={priorityOptions}
                    value={newTaskPriority}
                    onValueChange={setNewTaskPriority}
                    placeholder="اختر الأولوية"
                  />
                </div>
                <div className="space-y-2">
                  <Label>تاريخ البداية</Label>
                  <DatePicker
                    date={newTaskStartDate}
                    onDateChange={setNewTaskStartDate}
                    placeholder="اختر تاريخ البداية"
                  />
                </div>
                <div className="space-y-2">
                  <Label>تاريخ الانتهاء</Label>
                  <DatePicker
                    date={newTaskDueDate}
                    onDateChange={setNewTaskDueDate}
                    placeholder="اختر تاريخ الانتهاء"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>إلغاء</Button>
              <Button onClick={handleAddTask}>إنشاء</Button>
            </DialogFooter>
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
            <Card className="hover:shadow-soft transition-shadow">
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
                placeholder="البحث في المهام..." 
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
            <div className="w-full md:w-48">
              <SearchableSelect
                options={priorityFilterOptions}
                value={filterPriority}
                onValueChange={setFilterPriority}
                placeholder="الأولوية"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks View */}
      <Tabs defaultValue="kanban" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="kanban" className="gap-2">
            <Columns3 className="w-4 h-4" />
            Kanban
          </TabsTrigger>
          <TabsTrigger value="list" className="gap-2">
            <ListTodo className="w-4 h-4" />
            قائمة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kanban">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-6 overflow-x-auto pb-4">
              <div data-status="pending">
                <KanbanColumn 
                  title="معلقة" 
                  tasks={tasksByStatus.pending} 
                  status="pending"
                  onMenuAction={handleMenuAction}
                />
              </div>
              <div data-status="in_progress">
                <KanbanColumn 
                  title="قيد التنفيذ" 
                  tasks={tasksByStatus.in_progress} 
                  status="in_progress"
                  onMenuAction={handleMenuAction}
                />
              </div>
              <div data-status="completed">
                <KanbanColumn 
                  title="مكتملة" 
                  tasks={tasksByStatus.completed} 
                  status="completed"
                  onMenuAction={handleMenuAction}
                />
              </div>
            </div>
            <DragOverlay>
              {activeTask ? <TaskCardOverlay task={activeTask} /> : null}
            </DragOverlay>
          </DndContext>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{task.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {getPriorityBadge(task.priority)}
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {task.assigneeName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground hidden md:inline">{task.assigneeName}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground en-num">
                            <Calendar className="w-4 h-4" />
                            {task.dueDate}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>عرض التفاصيل</DropdownMenuItem>
                          <DropdownMenuItem>تعديل</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              تأكيد تغيير الحالة
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingTask && pendingDrag && (
                <>
                  هل أنت متأكد من تغيير حالة المهمة "{pendingTask.title}" من "{getStatusLabel(pendingTask.status)}" إلى "{getStatusLabel(pendingDrag.newStatus)}"؟
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelStatusChange}>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>تأكيد</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TasksPage;