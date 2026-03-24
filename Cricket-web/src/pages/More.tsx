import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Info, 
  BookOpen, 
  Camera, 
  MessageSquare,
  MoreHorizontal,
  ChevronRight
} from "lucide-react";

const menuItems = [
  {
    icon: Info,
    label: "About Tournament",
    description: "Tournament details and officials",
    path: "/about",
    color: "bg-primary",
  },
  {
    icon: BookOpen,
    label: "Rules & Guidelines",
    description: "Tournament rules and fair play",
    path: "/rules",
    color: "bg-secondary",
  },
  {
    icon: Camera,
    label: "Photo Gallery",
    description: "Photos from the tournament",
    path: "/gallery",
    color: "bg-primary",
  },
  {
    icon: MessageSquare,
    label: "Feedback & Support",
    description: "Share your feedback",
    path: "/feedback",
    color: "bg-secondary",
  },
];

const More = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <MoreHorizontal className="h-6 w-6 text-primary" />
          More Options
        </h1>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Card className="glass-card p-4 hover:shadow-lg hover:shadow-primary/5 transition-all group border-border/60">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="glass-card p-6 bg-secondary/5 mt-8 border-none">
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold text-secondary">
              South Zone Women's Cricket Tournament
            </p>
            <p className="text-xs text-muted-foreground">
              © 2026 K.S. Rangasamy College of Technology
            </p>
            <div className="inline-block px-3 py-1 rounded-full bg-background/50 border border-border/50 text-[10px] text-muted-foreground mt-2">
              Version 1.0.0
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default More;
