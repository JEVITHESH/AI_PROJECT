import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy } from "lucide-react";
import MatchCard from "@/components/matches/MatchCard";

const completedMatches = [
  {
    id: "c1",
    matchNumber: 1,
    team1: "Madras University",
    team2: "Bharathiar University",
    venue: "Main Ground",
    date: "Feb 15",
    time: "9:30 AM",
    status: "completed" as const,
    team1Score: "145/6",
    team2Score: "142/8",
    winner: "Madras University",
    playerOfMatch: "S. Priyanka",
  },
];

const pointsTable = [
  { position: 1, team: "Madras University", played: 1, won: 1, lost: 0, points: 2, nrr: "+0.245" },
  { position: 2, team: "Bharathiar University", played: 1, won: 0, lost: 1, points: 0, nrr: "-0.245" },
  { position: 3, team: "KSRCT (Host)", played: 0, won: 0, lost: 0, points: 0, nrr: "0.000" },
  { position: 4, team: "Annamalai University", played: 0, won: 0, lost: 0, points: 0, nrr: "0.000" },
  { position: 5, team: "Periyar University", played: 0, won: 0, lost: 0, points: 0, nrr: "0.000" },
  { position: 6, team: "Madurai Kamaraj University", played: 0, won: 0, lost: 0, points: 0, nrr: "0.000" },
];

const Results = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          Results & Standings
        </h1>

        <Tabs defaultValue="points" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6 h-auto p-1 bg-secondary/5 border border-border/40 backdrop-blur-sm rounded-xl">
            <TabsTrigger value="points" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 rounded-lg font-semibold transition-all">Points Table</TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 rounded-lg font-semibold transition-all">Match Results</TabsTrigger>
          </TabsList>

          <TabsContent value="points">
            <Card className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary hover:bg-secondary border-none">
                      <TableHead className="text-white font-bold">#</TableHead>
                      <TableHead className="text-white font-bold">Team</TableHead>
                      <TableHead className="text-white font-bold text-center">P</TableHead>
                      <TableHead className="text-white font-bold text-center">W</TableHead>
                      <TableHead className="text-white font-bold text-center">L</TableHead>
                      <TableHead className="text-white font-bold text-center">Pts</TableHead>
                      <TableHead className="text-white font-bold text-right">NRR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pointsTable.map((row, index) => (
                      <TableRow key={row.position} className={`${index % 2 === 0 ? 'bg-background/30' : 'bg-transparent'} hover:bg-primary/5 transition-colors border-border/50`}>
                        <TableCell className="font-medium">{row.position}</TableCell>
                        <TableCell className="font-bold text-foreground">{row.team}</TableCell>
                        <TableCell className="text-center">{row.played}</TableCell>
                        <TableCell className="text-center text-green-600 font-bold">{row.won}</TableCell>
                        <TableCell className="text-center text-destructive">{row.lost}</TableCell>
                        <TableCell className="text-center font-black text-secondary">{row.points}</TableCell>
                        <TableCell className="text-right font-mono">{row.nrr}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-3">
            {completedMatches.length > 0 ? (
              completedMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No results available yet
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};


export default Results;
