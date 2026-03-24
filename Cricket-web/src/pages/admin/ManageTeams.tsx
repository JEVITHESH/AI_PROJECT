import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { Team } from "@/data/mockData";

export default function ManageTeams() {
    const { teams, setTeams } = useData();
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTeam, setCurrentTeam] = useState<Partial<Team>>({
        name: "",
        shortName: "",
        logo: "",
        captain: "",
        manager: "",
        coach: "",
        players: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentTeam.name || !currentTeam.shortName) {
            toast.error("Name and Short Name are required");
            return;
        }

        if (isEditing && currentTeam.id) {
            setTeams(teams.map(t => t.id === currentTeam.id ? { ...t, ...currentTeam } as Team : t));
            toast.success("Team updated successfully");
        } else {
            const newTeam: Team = {
                id: currentTeam.id || Date.now().toString(),
                name: currentTeam.name || "",
                shortName: currentTeam.shortName || "",
                logo: currentTeam.logo || "https://images.unsplash.com/photo-1531415074968-0eccb83f0e7d?w=100&h=100&fit=crop",
                captain: currentTeam.captain || "",
                players: currentTeam.players || [],
                stats: { played: 0, won: 0, lost: 0, points: 0, nrr: 0 }
            };
            setTeams([...teams, newTeam]);
            toast.success("Team added successfully");
        }
        setIsOpen(false);
        resetForm();
    };

    const handleEdit = (team: Team) => {
        setCurrentTeam(team);
        setIsEditing(true);
        setIsOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this team?")) {
            setTeams(teams.filter(t => t.id !== id));
            toast.success("Team deleted");
        }
    };

    const resetForm = () => {
        setCurrentTeam({ name: "", shortName: "", logo: "", captain: "", manager: "", coach: "", players: [] });
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Manage Teams</h2>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Team
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Edit Team" : "Add New Team"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Team Name</Label>
                                <Input
                                    id="name"
                                    value={currentTeam.name}
                                    onChange={(e) => setCurrentTeam({ ...currentTeam, name: e.target.value })}
                                    placeholder="e.g. Royal Challengers Bangalore"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="shortName">Short Name</Label>
                                <Input
                                    id="shortName"
                                    value={currentTeam.shortName}
                                    onChange={(e) => setCurrentTeam({ ...currentTeam, shortName: e.target.value })}
                                    placeholder="e.g. RCB"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="captain">Captain</Label>
                                    <Input
                                        id="captain"
                                        value={currentTeam.captain}
                                        onChange={(e) => setCurrentTeam({ ...currentTeam, captain: e.target.value })}
                                        placeholder="Captain Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="coach">Coach</Label>
                                    <Input
                                        id="coach"
                                        value={currentTeam.coach}
                                        onChange={(e) => setCurrentTeam({ ...currentTeam, coach: e.target.value })}
                                        placeholder="Coach Name"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="manager">Team Manager</Label>
                                <Input
                                    id="manager"
                                    value={currentTeam.manager}
                                    onChange={(e) => setCurrentTeam({ ...currentTeam, manager: e.target.value })}
                                    placeholder="Manager Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="players">Player List (One per line)</Label>
                                <Textarea
                                    id="players"
                                    rows={5}
                                    value={currentTeam.players?.join('\n')}
                                    onChange={(e) => setCurrentTeam({ ...currentTeam, players: e.target.value.split('\n') })}
                                    placeholder="Player 1&#10;Player 2&#10;..."
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {isEditing ? "Update Team" : "Create Team"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Logo</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Short Name</TableHead>
                            <TableHead>Captain</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teams.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No teams found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            teams.map((team) => (
                                <TableRow key={team.id}>
                                    <TableCell>
                                        <img src={team.logo} alt={team.shortName} className="h-8 w-8 rounded-full object-cover" />
                                    </TableCell>
                                    <TableCell className="font-medium">{team.name}</TableCell>
                                    <TableCell>{team.shortName}</TableCell>
                                    <TableCell>{team.captain || "-"}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(team)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(team.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
