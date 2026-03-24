import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import MatchCard from "@/components/matches/MatchCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/context/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import FixturesView from "@/components/schedule/FixturesView";
import MatchTimeView from "@/components/schedule/MatchTimeView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2, Save, X, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Extracted matches from user provided images
import { MATCHES as upcomingMatches } from "@/data/scheduleData";
import { TEAM_POOLS } from "@/data/teamsData";

const Schedule = () => {
  // Data State
  const [scheduleMatches, setScheduleMatches] = useState<any[]>(() => {
    const saved = localStorage.getItem('schedule_matches_v2');
    return saved ? JSON.parse(saved) : upcomingMatches;
  });

  // Edit State
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  // Check admin status
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Persistence
  useEffect(() => {
    localStorage.setItem('schedule_matches_v2', JSON.stringify(scheduleMatches));
  }, [scheduleMatches]);

  // CRUD Actions
  const handleAddNew = () => {
    const newId = scheduleMatches.length + 1;
    const newMatch = {
      id: newId,
      team1: "Team 1",
      team2: "Team 2",
      date: "Date",
      venue: "Venue"
    };
    setScheduleMatches([...scheduleMatches, newMatch]);
    setEditingId(newId);
    setEditForm(newMatch);
  };

  const handleDelete = (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this match?")) {
      setScheduleMatches(scheduleMatches.filter((m: any) => m.id !== id));
    }
  };

  const handleStartEdit = (match: any) => {
    setEditingId(match.id);
    setEditForm(match);
  };

  const handleSaveEdit = () => {
    setScheduleMatches(scheduleMatches.map((m: any) => m.id === editingId ? editForm : m));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <AppLayout>
      <div className="p-4 space-y-4 pb-20">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">Match Schedule</h1>
          <div className="flex gap-2 items-center">
            {isAdmin && (
              <Button onClick={handleAddNew} className="gap-2">
                <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Add Match</span>
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="match-time" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6 h-auto p-1 bg-secondary/5 border border-border/40 backdrop-blur-sm rounded-xl">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 rounded-lg font-semibold transition-all">Upcoming</TabsTrigger>
            <TabsTrigger value="match-time" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 rounded-lg font-semibold transition-all">Match Time</TabsTrigger>
            <TabsTrigger value="pools" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 rounded-lg font-semibold transition-all">Pools</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {scheduleMatches.map((match) => (
              <div key={match.id} className="relative overflow-hidden rounded-xl glass-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />

                {/* Admin Actions */}
                {isAdmin && editingId !== match.id && (
                  <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-secondary/20" onClick={() => handleStartEdit(match)}>
                      <Edit2 className="h-4 w-4 text-primary" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-destructive/20" onClick={() => handleDelete(match.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                )}

                <div className="p-4 flex flex-col gap-4">
                  {editingId === match.id ? (
                    <div className="space-y-3 animate-in fade-in">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={editForm.id}
                          onChange={(e) => setEditForm({ ...editForm, id: e.target.value })}
                          placeholder="Match ID"
                        />
                        <Input
                          value={editForm.date}
                          onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                          placeholder="Date"
                        />
                      </div>
                      <Input
                        value={editForm.venue}
                        onChange={(e) => setEditForm({ ...editForm, venue: e.target.value })}
                        placeholder="Venue"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={editForm.team1}
                          onChange={(e) => setEditForm({ ...editForm, team1: e.target.value })}
                          placeholder="Team 1"
                        />
                        <Input
                          value={editForm.team2}
                          onChange={(e) => setEditForm({ ...editForm, team2: e.target.value })}
                          placeholder="Team 2"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Match Winner</label>
                        <select
                          value={editForm.winner || ""}
                          onChange={(e) => setEditForm({ ...editForm, winner: e.target.value })}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select Winner (Matches Pending)</option>
                          <option value={editForm.team1}>{editForm.team1}</option>
                          <option value={editForm.team2}>{editForm.team2}</option>
                          <option value="Draw">Draw / No Result</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button size="sm" variant="outline" onClick={handleCancelEdit}><X className="h-4 w-4 mr-1" /> Cancel</Button>
                        <Button size="sm" onClick={handleSaveEdit}><Save className="h-4 w-4 mr-1" /> Save</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center text-xs text-muted-foreground pr-16">
                        <span className="font-bold text-primary">MATCH {match.id}</span>
                        <div className="flex items-center gap-2">
                          <span>{match.date}</span>
                          <span>•</span>
                          <span>{match.venue}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-lg shadow-inner">🏏</div>
                            <span className="font-bold text-foreground">
                              {match.team1}
                              {TEAM_POOLS[match.team1] && <span className="text-muted-foreground font-normal text-xs ml-1">({TEAM_POOLS[match.team1]})</span>}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-muted-foreground">-</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-lg shadow-inner">🏏</div>
                            <span className="font-bold text-foreground">
                              {match.team2}
                              {TEAM_POOLS[match.team2] && <span className="text-muted-foreground font-normal text-xs ml-1">({TEAM_POOLS[match.team2]})</span>}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-muted-foreground">-</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="match-time" className="space-y-3">
            <MatchTimeView scheduleMatches={scheduleMatches} />
          </TabsContent>

          <TabsContent value="pools">
            <FixturesView />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout >
  );
};

export default Schedule;
