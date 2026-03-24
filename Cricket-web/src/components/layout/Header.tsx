import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
  { label: "Tourist Attractions", path: "/discover" },
  { label: "Organizing Committee", path: "/committee" },
  { label: "Match Schedule", path: "/schedule" },
  { label: "Results & Points", path: "/results" },
  { label: "Venue & Ground", path: "/venue" },
  { label: "Teams", path: "/teams" },
  { label: "Accommodation", path: "/accommodation" },
  { label: "Food & Dining", path: "/food" },
  { label: "Transport", path: "/transport" },
  { label: "Contacts", path: "/contacts" },
  { label: "Emergency", path: "/emergency" },
  { label: "Rules & Guidelines", path: "/rules" },
  { label: "Gallery", path: "/gallery" },
  { label: "Feedback", path: "/feedback" },
  { label: "Privacy Policy", path: "/privacy-policy" },
];

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-40 glass w-full flex flex-col"
    >
      <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 max-w-7xl mx-auto relative h-14 md:h-20 w-full">
        
        {/* Left Side: Mobile Menu Trigger */}
        <div className="flex items-center z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 text-primary">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-background/95 backdrop-blur-xl p-0 border-r border-border/50">
              <div className="bg-secondary p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Menu className="w-32 h-32 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white font-serif relative z-10 uppercase leading-snug">
                  South Zone <br /> 2026
                </h2>
                <p className="text-sm text-white/80 mt-1 relative z-10">2026</p>
              </div>
              <nav className="p-4 overflow-y-auto max-h-[calc(100vh-140px)]">
                {menuItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium"
                  >
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                ))}
                <Link to="/admin/login" className="block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium mt-4 border-t border-border/50 pt-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: menuItems.length * 0.05 }}
                  >
                    Admin Login
                  </motion.div>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center: Title (Absolute) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full pointer-events-none md:pointer-events-auto flex justify-center px-12">
             <Link to="/" className="text-center group pointer-events-auto w-full">
              <h1 className="text-xs md:text-lg font-bold font-serif text-primary tracking-tight leading-tight md:leading-normal uppercase">
                South Zone Inter-University
                <span className="block text-[10px] md:text-xs font-sans font-normal text-muted-foreground tracking-wider group-hover:text-accent transition-colors">
                  Cricket Women Tournament - 2026
                </span>
              </h1>
            </Link>
        </div>

        {/* Right Side: Logos (Desktop Only) & Bell */}
        <div className="flex items-center gap-1 md:gap-3 z-50">
          <div className="hidden md:flex items-center gap-3 mr-2">
            <img src="/logos/ksrct_logo.png" alt="KSRCT" className="h-10 w-auto object-contain" />
            <img src="/logos/anna.png" alt="Anna Univ" className="h-10 w-auto object-contain" />
            <img src="/logos/ausb.png" alt="AUSB" className="h-10 w-auto object-contain" />
            <img src="/logos/gemini.png" alt="Gemini" className="h-10 w-auto object-contain" />
            <img src="/logos/banner.webp" alt="Banner" className="h-10 w-auto object-contain" />
          </div>
          
          <div className="h-8 w-px bg-border/40 hidden md:block" />

          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_hsl(var(--accent))]" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile-Only Bottom Row for Logos */}
      <div className="md:hidden flex items-center justify-center gap-3 py-1.5 border-t border-border/40 bg-background/20 backdrop-blur-sm">
         <img src="/logos/ksrct_logo.png" alt="KSRCT" className="h-6 w-auto object-contain" />
         <img src="/logos/anna.png" alt="Anna Univ" className="h-6 w-auto object-contain" />
         <img src="/logos/ausb.png" alt="AUSB" className="h-6 w-auto object-contain" />
         <img src="/logos/gemini.png" alt="Gemini" className="h-6 w-auto object-contain" />
         <img src="/logos/banner.webp" alt="Banner" className="h-6 w-auto object-contain" />
      </div>
    </motion.header>
  );
};

export default Header;
