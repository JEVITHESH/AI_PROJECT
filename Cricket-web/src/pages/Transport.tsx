import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bus, MapPin, Info, Phone } from "lucide-react";

// Update the data structure to include images
const transportArrangements = [
  {
    title: "From Erode And Tiruchengode",
    description: "Necessary transportation arrangements are made available from Erode Railway Station, Erode Bus Stand and Tiruchengode Bus Stand.",
    icon: <Bus className="h-5 w-5 text-primary" />,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop", // Placeholder for Erode Bus Stand/Railway Station
  },
  {
    title: "From Salem (Optional)",
    description: "If required, optional transportation arrangements may also be organized from Salem Railway Station and Salem Bus Stand on a payable basis, subject to availability.",
    icon: <Bus className="h-5 w-5 text-primary" />,
    image: "https://images.unsplash.com/photo-1570125909232-eb2bee7c5751?q=80&w=800&auto=format&fit=crop", // Placeholder for Salem Bus Stand/Railway Station
  },
  {
    title: "On-Campus Movements",
    description: "For all on-campus movements, transportation to and from the campus venues is facilitated by the college, ensuring smooth and timely access.",
    icon: <MapPin className="h-5 w-5 text-primary" />,
  }
];

const instructions = [
  "Arrival: Pick-up arrangements from Erode Railway Station or Tiruchengode Bus Stand can be made upon prior request from the morning of 26.01.2026.",
  "Charges: A sum of Rs. 1,500/- will be collected for one-way transportation from the station/bus stand to the venue.",
  "Schedule: The travel schedule is requested to be informed well in advance to the Transport In-charge.",
  "Match Transport: Transportation from the accommodation venue to the match ground will be provided free of cost."
];

const coordinators = [
  { name: "Mr. M.R. Sibi", phone: "9994920190" },
  { name: "Mr. K. Mohan", phone: "6383054401" }
];

const Transport = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Bus className="h-6 w-6 text-primary" />
          Transport & Travel
        </h1>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground font-serif">Transportation Arrangements</h2>
          <div className="grid gap-4 md:grid-cols-1">
            {transportArrangements.map((item, index) => (
              <Card key={index} className="glass-card p-4 hover:border-primary/40 transition-colors overflow-hidden">
                <div className="flex items-start gap-4 z-10 relative">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {item.description}
                    </p>
                    {item.image && (
                      <div className="relative h-48 w-full rounded-xl overflow-hidden mt-3 shadow-md hover:shadow-lg transition-shadow">
                        <img
                          src={item.image}
                          alt={`${item.title} location`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground font-serif flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Instructions
          </h2>
          <Card className="glass-card p-5">
            <ul className="space-y-3">
              {instructions.map((instruction, index) => {
                const [label, content] = instruction.split(": ");
                return (
                  <li key={index} className="flex items-start gap-4 text-sm md:text-base text-foreground/90 bg-primary/5 p-4 rounded-xl border border-primary/10">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <span className="block font-bold text-primary uppercase tracking-wide text-xs md:text-sm">
                        {label}
                      </span>
                      <span className="block leading-relaxed text-muted-foreground">
                        {content || label}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground font-serif flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Transport In-charges
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {coordinators.map((coordinator, index) => (
              <Card key={index} className="glass-card p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-foreground text-lg">{coordinator.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Transport Coordinator</p>
                </div>
                <Button variant="outline" className="w-full group hover:border-primary/50" asChild>
                  <a href={`tel:+91${coordinator.phone}`}>
                    <Phone className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />
                    {coordinator.phone}
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div >
    </AppLayout >
  );
};

export default Transport;
