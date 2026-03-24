import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Clock, Wifi, Coffee, Phone, Navigation, Info } from "lucide-react";

const accommodations = [
  {
    id: "5",
    name: "Tanjore House",
    type: "Managers Accommodation",
    address: "VIP Guest Complex, KSRCT",
    distance: "Adjacent to Principal's Bungalow",
    checkIn: "12:00 PM",
    checkOut: "12:00 PM",
    facilities: ["Wi-Fi", "Attached Bathroom", "Hot Water", "Common Room"],
    contact: "Reception: +91 98765 43214",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "1",
    name: "Trichy House",
    type: "Players Accommodation",
    address: "K.S. Rangasamy College of Technology Campus",
    distance: "Near Synthetic Track",
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
    facilities: ["Wi-Fi", "Attached Bathroom", "Hot Water", "Common Room"],
    contact: "Warden: +91 98765 43210",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800",
    coordinates: { lat: 11.36004037050205, lng: 77.82953868192307 },
  },
  {
    id: "2",
    name: "Madurai House",
    type: "Players Accommodation",
    address: "K.S. Rangasamy College of Technology Campus",
    distance: "Near Main Pharmacy Block",
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
    facilities: ["Wi-Fi", "Attached Bathroom", "Hot Water", "Common Room"],
    contact: "Warden: +91 98765 43211",
    image: "https://images.unsplash.com/photo-1596276020587-8044fe049813?auto=format&fit=crop&q=80&w=800",
    coordinates: { lat: 11.35998028859094, lng: 77.82956194880981 },
  },
  {
    id: "3",
    name: "Nilgiri House",
    type: "Players Accommodation",
    address: "K.S. Rangasamy College of Technology Campus",
    distance: "Opposite to MBA Block",
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
    facilities: ["Wi-Fi", "Attached Bathroom", "Hot Water", "Common Room"],
    contact: "Warden: +91 98765 43212",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
    coordinates: { lat: 11.359631109467923, lng: 77.83079053186427 },
  },
  {
    id: "4",
    name: "Teachers House",
    type: "Players Accommodation",
    address: "Staff Quarters, KSRCT Campus",
    distance: "Behind Main Admin Block",
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
    facilities: ["Wi-Fi", "Attached Bathroom", "Hot Water", "Common Room"],
    contact: "In-charge: +91 98765 43213",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800",
  },
];

