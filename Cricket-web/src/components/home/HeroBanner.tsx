import heroBanner from "@/assets/hero-banner-wc.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="relative h-[65vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image with Parallax-like scale effect on load */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroBanner}
          alt="South Zone Women's Cricket Tournament"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 pb-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          {/* Organized By - Sleek Top Label */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start md:items-center gap-2 md:gap-3 border-l-4 border-accent pl-3 md:pl-4 py-1 backdrop-blur-sm bg-black/20 rounded-r-lg max-w-fit"
          >
             <div className="flex flex-col md:flex-row md:gap-2 text-[10px] md:text-base tracking-widest uppercase font-medium text-white/90">
                <span>Organized by</span>
                <span className="font-bold text-accent drop-shadow-sm">Anna University, Chennai</span>
             </div>
          </motion.div>

          {/* Main Title - Short & Punchy - Optimized for Mobile */}
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white font-serif leading-tight md:leading-[0.9] drop-shadow-2xl py-2 md:py-4">
            South Zone <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
              Women's Cricket
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-2xl text-white/80 font-light tracking-wide max-w-2xl">
            Inter-University Tournament 2026
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
            <div className="flex items-center gap-3 text-white/95 bg-blue-900/40 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl border border-blue-500/30 hover:bg-blue-900/60 transition-colors shadow-lg shadow-black/10 w-fit">
              <CalendarDays className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              <span className="text-xs md:text-base font-medium tracking-wide">Jan 26 - Feb 02, 2026</span>
            </div>
            <a 
              href="https://maps.app.goo.gl/yLzZhXJ23XkQ2CA29" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/95 bg-blue-900/40 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl border border-blue-500/30 hover:bg-blue-900/60 transition-colors shadow-lg shadow-black/10 w-fit cursor-pointer group"
            >
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs md:text-base font-medium tracking-wide group-hover:underline decoration-yellow-400/50 underline-offset-4">KSRCT, Tiruchengode</span>
            </a>
          </div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/90 font-medium text-sm md:text-lg tracking-wider flex items-center gap-3 md:gap-4 py-2"
          >
            <span className="bg-white/10 px-2 py-1 md:px-3 rounded-md border border-white/10">6 States</span>
            <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-yellow-400" />
            <span className="bg-white/10 px-2 py-1 md:px-3 rounded-md border border-white/10">51 Teams</span>
          </motion.div>

          <div className="pt-2 flex flex-col gap-3 md:gap-4 w-full md:w-auto">
             {/* Primary Actions */}
             <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full md:w-auto">
                <Link to="/schedule" className="w-full md:w-auto">
                  <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-[0_0_20px_hsl(var(--primary)/0.5)] border-2 border-primary/50 text-sm md:text-base h-10 md:h-11">
                    View Schedule
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full md:w-auto text-white border-white/30 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 text-sm md:text-base h-10 md:h-11">
                  Watch Live
                </Button>
             </div>

             </div>


        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;
