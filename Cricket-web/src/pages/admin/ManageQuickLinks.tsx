import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useData } from "@/context/DataContext";
import { ArrowLeft, Edit, Calendar, MapPin, Building, Utensils, Bus, Phone, AlertTriangle, Trophy, Star, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AccommodationManager, FoodManager, TransportManager } from "./components/ContentManagers";

// Re-map icons for display in admin
const IconMap: { [key: string]: any } = {
    Calendar, MapPin, Building, Utensils, Bus, Phone, AlertTriangle, Trophy
};

export default function ManageQuickLinks() {
    const { quickLinks, setQuickLinks } = useData();
    const navigate = useNavigate();
    const [editingLink, setEditingLink] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Content Management State
    const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // Form state
    const [label, setLabel] = useState("");
    const [path, setPath] = useState("");

    const handleEditClick = (link: any) => {
        setEditingLink(link);
        setLabel(link.label);
        setPath(link.path);
        setIsDialogOpen(true);
    };

    const handleManageContent = (link: any) => {
        // Redirection Logic or Open Sheet
        if (link.id === '1' || link.label === 'Schedule') { // Matches
            navigate('/admin/matches');
            return;
        }
        if (link.id === '2' || link.label === 'Venue') { // Venues
            navigate('/admin/venues');
            return;
        }
        if (link.id === '8' || link.label === 'Results') { // Results (Matches)
            navigate('/admin/matches'); // Results are part of matches
            return;
        }

        // For others, open the generic Sheet manager
        setSelectedContentId(link.id);
        setIsSheetOpen(true);
    };

    const handleSave = () => {
        if (!editingLink) return;

        const updatedLinks = quickLinks.map((link) =>
            link.id === editingLink.id
                ? { ...link, label, path }
                : link
        );

        setQuickLinks(updatedLinks);
        setIsDialogOpen(false);
        toast.success("Quick access link updated successfully");
    };

    const renderContentManager = () => {
        switch (selectedContentId) {
            case '3': // Stay
                return <AccommodationManager />;
            case '4': // Food
                return <FoodManager />;
            case '5': // Transport
                return <TransportManager />;
            case '6': // Contacts
            case '7': // Emergency
                return <div className="p-4 text-center text-muted-foreground">Contact Management Coming Soon</div>;
            default:
                return <div className="p-4 text-center text-muted-foreground">No specific manager for this item.</div>;
        }
    };

    const getLinkTitle = () => {
        return quickLinks.find(q => q.id === selectedContentId)?.label || "Content";
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate("/admin/dashboard")}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Manage Quick Access</h2>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Home Page Shortcuts</CardTitle>
                    <CardDescription>
                        Customize the 8 quick access buttons. You can edit the link details OR manage the data behind them (like adding new hotels or food spots).
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Icon</TableHead>
                                <TableHead>Label</TableHead>
                                <TableHead>Link Path</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {quickLinks.map((link) => {
                                const IconComponent = IconMap[link.iconName] || Star;
                                return (
                                    <TableRow key={link.id}>
                                        <TableCell>
                                            <div className={`p-2 rounded-lg inline-flex ${link.color}`}>
                                                <IconComponent className="h-5 w-5" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{link.label}</TableCell>
                                        <TableCell className="text-muted-foreground font-mono text-sm">{link.path}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" onClick={() => handleManageContent(link)}>
                                                    <Settings className="h-4 w-4 mr-2" />
                                                    Manage Data
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleEditClick(link)}>
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Link
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Link Details</DialogTitle>
                        <DialogDescription>
                            Update the label and destination path.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="flex items-center justify-center p-4">
                            {editingLink && (
                                <div className={`p-4 rounded-xl ${editingLink.color}`}>
                                    {(() => {
                                        const IconC = IconMap[editingLink.iconName] || Star;
                                        return <IconC className="h-8 w-8" />;
                                    })()}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Label</Label>
                            <Input
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                placeholder="e.g. Schedule"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Path / URL</Label>
                            <Input
                                value={path}
                                onChange={(e) => setPath(e.target.value)}
                                placeholder="e.g. /schedule"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side="right" className="min-w-[400px] sm:min-w-[540px] overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Manage {getLinkTitle()}</SheetTitle>
                        <SheetDescription>
                            Add, edit, or remove entries for {getLinkTitle()}.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mt-8">
                        {renderContentManager()}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
