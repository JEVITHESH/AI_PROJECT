import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const PoolTeamList = ({ poolName, teams, startIndex }: { poolName: string, teams: string[], startIndex: number }) => {
    return (
        <Card className="glass-card border-border/50 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/50 bg-primary/5">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold text-primary">POOL - {poolName}</CardTitle>
                    <Badge variant="outline" className="bg-background/50">
                        {teams.length} Teams
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {teams.map((team, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-card/60 border border-border/50 hover:bg-primary/5 transition-colors">
                            <span className="flex items-center justify-center min-w-[1.5rem] h-6 rounded-full bg-secondary/10 text-secondary font-bold text-xs font-mono px-1">
                                {startIndex + index}
                            </span>
                            <span className="font-medium text-sm text-foreground/90">
                                {team}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const FixturesView = () => {
    // POOL A
    const poolATeams = [
        "Bangalore City University", "JNTU Kakinada", "Dr. Ambedkar Srikakulam",
        "TNPESU Chennai", "Hindustan University", "Manipal University", "KL Deemed Guntur",
        "Kuvempu University", "Acharya Nagarjuna Guntur", "Sri Venkateshwara Tirupathi",
        "Rajiv Gandhi Bangalore", "SRM IST Kattankulathur"
    ];

    // POOL B
    const poolBTeams = [
        "MGR University Chennai", "KLE Tech Hubbali", "Rajiv Gandhi Nuzvid", "SDM Dharwad",
        "Mother Therasa University", "Thiruvallur University", "Tamilnadu Ambedkar Law",
        "Saveetha University", "Avinashilingam University", "IIPE Vizagapattinam",
        "Anna University", "University of Mysore"
    ];

    // POOL C
    const poolCTeams = [
        "University of Calicut", "Kakatiya Warangal", "Annamalai University",
        "Madurai Kamaraj", "Karnataka State Akkamahadevi Women",
        "Kannur University", "Jeppiar University", "Mangalore University",
        "Pondicherry University", "Osmania University",
        "Krishnadevaraya University Ananthapur", "Bharathithasan University"
    ];

    // POOL D
    const poolDTeams = [
        "Palamuru University", "MG University Kottayam", "PES University",
        "University of Kerala", "VTU Belagavi", "Bharathiar University",
        "Krishna University", "Alagappa University", "Adikavi Nannaya University",
        "Andhra University", "University of Madras"
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="rules" className="border-border/50">
                    <AccordionTrigger className="hover:no-underline py-2">
                        <div className="flex items-center gap-2 text-primary">
                            <FileText className="h-4 w-4" />
                            <span className="font-semibold">Important Rules</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed p-1">
                            <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                                <p className="font-medium text-primary">
                                    Matches are conducted strictly as per AIU (Association of Indian Universities) cricket rules.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <strong className="text-foreground block border-b border-border/50 pb-1">Match Format & Overs</strong>
                                <ul className="list-disc pl-5 space-y-1 marker:text-primary">
                                    <li>Up to Pre-Quarter Finals: <span className="font-semibold text-foreground">20 overs</span></li>
                                    <li>Quarter Finals: <span className="font-semibold text-foreground">30 overs</span></li>
                                    <li>Semi-Finals and Final: <span className="font-semibold text-foreground">50 overs</span></li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <strong className="text-foreground block border-b border-border/50 pb-1">Equipment & Conditions</strong>
                                <div className="grid gap-2 sm:grid-cols-2">
                                    <div className="bg-secondary/10 p-2 rounded">
                                        <span className="text-xs font-semibold text-muted-foreground uppercase">Pitch</span>
                                        <p>Matting wickets only</p>
                                    </div>
                                    <div className="bg-secondary/10 p-2 rounded">
                                        <span className="text-xs font-semibold text-muted-foreground uppercase">Balls</span>
                                        <p>SF Yarker (Pre-QF) / SG (Semis & Final)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <strong className="text-foreground block border-b border-border/50 pb-1">Match Conduct</strong>
                                <ul className="space-y-2">
                                    <li className="flex gap-2">
                                        <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 flex-none font-bold">!</span>
                                        <span>Teams are required to report <span className="font-bold text-destructive">45 minutes</span> before the scheduled match time.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 flex-none font-bold">!</span>
                                        <span>In case of rain or unforeseen conditions, match overs may be reduced or curtailed at the discretion of the match officials.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <strong className="text-foreground block border-b border-border/50 pb-1">Protests & Disputes</strong>
                                <ul className="list-disc pl-5 space-y-1 marker:text-destructive">
                                    <li>All decisions of the match officials are considered final and binding.</li>
                                    <li>Only technical protests are permitted (submitted within 30 mins).</li>
                                    <li>Protest fee: <strong>₹2,000</strong> (refunded if upheld).</li>
                                    <li>The decision of the Jury Committee is treated as final.</li>
                                </ul>
                            </div>

                            <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg text-destructive text-sm font-medium text-center">
                                Teams failing to report on time are liable to be scratched from the tournament.
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <PoolTeamList poolName="A" teams={poolATeams} startIndex={1} />
            <PoolTeamList poolName="B" teams={poolBTeams} startIndex={13} />
            <PoolTeamList poolName="C" teams={poolCTeams} startIndex={25} />
            <PoolTeamList poolName="D" teams={poolDTeams} startIndex={37} />
        </div>
    );
};

export default FixturesView;
