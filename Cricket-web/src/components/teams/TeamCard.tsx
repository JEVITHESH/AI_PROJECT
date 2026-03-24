import { Card } from "@/components/ui/card";
import { Users, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Team {
  id: string;
  name: string;
  shortName: string;
  university: string;
  manager: string;
  coach: string;
  playerCount: number;
}

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <Link to={`/teams/${team.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Card className="glass-card p-0 overflow-hidden hover:border-accent/50 group h-full">
          <div className="p-5 flex items-start gap-4 relaltive">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
               <span className="text-8xl font-black font-serif leading-none text-primary transform rotate-12 translate-x-4 -translate-y-4">
                 {team.shortName}
               </span>
            </div>
            
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all">
              <span className="text-xl font-bold text-primary-foreground font-serif">{team.shortName}</span>
            </div>
            
            <div className="flex-1 z-10">
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{team.name}</h3>
              <p className="text-sm text-muted-foreground font-medium leading-tight mt-1">{team.university}</p>
            </div>

            <div className="self-center">
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
          </div>
          
          <div className="bg-muted/50 px-5 py-3 grid grid-cols-2 gap-4 text-xs font-medium border-t border-border/50">
            <div className="flex items-center gap-2 text-foreground/80">
              <User className="h-3.5 w-3.5 text-accent" />
              <span className="truncate">Mgr: {team.manager}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/80">
              <Users className="h-3.5 w-3.5 text-accent" />
              <span>{team.playerCount} Players</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};

export default TeamCard;
