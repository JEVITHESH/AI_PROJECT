import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import { ArrowLeft, Plus, Trash2, MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ManageVenues() {
    const { venues, setVenues } = useData();
    const navigate = useNavigate();
    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        image: '',
        mapLink: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newVenue = {
            id: `v${Date.now()}`,
            name: formData.name,
            address: formData.address,
            image: formData.image || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
            mapLink: formData.mapLink || 'https://maps.google.com',
            facilities: [],
            rules: []
        };
        setVenues([...venues, newVenue]);
        setIsAdding(false);
        setFormData({ name: '', address: '', image: '', mapLink: '' });
        toast.success("Venue added successfully");
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this venue?')) {
            setVenues(venues.filter(v => v.id !== id));
            toast.success("Venue deleted");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/admin/dashboard')}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Manage Venues</h2>
            </div>

            {!isAdding ? (
                <div className="space-y-4">
                    <Button onClick={() => setIsAdding(true)} className="w-full gap-2">
                        <Plus className="h-4 w-4" /> Add New Venue
                    </Button>

                    <div className="grid gap-4">
                        {venues.map((venue) => (
                            <Card key={venue.id}>
                                <CardContent className="flex items-center justify-between p-4">
                                    <div>
                                        <p className="font-semibold text-lg">{venue.name}</p>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <MapPin className="h-3 w-3" />
                                            {venue.address}
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(venue.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Add Venue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Venue Name</Label>
                                <Input
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Address</Label>
                                <Input
                                    required
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Image URL (Optional)</Label>
                                <Input
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Map Link (Optional)</Label>
                                <Input
                                    value={formData.mapLink}
                                    onChange={e => setFormData({ ...formData, mapLink: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsAdding(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1">
                                    Save Venue
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