const AccommodationCard = ({ acc }: { acc: typeof accommodations[0] }) => {
  const isManager = acc.type.includes("Managers");

  return (
    <Card
      className={`glass-card p-5 group transition-all hover:shadow-lg ${isManager
        ? "border-amber-500/30 bg-amber-500/5 hover:shadow-amber-500/10"
        : "border-border/60 hover:shadow-primary/5"
        }`}
    >
      <div className="relative h-48 w-full mb-4 overflow-hidden rounded-xl">
        <img
          src={acc.image}
          alt={acc.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className={`font-bold text-lg text-white font-serif shadow-sm`}>
            {acc.name}
          </h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium inline-block mt-1 backdrop-blur-sm ${isManager
            ? "bg-amber-500/90 text-white"
            : "bg-primary/90 text-white"
            }`}>
            {acc.type}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className={`h-4 w-4 mt-0.5 flex-shrink-0 ${isManager ? "text-amber-600" : "text-primary"}`} />
          <span>{acc.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Navigation className={`h-4 w-4 ${isManager ? "text-amber-600" : "text-primary"}`} />
          <span>{acc.distance}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className={`h-4 w-4 ${isManager ? "text-amber-600" : "text-primary"}`} />
          <span>24-Hour Availability</span>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-sm font-semibold text-foreground mb-2">Facilities</p>
        <div className="flex flex-wrap gap-2">
          {acc.facilities.map((facility) => (
            <span
              key={facility}
              className="text-xs bg-background/50 border border-border/50 text-foreground px-2 py-1 rounded-md"
            >
              {facility}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className={`flex-1 transition-colors ${isManager
          ? "hover:bg-amber-500/10 hover:text-amber-700 hover:border-amber-500/30"
          : "hover:bg-primary/5 hover:text-primary hover:border-primary/30"
          }`} asChild>
          <a href={`tel:${acc.contact}`}>
            <Phone className="h-4 w-4 mr-2" />
            Call
          </a>
        </Button>
        <Button
          className={`flex-1 text-white shadow-lg ${isManager
            ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20"
            : "bg-secondary hover:bg-secondary/90 shadow-secondary/20"
            }`}
          asChild={!!acc.coordinates}
        >
          {acc.coordinates ? (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${acc.coordinates.lat},${acc.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation className="h-4 w-4 mr-2" />
              Directions
            </a>
          ) : (
            <>
              <Navigation className="h-4 w-4 mr-2" />
              Directions
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

const Accommodation = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Building className="h-6 w-6 text-primary" />
          Accommodation
        </h1>

        <div className="text-center p-6 mb-6 rounded-2xl bg-secondary/5 border border-secondary/10">
          <p className="text-sm text-muted-foreground italic font-medium leading-relaxed">
            "All accommodation arrangements are systematically organized within the KSRCT campus, ensuring a safe, disciplined, and comfortable stay for all residents."
          </p>
        </div>

        <Card className="p-5 bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm rounded-xl">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-foreground">Accommodation Instructions</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
                <li><strong>Bedding Charges:</strong> A fee of Rs. 200/- per person per day is to be collected.</li>
                <li><strong>Caution Deposit:</strong> A refundable deposit of Rs. 5,000/- is to be collected from the Team Manager at check-in.</li>
                <li><strong>Payment:</strong> Payments are to be made via UPI or Cash to the local organizers.</li>
                <li><strong>Security:</strong> Locks and keys are required to be brought by the teams.</li>
                <li><strong>Receipts:</strong> Duly signed receipts will be issued for all payments.</li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold font-serif text-foreground mb-4 pl-1 border-l-4 border-amber-500">
              Managers Accommodation
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {accommodations
                .filter(acc => acc.type.includes("Managers"))
                .map((acc) => (
                  <AccommodationCard key={acc.id} acc={acc} />
                ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold font-serif text-foreground mb-4 pl-1 border-l-4 border-primary">
              Participants Accommodation
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {accommodations
                .filter(acc => !acc.type.includes("Managers"))
                .map((acc) => (
                  <AccommodationCard key={acc.id} acc={acc} />
                ))}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <Card className="glass-card p-6 border-red-500/20 bg-red-500/5">
            <h2 className="text-xl font-bold font-serif text-red-700 mb-4 flex items-center gap-2">
              <Building className="h-5 w-5" />
              Accommodation Safety Instructions
            </h2>
            <ul className="space-y-3 text-sm text-foreground/80 list-disc pl-5">
              <li>A peaceful and clean environment is to be maintained, especially during rest hours.</li>
              <li>Visitor entry is permitted only with prior authorization.</li>
              <li>Fire safety and emergency procedures are to be followed as instructed.</li>
              <li>Accommodation is provided to teams one day prior to the commencement of their respective matches.</li>
              <li>Teams are expected to vacate the accommodation within 24 hours after the completion of their competition.</li>
              <li>Non-compliance may result in appropriate administrative action, if required.</li>
            </ul>
          </Card>

          <Card className="glass-card p-6 border-blue-500/20 bg-blue-500/5">
            <h2 className="text-xl font-bold font-serif text-blue-700 mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Accommodation In-Charges
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <span className="font-bold">AK</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Dr. A. Karthik</p>
                  <a href="tel:9789111450" className="text-sm text-muted-foreground hover:text-blue-600">9789111450</a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <span className="font-bold">SP</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Dr. S. Poornima</p>
                  <a href="tel:9994625815" className="text-sm text-muted-foreground hover:text-purple-600">9994625815</a>
                </div>
              </div>
            </div>
          </Card>


        </div>
      </div>
    </AppLayout >
  );
};

export default Accommodation;
