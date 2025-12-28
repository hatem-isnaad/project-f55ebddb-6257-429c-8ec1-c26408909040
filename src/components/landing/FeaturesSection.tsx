import { motion } from "framer-motion";
import { 
  Clock, 
  MapPin, 
  Users, 
  BarChart3, 
  Shield, 
  Smartphone,
  CheckCircle2,
  ListTodo,
  Building2
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "تتبع الوقت الذكي",
    description: "تسجيل دقيق للحضور والانصراف مع حساب تلقائي لساعات العمل والوقت الإضافي",
    color: "primary",
  },
  {
    icon: MapPin,
    title: "تتبع الموقع GPS",
    description: "التحقق من موقع الموظفين عند التسجيل مع إعداد نطاقات جغرافية مخصصة",
    color: "accent",
  },
  {
    icon: ListTodo,
    title: "إدارة المهام",
    description: "إنشاء وتعيين المهام مع تتبع الوقت المستغرق لكل مهمة بدقة عالية",
    color: "success",
  },
  {
    icon: Users,
    title: "إدارة الفريق",
    description: "أدوار وصلاحيات مرنة مع إدارة الأقسام والموظفين بسهولة تامة",
    color: "info",
  },
  {
    icon: BarChart3,
    title: "تقارير شاملة",
    description: "تقارير تفصيلية عن الإنتاجية وساعات العمل قابلة للتصدير بصيغ متعددة",
    color: "warning",
  },
  {
    icon: Building2,
    title: "متعدد الشركات",
    description: "إدارة عدة شركات من لوحة تحكم واحدة مع فصل تام للبيانات",
    color: "primary",
  },
  {
    icon: Shield,
    title: "أمان متقدم",
    description: "تشفير البيانات وسجل تدقيق شامل لجميع العمليات والتغييرات",
    color: "destructive",
  },
  {
    icon: Smartphone,
    title: "متوافق مع الجوال",
    description: "واجهة متجاوبة تعمل بسلاسة على جميع الأجهزة والشاشات",
    color: "accent",
  },
];

const colorClasses = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle2 className="w-4 h-4" />
            <span>مميزات المنصة</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            كل ما تحتاجه لإدارة{" "}
            <span className="text-gradient">وقت فريقك</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            أدوات متكاملة ومصممة بعناية لتبسيط إدارة الوقت وزيادة إنتاجية الموظفين
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl p-6 border border-border/50 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
