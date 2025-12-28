import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, CheckCircle2, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function CheckInCard() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (checkInTime) {
        const diff = new Date().getTime() - checkInTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setElapsedTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [checkInTime]);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setCheckInTime(new Date());
    toast({
      title: "تم تسجيل الحضور بنجاح",
      description: `وقت الحضور: ${new Date().toLocaleTimeString('ar-SA')}`,
    });
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    toast({
      title: "تم تسجيل الانصراف بنجاح",
      description: `إجمالي ساعات العمل: ${elapsedTime}`,
    });
    setCheckInTime(null);
    setElapsedTime("00:00:00");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
    >
      {/* Header */}
      <div className={`p-6 ${isCheckedIn ? 'gradient-primary' : 'bg-secondary'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm ${isCheckedIn ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              {isCheckedIn ? 'أنت حاضر الآن' : 'سجل حضورك'}
            </p>
            <div className={`text-4xl font-bold mt-1 font-mono ${isCheckedIn ? 'text-primary-foreground' : 'text-foreground'}`}>
              {currentTime.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isCheckedIn ? 'bg-primary-foreground/20' : 'bg-primary/10'}`}>
            <Clock className={`w-8 h-8 ${isCheckedIn ? 'text-primary-foreground' : 'text-primary'}`} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Location */}
        <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">المكتب الرئيسي</p>
            <p className="text-xs text-muted-foreground">الموقع ضمن النطاق المسموح</p>
          </div>
          <CheckCircle2 className="w-5 h-5 text-success mr-auto" />
        </div>

        {/* Elapsed Time */}
        <AnimatePresence>
          {isCheckedIn && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-primary/5 rounded-xl border border-primary/20"
            >
              <p className="text-sm text-muted-foreground mb-1">وقت العمل</p>
              <p className="text-3xl font-bold font-mono text-primary">{elapsedTime}</p>
              {checkInTime && (
                <p className="text-xs text-muted-foreground mt-2">
                  وقت الحضور: {checkInTime.toLocaleTimeString('ar-SA')}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <Button
          onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
          variant={isCheckedIn ? "destructive" : "hero"}
          size="lg"
          className="w-full"
        >
          {isCheckedIn ? (
            <>
              <LogOut className="w-5 h-5 ml-2" />
              تسجيل الانصراف
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5 ml-2" />
              تسجيل الحضور
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
