import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Users, 
  MessageCircle, 
  CalendarDays, 
  Trophy, 
  MapPin, 
  Hotel, 
  Utensils, 
  Bus, 
  Phone, 
  AlertTriangle, 
  BookOpen, 
  Image as ImageIcon, 
  MessageSquare,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

const TournamentQuickLinks = () => {
  const quickLinks = [
    // Match Information - Blue/Cyan Theme
    { label: "Match Schedule", path: "/schedule", icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-100", border: "group-hover:border-blue-500/50" },
    { label: "Results & Points", path: "/results", icon: Trophy, color: "text-blue-600", bg: "bg-blue-100", border: "group-hover:border-blue-500/50" },
    { label: "Venue & Ground", path: "/venue", icon: MapPin, color: "text-cyan-600", bg: "bg-cyan-100", border: "group-hover:border-cyan-500/50" },
    { label: "Teams", path: "/teams", icon: Users, color: "text-indigo-600", bg: "bg-indigo-100", border: "group-hover:border-indigo-500/50" },

    // Logistics - Amber/Orange Theme
    { label: "Accommodation", path: "/accommodation", icon: Hotel, color: "text-amber-600", bg: "bg-amber-100", border: "group-hover:border-amber-500/50" },
    { label: "Food & Dining", path: "/food", icon: Utensils, color: "text-orange-600", bg: "bg-orange-100", border: "group-hover:border-orange-500/50" },
    { label: "Transport", path: "/transport", icon: Bus, color: "text-yellow-600", bg: "bg-yellow-100", border: "group-hover:border-yellow-500/50" },
    
    // Contacts & Emergency - Red/Rose Theme
    { label: "Contacts", path: "/contacts", icon: Phone, color: "text-rose-600", bg: "bg-rose-100", border: "group-hover:border-rose-500/50" },
    { label: "Emergency", path: "/emergency", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100", border: "group-hover:border-red-500/50" },

    // Info & Gallery - Purple/Pink Theme
    { label: "Rules & Guidelines", path: "/rules", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100", border: "group-hover:border-purple-500/50" },
    { label: "Gallery", path: "/gallery", icon: ImageIcon, color: "text-pink-600", bg: "bg-pink-100", border: "group-hover:border-pink-500/50" },
    { label: "Feedback", path: "/feedback", icon: MessageSquare, color: "text-fuchsia-600", bg: "bg-fuchsia-100", border: "group-hover:border-fuchsia-500/50" },
  ];

  const organizerLinks = [
    // Organizers - Slate/Gray Theme
    { label: "Anna University", path: "/anna-university", icon: Building2, color: "text-slate-700", bg: "bg-slate-200", border: "group-hover:border-slate-500/50" },
    { label: "KSRCT", path: "/ksrct", icon: Building2, color: "text-slate-700", bg: "bg-slate-200", border: "group-hover:border-slate-500/50" },
    { label: "Organizing Committee", path: "/committee", icon: Users, color: "text-slate-700", bg: "bg-slate-200", border: "group-hover:border-slate-500/50" },
  ];

  return (
    <section className="py-12 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* WhatsApp Instruction Card - Liquid Glass Style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden p-[1px] bg-gradient-to-br from-green-400/30 via-white/10 to-transparent shadow-xl backdrop-blur-md"
        >
          <div className="bg-white/40 dark:bg-black/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="bg-green-500/10 p-4 rounded-full">
              <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Tournament Updates</h3>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
                A dedicated WhatsApp group has been created for the tournament to provide further details and updates. 
                All participants and officials are encouraged to join for real-time information.
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300 min-w-[200px] gap-2 h-12 rounded-xl"
              onClick={() => window.open("https://chat.whatsapp.com/IBRCFLZBvkX0dXyyahYZWG", "_blank")}
            >
              Join WhatsApp Group
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Organizers Section (Centered Row) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {organizerLinks.map((link, index) => (
             <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Link to={link.path} className="block h-full group">
                  <div className={`h-full bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/40 backdrop-blur-md border border-white/30 dark:border-white/20 ${link.border} p-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex flex-row items-center justify-center gap-4 text-left`}>
                    <div className={`p-4 rounded-full group-hover:scale-110 transition-all duration-300 ${link.bg}`}>
                      <link.icon className={`w-8 h-8 ${link.color}`} />
                    </div>
                    <div>
                      <span className={`block font-bold text-lg text-foreground/90 group-hover:${link.color} transition-colors`}>
                        {link.label}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Official Partner</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
          ))}
        </div>

        {/* Quick Links Grid */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold font-serif px-2">Quick Access</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={link.path} className="block h-full group">
                  <div className={`h-full bg-white/40 dark:bg-black/20 hover:bg-white/60 dark:hover:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/10 ${link.border} p-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-3 text-center min-h-[120px]`}>
                    <div className={`p-3 rounded-full group-hover:scale-110 transition-all duration-300 ${link.bg}`}>
                      <link.icon className={`w-6 h-6 ${link.color}`} />
                    </div>
                    <span className={`font-semibold text-sm md:text-base text-foreground/80 group-hover:${link.color} transition-colors`}>
                      {link.label}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentQuickLinks;
