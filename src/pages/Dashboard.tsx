import { Clock, ListTodo, TrendingUp, Users } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { CheckInCard } from "@/components/dashboard/CheckInCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TasksList } from "@/components/dashboard/TasksList";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="مرحباً، أحمد" subtitle="لوحة التحكم الرئيسية" />
      
      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="ساعات العمل اليوم"
            value="6س 45د"
            subtitle="من أصل 8 ساعات"
            icon={Clock}
            color="primary"
            trend={{ value: "12%", positive: true }}
            delay={0}
          />
          <StatsCard
            title="المهام المكتملة"
            value="8"
            subtitle="من أصل 12 مهمة"
            icon={ListTodo}
            color="success"
            trend={{ value: "5%", positive: true }}
            delay={0.1}
          />
          <StatsCard
            title="نسبة الإنتاجية"
            value="87%"
            subtitle="أعلى من المعدل"
            icon={TrendingUp}
            color="accent"
            trend={{ value: "3%", positive: true }}
            delay={0.2}
          />
          <StatsCard
            title="أيام الحضور"
            value="22"
            subtitle="هذا الشهر"
            icon={Users}
            color="info"
            delay={0.3}
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Check In & Activity */}
          <div className="space-y-6">
            <CheckInCard />
            <RecentActivity />
          </div>

          {/* Right Column - Tasks */}
          <div className="lg:col-span-2">
            <TasksList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
