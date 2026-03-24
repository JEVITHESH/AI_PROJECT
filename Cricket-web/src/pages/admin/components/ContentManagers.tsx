import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Edit, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

// --- Generic CRUD Hook/Component Pattern could be used, but specific forms are better for UX ---

export function AccommodationManager() {
    const { accommodation, setAccommodation } = useData();
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [type, setType] = useState("Hotel");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setName(item.name);
        setType(item.type);
        setAddress(item.address);
        setContact(item.contact);
        setIsOpen(true);
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setName("");
        setType("Hotel");
        setAddress("");
        setContact("");
        setIsOpen(true);
    };

    const handleSave = () => {
        const newItem = {
            id: editingItem ? editingItem.id : `a${Date.now()}`,
            name,
            type,
            address,
            contact,
            distance: editingItem?.distance || "Near Campus", // Default or preserve
            facilities: editingItem?.facilities || ["Basic Amenities"] // Default
        };

        if (editingItem) {
            setAccommodation(accommodation.map(i => i.id === editingItem.id ? newItem : i));
            toast.success("Updated successfully");
        } else {
            setAccommodation([...accommodation, newItem]);
            toast.success("Added successfully");
        }
        setIsOpen(false);
    };

    const handleDelete = (id: string) => {
        if (confirm("Delete this accommodation?")) {
            setAccommodation(accommodation.filter(i => i.id !== id));
            toast.success("Deleted");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Manage Accommodation</h3>
                <Button size="sm" onClick={handleAddNew}><Plus className="h-4 w-4 mr-2" /> Add New</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow><TableHead>Name</TableHead><TableHead>Type</TableHead><TableHead>Contact</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                    {accommodation.map((item: any) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.contact}</TableCell>
                            <TableCell className="text-right flex justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>{editingItem ? "Edit" : "Add"} Place</DialogTitle></DialogHeader>
                    <div className="space-y-3">
                        <div><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
                        <div><Label>Type</Label><Input value={type} onChange={e => setType(e.target.value)} placeholder="Hotel, Hostel, Lodge..." /></div>
                        <div><Label>Address</Label><Textarea value={address} onChange={e => setAddress(e.target.value)} /></div>
                        <div><Label>Contact Info</Label><Input value={contact} onChange={e => setContact(e.target.value)} /></div>
                    </div>
                    <DialogFooter><Button onClick={handleSave}>Save</Button></DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export function FoodManager() {
    const { foodSpots, setFoodSpots } = useData();
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Form
    const [name, setName] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [distance, setDistance] = useState("");

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setName(item.name);
        setCuisine(item.cuisine);
        setDistance(item.distance);
        setIsOpen(true);
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setName("");
        setCuisine("");
        setDistance("");
        setIsOpen(true);
    };

    const handleSave = () => {
        const newItem = {
            id: editingItem ? editingItem.id : `f${Date.now()}`,
            name,
            cuisine,
            distance,
            type: "Restaurant",
            rating: 4.5
        };

        if (editingItem) {
            setFoodSpots(foodSpots.map(i => i.id === editingItem.id ? newItem : i));
        } else {
            setFoodSpots([...foodSpots, newItem]);
        }
        setIsOpen(false);
        toast.success("Saved");
    };

    const handleDelete = (id: string) => {
        setFoodSpots(foodSpots.filter(i => i.id !== id));
        toast.success("Deleted");
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Manage Food Spots</h3>
                <Button size="sm" onClick={handleAddNew}><Plus className="h-4 w-4 mr-2" /> Add New</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow><TableHead>Name</TableHead><TableHead>Cuisine</TableHead><TableHead>Distance</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                    {foodSpots.map((item: any) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.cuisine}</TableCell>
                            <TableCell>{item.distance}</TableCell>
                            <TableCell className="text-right flex justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>{editingItem ? "Edit" : "Add"} Food Spot</DialogTitle></DialogHeader>
                    <div className="space-y-3">
                        <div><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
                        <div><Label>Cuisine</Label><Input value={cuisine} onChange={e => setCuisine(e.target.value)} /></div>
                        <div><Label>Distance</Label><Input value={distance} onChange={e => setDistance(e.target.value)} /></div>
                    </div>
                    <DialogFooter><Button onClick={handleSave}>Save</Button></DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export function TransportManager() {
    const { transport, setTransport } = useData();
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    const [route, setRoute] = useState("");
    const [mode, setMode] = useState("");
    const [contact, setContact] = useState("");

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setRoute(item.route);
        setMode(item.mode);
        setContact(item.contact);
        setIsOpen(true);
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setRoute("");
        setMode("");
        setContact("");
        setIsOpen(true);
    };

    const handleSave = () => {
        const newItem = {
            id: editingItem ? editingItem.id : `tr${Date.now()}`,
            route,
            mode,
            contact,
            timings: editingItem?.timings || ["Available on request"]
        };

        if (editingItem) {
            setTransport(transport.map(i => i.id === editingItem.id ? newItem : i));
        } else {
            setTransport([...transport, newItem]);
        }
        setIsOpen(false);
        toast.success("Saved");
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Manage Transport</h3>
                <Button size="sm" onClick={handleAddNew}><Plus className="h-4 w-4 mr-2" /> Add New</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow><TableHead>Route</TableHead><TableHead>Mode</TableHead><TableHead>Contact</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                    {transport.map((item: any) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.route}</TableCell>
                            <TableCell>{item.mode}</TableCell>
                            <TableCell>{item.contact}</TableCell>
                            <TableCell className="text-right flex justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => {
                                    if (confirm("Delete?")) { setTransport(transport.filter(t => t.id !== item.id)); toast.success("Deleted"); }
                                }}><Trash2 className="h-4 w-4" /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>{editingItem ? "Edit" : "Add"} Transport Base</DialogTitle></DialogHeader>
                    <div className="space-y-3">
                        <div><Label>Route</Label><Input value={route} onChange={e => setRoute(e.target.value)} /></div>
                        <div><Label>Mode</Label><Input value={mode} onChange={e => setMode(e.target.value)} /></div>
                        <div><Label>Contact</Label><Input value={contact} onChange={e => setContact(e.target.value)} /></div>
                    </div>
                    <DialogFooter><Button onClick={handleSave}>Save</Button></DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// Simple Placeholder for Contacts/Rules etc
export function GenericManager({ title, data, setData, fieldMap }: any) {
    // This is a simplified version, ideally would be robust
    return <div className="p-4 border border-dashed rounded text-center text-muted-foreground">Generic Manager for {title} (Coming Soon)</div>
}
