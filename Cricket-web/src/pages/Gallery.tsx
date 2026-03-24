import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video, Camera } from "lucide-react";

const galleryCategories = [
  { id: "opening", label: "Opening" },
  { id: "matches", label: "Matches" },
  { id: "awards", label: "Awards" },
];

// Placeholder images
const placeholderImages = [
  { id: "1", category: "opening", caption: "Opening Ceremony" },
  { id: "2", category: "opening", caption: "Flag Hoisting" },
  { id: "3", category: "opening", caption: "Oath Taking" },
  { id: "4", category: "matches", caption: "Match Action" },
  { id: "5", category: "matches", caption: "Wicket Celebration" },
  { id: "6", category: "matches", caption: "Team Huddle" },
  { id: "7", category: "awards", caption: "Winner Trophy" },
  { id: "8", category: "awards", caption: "Player of the Match" },
];

const Gallery = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Camera className="h-6 w-6 text-secondary" />
          Photo Gallery
        </h1>

        <Tabs defaultValue="opening" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6 h-auto p-1 bg-secondary/5 border border-border/40 backdrop-blur-sm rounded-xl">
            {galleryCategories.map((cat) => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 rounded-lg font-semibold transition-all"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {galleryCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <div className="grid grid-cols-2 gap-3">
                {placeholderImages
                  .filter((img) => img.category === cat.id)
                  .map((img) => (
                    <Card key={img.id} className="glass-card overflow-hidden group border-border/60">
                      <div className="aspect-square bg-muted/30 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                        <div className="text-center p-4">
                          <Image className="h-8 w-8 text-muted-foreground/60 mx-auto mb-2 group-hover:text-primary transition-colors" />
                          <p className="text-xs text-muted-foreground/80">Photo coming soon</p>
                        </div>
                      </div>
                      <div className="p-3 bg-white/40 backdrop-blur-sm">
                        <p className="text-xs font-bold text-foreground truncate">{img.caption}</p>
                      </div>
                    </Card>
                  ))}
              </div>
              {placeholderImages.filter((img) => img.category === cat.id).length === 0 && (
                <div className="text-center py-12">
                  <Image className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">No photos available yet</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Gallery;
