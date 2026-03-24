import { useState } from "react";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Megaphone, Plus } from "lucide-react";
import { toast } from "sonner";

export default function ManageAnnouncements() {
    const { announcements, addAnnouncement, deleteAnnouncement } = useAnnouncements();
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState<"info" | "important" | "update">("info");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !message) {
            toast.error("Title and message are required");
            return;
        }
        addAnnouncement({ title, message, type });
        setTitle("");
        setMessage("");
        toast.success("Announcement posted!");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Create Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="h-5 w-5" /> New Announcement
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Match Delayed"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Details about the announcement..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <div className="flex gap-2">
                                    {(['info', 'important', 'update'] as const).map(t => (
                                        <Button
                                            key={t}
                                            type="button"
                                            variant={type === t ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setType(t)}
                                            className="capitalize"
                                        >
                                            {t}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <Button type="submit" className="w-full">Post Announcement</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* List */}
                <div className="space-y-4">
                    {announcements.map((ann) => (
                        <Card key={ann.id} className="relative overflow-hidden">
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${ann.type === 'important' ? 'bg-red-500' :
                                    ann.type === 'update' ? 'bg-blue-500' : 'bg-green-500'
                                }`} />
                            <CardContent className="pt-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold flex items-center gap-2">
                                            {ann.title}
                                            <span className="text-[10px] uppercase border px-1.5 rounded-full text-muted-foreground">
                                                {ann.type}
                                            </span>
                                        </h4>
                                        <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{ann.message}</p>
                                        <p className="text-xs text-slate-400 mt-2">
                                            {new Date(ann.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive h-8 w-8"
                                        onClick={() => deleteAnnouncement(ann.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {announcements.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                            <Megaphone className="h-12 w-12 mx-auto mb-2 opacity-20" />
                            No announcements yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Add simple Label component inline or import if forgotten, assuming import from ui/label
import { Label } from "@/components/ui/label";
