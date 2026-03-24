import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const targetDate = new Date("2026-02-15T09:00:00");
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="px-4 -mt-10 relative z-20"
    >
      <Card className="glass-card p-6 border-white/20">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-primary">Tournament Begins In</p>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {timeUnits.map((unit) => (
            <div key={unit.label} className="text-center group">
              <div className="bg-primary/5 rounded-xl py-3 px-1 group-hover:bg-primary/10 transition-colors border border-primary/10">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-primary tabular-nums tracking-tighter">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider mt-2 block text-muted-foreground">{unit.label}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default CountdownTimer;
