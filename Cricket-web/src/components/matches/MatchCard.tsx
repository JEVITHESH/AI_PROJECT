import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";

interface Match {
  id: string;
  matchNumber: number;
  team1: string;
  team2: string;
  venue: string;
  date: string;
  time: string;
  status: "upcoming" | "live" | "completed";
  team1Score?: string;
  team2Score?: string;
  winner?: string;
  playerOfMatch?: string;
}

interface MatchCardProps {
  match: Match;
}

const statusStyles = {
  upcoming: "bg-muted text-foreground",
  live: "bg-destructive text-destructive-foreground animate-pulse",
  completed: "bg-secondary text-secondary-foreground",
};

const MatchCard = ({ match }: MatchCardProps) => {
  return (
    <Card className="glass-card p-4 hover:bg-card/70 transition-colors border-border/60">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-secondary/70 tracking-wide uppercase">
          Match #{match.matchNumber}
        </span>
        <Badge className={`${statusStyles[match.status]} shadow-none border-0 font-bold px-2.5`}>
          {match.status === "live" ? "🔴 LIVE" : match.status.charAt(0).toUpperCase() + match.status.slice(1)}
        </Badge>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 text-center">
          <p className="font-semibold text-foreground text-sm">{match.team1}</p>
          {match.team1Score && (
            <p className="text-lg font-bold text-primary">{match.team1Score}</p>
          )}
        </div>
        <div className="px-4">
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">VS</span>
        </div>
        <div className="flex-1 text-center">
          <p className="font-semibold text-foreground text-sm">{match.team2}</p>
          {match.team2Score && (
            <p className="text-lg font-bold text-primary">{match.team2Score}</p>
          )}
        </div>
      </div>

      {match.winner && (
        <div className="bg-secondary/10 rounded-lg p-2 mb-3 text-center">
          <p className="text-sm text-secondary font-medium">🏆 {match.winner} won</p>
          {match.playerOfMatch && (
            <p className="text-xs text-muted-foreground">Player of the Match: {match.playerOfMatch}</p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{match.date} • {match.time}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>{match.venue}</span>
        </div>
      </div>
    </Card>
  );
};

export default MatchCard;
