import { Home, Calendar, MapPin, Users, MoreHorizontal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
  { icon: MapPin, label: "Venue", path: "/venue" },
  { icon: Users, label: "Teams", path: "/teams" },
  { icon: MoreHorizontal, label: "More", path: "/more" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass safe-area-bottom pb-2">
      <div className="flex items-center justify-around py-3 px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center gap-1 p-2 rounded-xl transition-colors duration-300 w-16",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-3 w-8 h-1 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={cn("h-6 w-6 z-10", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn("text-[10px] font-medium z-10", isActive ? "font-semibold" : "")}>{item.label}</span>
              
              {isActive && (
                <div className="absolute inset-0 bg-primary/5 rounded-xl -z-10" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
