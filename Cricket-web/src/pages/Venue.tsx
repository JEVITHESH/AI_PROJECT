import { useState, useRef, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Image as ImageIcon, Upload, Edit2, Trash2, Plus, Save, X, Info } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Hardcoded venue data as per user request
const VENUES_LIST = [
  {
    id: 1,
    name: "Ground 1 (The Wonderland)",
    address: "K. S. Rangasamy College of Technology, Tiruchengode",
    description: "The ground is located approximately 500 meters from the main block",
    mapLink: "https://maps.app.goo.gl/ev8gUyMmfSHt4EDg8",
  },
  {
    id: 2,
    name: "Ground 2: SPB Colony School Ground",
    address: "Pallipalayam",
    description: "The ground is located approximately 5.9 km from the main block",
    mapLink: "https://maps.app.goo.gl/ULEjsVbMCuAkkM36A",
  },
  {
    id: 3,
    name: "Ground 3: Bharath Polytechnic Ground",
    address: "Manickkapalayam",
    description: "The ground is located approximately 26.3 km from the main block",
    mapLink: "https://maps.app.goo.gl/asdvPGDPNAstZVjj9",
  },
  {
    id: 4,
    name: "Ground 4: Sri Shanmuga Ground",
    address: "Sankari",
    description: "The ground is located approximately 14.8 km from the main block",
    mapLink: "https://maps.app.goo.gl/MPta8i1yfbDPeu858",
  },
  {
    id: 5,
    name: "Ground 5: Sengunthar Engineering College",
    address: "Tiruchengode",
    description: "The ground is located approximately 15.5 km from the main block",
    mapLink: "https://maps.app.goo.gl/aoB22aUfqcbkWUYbA",
  },
  {
    id: 6,
    name: "Ground 6: Mahendra Engineering College",
    address: "Mallasamutharam",
    description: "The ground is located approximately 28.5 km from the main block",
    mapLink: "https://maps.app.goo.gl/ZX9KLXG85XnjLVH67",
  },
  {
    id: 7,
    name: "Ground 7: Nandha Engineering College",
    address: "Erode",
    description: "This ground is located approximately 29.6 km from the main block",
    mapLink: "https://maps.app.goo.gl/kJKBVzT2SMS9kbhD7",
  },
  {
    id: 8,
    name: "Ground 8: Kongu Engineering College",
    address: "Perundurai",
    description: "This ground is located approximately 29.7 km from the main block",
    mapLink: "https://maps.app.goo.gl/CerhKfHPQxQ7TCzq9",
  },
  {
    id: 9,
    name: "Reserve Ground 1: Erode Sengunthar Engineering College",
    address: "Thudupathy",
    description: "This ground is located approximately 38.7 km from the main block",
    mapLink: "https://maps.app.goo.gl/iDhasKXwAL3wnjxr5",
  },
];

