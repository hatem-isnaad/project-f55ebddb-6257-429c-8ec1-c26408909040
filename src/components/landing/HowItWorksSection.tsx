import { motion } from "framer-motion";
import { UserPlus, Settings, PlayCircle, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "إنشاء الحساب",
    description: "سجل شركتك في دقائق معدودة وأضف بيانات فريقك بسهولة",
  },
  {
    icon: Settings,
    number: "02",
    title: "إعداد السياسات",
    description: "حدد ساعات العمل والنطاق الجغرافي وصلاحيات كل دور",
  },
  {
    icon: PlayCircle,
    number: "03",
    title: "ابدأ التتبع",
    description: "يبدأ الموظفون بتسجيل حضورهم ومهامهم من أي جهاز",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "تابع التقارير",
    description: "احصل على رؤى شاملة عن الإنتاجية واتخذ قرارات مبنية على البيانات",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            كيف يعمل{" "}
            <span className="text-gradient">النظام؟</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            أربع خطوات بسيطة للبدء في إدارة وقت فريقك بفعالية
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 right-0 w-full h-0.5 bg-gradient-to-l from-primary/50 to-transparent translate-x-1/2" />
              )}

              <div className="relative bg-card rounded-2xl p-6 border border-border/50 shadow-card text-center">
                {/* Number Badge */}
                <div className="absolute -top-4 right-1/2 translate-x-1/2 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-soft">
                  {step.number}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mt-4 mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
