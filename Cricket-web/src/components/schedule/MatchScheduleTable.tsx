import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const MatchCell = ({ children, venueId, className }: { children: React.ReactNode, venueId: number, className?: string }) => {
    const navigate = useNavigate();
    const isClickable = children !== "—" && children !== null && children !== undefined && children !== "";

    const handleClick = () => {
        if (isClickable) {
            // Dispatch a custom event to trigger scrolling in the parent component
            const event = new CustomEvent('scrollToMatch', {
                detail: { matchId: children }
            });
            window.dispatchEvent(event);
        }
    };

    return (
        <TableCell
            onClick={handleClick}
            className={cn(
                "text-center",
                isClickable && "cursor-pointer hover:bg-primary/10 text-primary font-bold transition-colors underline decoration-dotted underline-offset-4",
                !isClickable && "text-muted-foreground",
                className
            )}
        >
            {children}
        </TableCell>
    );
};

const MatchScheduleTable = () => {
    return (
        <Card className="glass-card border-border/50 shadow-sm overflow-hidden mb-6">
            <CardHeader className="bg-primary/5 pb-4 border-b border-border/50">
                <CardTitle className="text-lg font-bold text-primary">Match Schedule Matrix</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="hf-cell min-w-[100px] font-bold text-primary">Dates</TableHead>
                                <TableHead className="hf-cell font-bold text-primary">Session</TableHead>
                                <TableHead className="hf-cell text-center font-bold text-foreground">KSRCT<br />G1</TableHead>
                                <TableHead className="hf-cell text-center font-bold text-foreground">SPB<br />G2</TableHead>
                                <TableHead className="hf-cell text-center font-bold text-foreground">BHARATH<br />G3</TableHead>
                                <TableHead className="hf-cell text-center font-bold text-foreground">SANMUGA<br />G4</TableHead>
                                <TableHead className="hf-cell text-center font-bold text-foreground">SENGUNTHAR<br />G5</TableHead>
                                <TableHead className="hf-cell text-center font-bold text-foreground">MAHENDRA<br />G6</TableHead>
                                <TableHead className="hf-cell text-center font-bold text-foreground">NANDHA<br />G7</TableHead>
                                <TableHead className="hf-cell text-center font-bold text-foreground">KONGU<br />G8</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-bold bg-muted/20">27.01.2026</TableCell>
                                <TableCell>Morning</TableCell>
                                <MatchCell venueId={1}>1</MatchCell>
                                <MatchCell venueId={2}>2</MatchCell>
                                <MatchCell venueId={3}>3</MatchCell>
                                <MatchCell venueId={4}>4</MatchCell>
                                <MatchCell venueId={5}>5</MatchCell>
                                <MatchCell venueId={6}>6</MatchCell>
                                <MatchCell venueId={7}>7</MatchCell>
                                <MatchCell venueId={8}>8</MatchCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold bg-muted/20">27.01.2026</TableCell>
                                <TableCell>Afternoon</TableCell>
                                <MatchCell venueId={1}>19</MatchCell>
                                <MatchCell venueId={2}>9</MatchCell>
                                <MatchCell venueId={3}>10</MatchCell>
                                <MatchCell venueId={4}>11</MatchCell>
                                <MatchCell venueId={5}>12</MatchCell>
                                <MatchCell venueId={6}>14</MatchCell>
                                <MatchCell venueId={7}>15</MatchCell>
                                <MatchCell venueId={8}>16</MatchCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold bg-muted/20">28.01.2026</TableCell>
                                <TableCell>Morning</TableCell>
                                <MatchCell venueId={1}>24</MatchCell>
                                <MatchCell venueId={2}>13</MatchCell>
                                <MatchCell venueId={3}>17</MatchCell>
                                <MatchCell venueId={4}>18</MatchCell>
                                <MatchCell venueId={5}>23</MatchCell>
                                <MatchCell venueId={6}>22</MatchCell>
                                <MatchCell venueId={7}>20</MatchCell>
                                <MatchCell venueId={8}>21</MatchCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold bg-muted/20">28.01.2026</TableCell>
                                <TableCell>Afternoon</TableCell>
                                <MatchCell venueId={1}>31</MatchCell>
                                <MatchCell venueId={2}>28</MatchCell>
                                <MatchCell venueId={3}>30</MatchCell>
                                <MatchCell venueId={4}>26</MatchCell>
                                <MatchCell venueId={5}>29</MatchCell>
                                <MatchCell venueId={6}>27</MatchCell>
                                <MatchCell venueId={7}>25</MatchCell>
                                <MatchCell venueId={8}>32</MatchCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold bg-muted/20">29.01.2026</TableCell>
                                <TableCell>Morning</TableCell>
                                <MatchCell venueId={1}>36</MatchCell>
                                <MatchCell venueId={2}>33</MatchCell>
                                <MatchCell venueId={3}>—</MatchCell>
                                <MatchCell venueId={4}>—</MatchCell>
                                <MatchCell venueId={5}>—</MatchCell>
                                <MatchCell venueId={6}>—</MatchCell>
                                <MatchCell venueId={7}>34</MatchCell>
                                <MatchCell venueId={8}>35</MatchCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold bg-muted/20">29.01.2026</TableCell>
                                <TableCell>Afternoon</TableCell>
                                <MatchCell venueId={1}>37</MatchCell>
                                <MatchCell venueId={2}>38</MatchCell>
                                <MatchCell venueId={3}>—</MatchCell>
                                <MatchCell venueId={4}>—</MatchCell>
                                <MatchCell venueId={5}>—</MatchCell>
                                <MatchCell venueId={6}>—</MatchCell>
                                <MatchCell venueId={7}>39</MatchCell>
                                <MatchCell venueId={8}>—</MatchCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold bg-muted/20">30.01.2026</TableCell>
                                <TableCell>Morning</TableCell>
                                <MatchCell venueId={1}>41</MatchCell>
                                <MatchCell venueId={2}>40</MatchCell>
                                <MatchCell venueId={3}>42</MatchCell>
                                <MatchCell venueId={4}>43</MatchCell>
                                <MatchCell venueId={5}>—</MatchCell>
                                <MatchCell venueId={6}>—</MatchCell>
                                <MatchCell venueId={7}>—</MatchCell>
                                <MatchCell venueId={8}>—</MatchCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold bg-muted/20">31.01.2026</TableCell>
                                <TableCell>Morning</TableCell>
                                <MatchCell venueId={1}>44</MatchCell>
                                <MatchCell venueId={2}>45</MatchCell>
                                <MatchCell venueId={3}>—</MatchCell>
                                <MatchCell venueId={4}>—</MatchCell>
                                <MatchCell venueId={5}>—</MatchCell>
                                <MatchCell venueId={6}>—</MatchCell>
                                <MatchCell venueId={7}>—</MatchCell>
                                <MatchCell venueId={8}>—</MatchCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold bg-muted/20">01.02.2026</TableCell>
                                <TableCell>Morning</TableCell>
                                <MatchCell venueId={1}>46</MatchCell>
                                <MatchCell venueId={2}>47</MatchCell>
                                <MatchCell venueId={3}>—</MatchCell>
                                <MatchCell venueId={4}>—</MatchCell>
                                <MatchCell venueId={5}>—</MatchCell>
                                <MatchCell venueId={6}>—</MatchCell>
                                <MatchCell venueId={7}>—</MatchCell>
                                <MatchCell venueId={8}>—</MatchCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default MatchScheduleTable;
