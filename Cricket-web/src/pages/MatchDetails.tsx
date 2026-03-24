import { useParams, useNavigate } from "react-router-dom";
import { MATCHES, SESSIONS } from "@/data/scheduleData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

const MatchDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const match = MATCHES.find(m => m.id.toString() === id);

    if (!match) {
        return (
            <AppLayout>
                <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                    <h1 className="text-2xl font-bold">Match Not Found</h1>
                    <Button onClick={() => navigate("/schedule")}>Back to Schedule</Button>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="container max-w-2xl mx-auto p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-primary" onClick={() => navigate("/schedule")}>
                    <ArrowLeft className="h-4 w-4" /> Back to Schedule
                </Button>

                <div className="flex flex-col gap-4 w-full p-6 rounded-xl bg-card border border-border/50 shadow-md">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                            Match #{match.id}
                        </span>
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-primary font-bold text-lg text-right leading-none">
                                Ground : {match.venue}
                            </span>
                            <span className="text-sm text-muted-foreground font-medium text-right">
                                {match.date} • {SESSIONS.find(s => s.id === match.session)?.time}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 mt-4 pt-4 border-t border-border/50">
                        <span className="font-bold text-foreground text-xl sm:text-2xl">
                            {match.team1}
                        </span>
                        <span className="text-xs text-yellow-500 font-bold uppercase tracking-wide pl-1">
                            vs
                        </span>
                        <span className="font-bold text-foreground text-xl sm:text-2xl">
                            {match.team2}
                        </span>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default MatchDetails;