const Venue = () => {
  // Venue Data State
  const [venues, setVenues] = useState<any[]>(() => {
    const saved = localStorage.getItem('venues_data');
    return saved ? JSON.parse(saved) : VENUES_LIST;
  });

  // Image State
  const [venueImages, setVenueImages] = useState<Record<number, string>>({}); // Reset images as requested

  // Edit State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const [uploadingVenueId, setUploadingVenueId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check admin status
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Persistence
  useEffect(() => {
    localStorage.setItem('venues_data', JSON.stringify(venues));
  }, [venues]);

  useEffect(() => {
    localStorage.setItem('venue_images', JSON.stringify(venueImages));
  }, [venueImages]);


  // CRUD Actions
  const handleAddNew = () => {
    const newId = Math.max(...venues.map((v: any) => v.id), 0) + 1;
    const newVenue = {
      id: newId,
      name: "New Venue Name",
      address: "Venue Address",
      description: "Venue Description",
      mapLink: "https://maps.google.com"
    };
    setVenues([...venues, newVenue]);
    setEditingId(newId);
    setEditForm(newVenue);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      setVenues(venues.filter((v: any) => v.id !== id));
    }
  };

  const handleStartEdit = (venue: any) => {
    setEditingId(venue.id);
    setEditForm(venue);
  };

  const handleSaveEdit = () => {
    setVenues(venues.map((v: any) => v.id === editingId ? editForm : v));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };


  // Image Actions
  const handleImageClick = (id: number) => {
    if (!isAdmin) return;
    setUploadingVenueId(id);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && uploadingVenueId !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVenueImages(prev => ({
          ...prev,
          [uploadingVenueId]: reader.result as string
        }));
        setUploadingVenueId(null); // Reset
      };
      reader.readAsDataURL(file);
    }
    // Reset inputs
    if (event.target) event.target.value = '';
  };


  return (
    <AppLayout>
      <div className="p-4 space-y-8 pb-20">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Venue Details</h1>
          {isAdmin && (
            <Button onClick={handleAddNew} className="gap-2">
              <Plus className="h-4 w-4" /> Add Venue
            </Button>
          )}
        </div>

        <Card className="p-5 bg-primary/5 border border-primary/20 backdrop-blur-sm rounded-xl mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-foreground">Venue Instructions</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
                <li>Matches are to be played on matting wickets only.</li>
                <li>Teams are required to report to their respective sessions at least 45 minutes before the scheduled start time.</li>
                <li>Transportation from the accommodation venue to the match ground will be provided free of cost.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Hidden File Input */}
        {isAdmin && (
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        )}

        <div className="space-y-6">
          {venues.map((venue) => (
            <Card key={venue.id} className="glass-card overflow-hidden group hover:border-primary/50 transition-all duration-300 relative">

              {/* Admin Actions (Delete/Edit buttons) -- Only show if NOT editing currently? Or always? */}
              {isAdmin && editingId !== venue.id && (
                <div className="absolute top-2 right-2 z-10 flex gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/80 hover:bg-background" onClick={() => handleStartEdit(venue)}>
                    <Edit2 className="h-4 w-4 text-primary" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete(venue.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Photo Area */}
              <div
                className={`w-full h-48 bg-secondary/5 border-b border-border/50 flex flex-col items-center justify-center text-muted-foreground transition-colors relative ${isAdmin ? 'cursor-pointer hover:bg-secondary/10' : ''}`}
                onClick={() => handleImageClick(venue.id)}
              >
                {venueImages[venue.id] ? (
                  <img
                    src={venueImages[venue.id]}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                    <span className="text-sm font-medium flex items-center gap-2">
                      Photo to be uploaded {isAdmin && <Upload className="h-3 w-3" />}
                    </span>
                  </>
                )}

                {/* Overlay hint on hover if image exists */}
                {isAdmin && venueImages[venue.id] && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium flex items-center gap-2">
                      <Upload className="h-4 w-4" /> Change Photo
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 relative">

                {/* Content View vs Edit View */}
                {editingId === venue.id ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="space-y-2">
                      <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        placeholder="Venue Name"
                        className="font-bold text-lg"
                      />
                      <Textarea
                        value={editForm.description || ""}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        placeholder="Description"
                      />
                      <Input
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        placeholder="Address"
                      />
                      <Input
                        value={editForm.mapLink}
                        onChange={(e) => setEditForm({ ...editForm, mapLink: e.target.value })}
                        placeholder="Google Maps Link"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={handleCancelEdit}><X className="h-4 w-4 mr-1" /> Cancel</Button>
                      <Button onClick={handleSaveEdit}><Save className="h-4 w-4 mr-1" /> Save</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg font-bold text-foreground mb-1 font-serif pr-20">
                      {venue.name}
                    </h2>

                    {/* Description if available */}
                    {venue.description && (
                      <p className="text-lg text-foreground/90 mb-2 font-serif px-1">
                        {venue.description}
                      </p>
                    )}

                    <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>{venue.address}</span>
                    </div>

                    <Button className="w-full bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20" asChild>
                      <a href={venue.mapLink} target="_blank" rel="noopener noreferrer">
                        <Navigation className="h-4 w-4 mr-2" />
                        Open in Google Maps
                      </a>
                    </Button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Venue;
