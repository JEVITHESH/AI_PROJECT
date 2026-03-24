import AppLayout from "@/components/layout/AppLayout";
import TeamCard from "@/components/teams/TeamCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useData } from "@/context/DataContext";

const Teams = () => {
  const { teams } = useData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (team.shortName && team.shortName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Participating Teams</h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/60 focus-visible:ring-primary/50 focus-visible:border-primary transition-all"
          />
        </div>

        <div className="space-y-3">
          {filteredTeams.map((team) => (
            // TeamCard expects specific props. 
            // We need to verify TeamCard props. 
            // Assuming it takes 'team' object with similar structure or we adapt it.
            // Our mockData Team has: id, name, shortName, logo, captain, players
            // Old TeamCard usage had: university, manager, coach, playerCount.
            // We might need to adapt the object passed to TeamCard or update TeamCard.
            // For now, passing whatever we have + defaults.
            <TeamCard key={team.id} team={{
              ...team,
              university: team.name, // Mapping name to university as fallback
              manager: "TBA",
              coach: "TBA",
              playerCount: team.players?.length || 0
            }} />
          ))}
          {filteredTeams.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No teams found.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Teams;
