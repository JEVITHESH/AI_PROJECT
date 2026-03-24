import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sun, Sunset, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import MatchScheduleTable from "@/components/schedule/MatchScheduleTable";

import { MATCHES as FALLBACK_MATCHES, SESSIONS } from "@/data/scheduleData";
import { TEAM_POOLS } from "@/data/teamsData";

const MatchTimeView = ({ scheduleMatches }: { scheduleMatches?: any[] }) => {
    // Load matches from localStorage or fallback if prop is not provided
    const [localMatches, setLocalMatches] = useState<any[]>(() => {
        const saved = localStorage.getItem('schedule_matches_v2');
        return saved ? JSON.parse(saved) : FALLBACK_MATCHES;
    });

    const allMatches = scheduleMatches || localMatches;

    // Recursive function to resolve team name if it's a "Winner of Match X"
    const resolveTeamName = (teamName: string): string => {
        const winnerMatch = teamName.match(/Winner of Match (\d+)/i);
        if (winnerMatch) {
            const matchId = winnerMatch[1];
            // Find the match. ID can be number or string like "44 (SF 1)"
            const sourceMatch = allMatches.find(m => m.id.toString() === matchId || m.id === parseInt(matchId));

            if (sourceMatch && sourceMatch.winner) {
                // Recursively resolve in case the winner is also a placeholder (though unlikely)
                return resolveTeamName(sourceMatch.winner);
            }
        }
        return teamName;
    };

    // Derive dates from matches
    const dates = Array.from(new Set(allMatches.map(m => m.date)));

    // State
    const [selectedDate, setSelectedDate] = useState(dates[0] || "27 Jan 2026");
    const [selectedSession, setSelectedSession] = useState("Morning");

    // Filter matches
    const matches = allMatches.filter(m => m.date === selectedDate && m.session === selectedSession);

    // Initial scroll handler
    useEffect(() => {
        const handleScrollToMatch = (event: CustomEvent) => {
            const { matchId } = event.detail;
            const targetMatch = allMatches.find(m => m.id.toString() === matchId.toString());

            if (targetMatch) {
                // First switch to correct tab/date
                setSelectedDate(targetMatch.date);
                setSelectedSession(targetMatch.session);

                // Wait for render cycle then scroll
                setTimeout(() => {
                    const element = document.getElementById(`match-card-${matchId}`);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Add highlight effect
                        element.classList.add('ring-2', 'ring-primary', 'scale-[1.02]');
                        setTimeout(() => {
                            element.classList.remove('ring-2', 'ring-primary', 'scale-[1.02]');
                        }, 2000);
                    }
                }, 100);
            }
        };

        window.addEventListener('scrollToMatch', handleScrollToMatch as EventListener);
        return () => window.removeEventListener('scrollToMatch', handleScrollToMatch as EventListener);
    }, [allMatches]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            {/* Match Schedule Matrix */}
            <MatchScheduleTable />

            {/* Date Selector */}
            <div className="space-y-2">
                <h3 className="px-1 text-sm font-medium text-muted-foreground">Select Date</h3>
                <ScrollArea className="w-full whitespace-nowrap rounded-xl border border-border/50 bg-secondary/5 p-1">
                    <div className="flex w-max space-x-2 p-1">
                        {dates.map((date) => (
                            <button
                                key={date}
                                onClick={() => setSelectedDate(date)}
                                className={cn(
                                    "flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                                    selectedDate === date
                                        ? "bg-primary text-primary-foreground shadow-md scale-105"
                                        : "bg-background hover:bg-secondary/20 text-muted-foreground hover:text-foreground border border-transparent hover:border-border/50"
                                )}
                            >
                                {date}
                            </button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
            </div>

            {/* Session Tabs */}
            <div className="grid grid-cols-2 gap-3 p-1 bg-secondary/10 rounded-xl">
                {SESSIONS.map((session) => (
                    <button
                        key={session.id}
                        onClick={() => setSelectedSession(session.id)}
                        className={cn(
                            "flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300",
                            selectedSession === session.id
                                ? "bg-white dark:bg-zinc-800 text-primary shadow-sm ring-1 ring-border/50"
                                : "text-muted-foreground hover:bg-white/50 dark:hover:bg-zinc-800/50"
                        )}
                    >
                        <session.icon className={cn("h-4 w-4", selectedSession === session.id ? "text-primary" : "text-muted-foreground")} />
                        {session.label}
                    </button>
                ))}
            </div>

            {/* Match Schedule Display */}
            <div className="space-y-4">
                <h3 className="px-1 text-sm font-medium text-muted-foreground flex justify-between items-center">
                    <span>Scheduled Matches</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{matches.length} Matches</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {matches.map((match) => (
                        <div
                            key={match.id}
                            id={`match-card-${match.id}`}
                            className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
                        >
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                        Match #{match.id}
                                    </span>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-primary font-bold text-base text-right leading-none">
                                            Ground : {match.venue}
                                        </span>
                                        <span className="text-xs text-muted-foreground font-medium text-right">
                                            {match.date} • {SESSIONS.find(s => s.id === match.session)?.time}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start gap-1 mt-2">
                                    <span className="font-bold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">
                                        {resolveTeamName(match.team1)} {TEAM_POOLS[resolveTeamName(match.team1)] && <span className="text-muted-foreground font-normal text-xs">({TEAM_POOLS[resolveTeamName(match.team1)]})</span>}
                                    </span>
                                    <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-wide pl-1">
                                        vs
                                    </span>
                                    <span className="font-bold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">
                                        {resolveTeamName(match.team2)} {TEAM_POOLS[resolveTeamName(match.team2)] && <span className="text-muted-foreground font-normal text-xs">({TEAM_POOLS[resolveTeamName(match.team2)]})</span>}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {matches.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground">
                        <p>No matches scheduled for this session.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchTimeView;
