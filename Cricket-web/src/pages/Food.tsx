import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Utensils, Clock, MapPin, Phone, Leaf, AlertCircle, Navigation } from "lucide-react";

const mealTimings = [
  { meal: "Refreshment", venue: "Ground", cost: "Free" },
  { meal: "Breakfast", time: "7:00 AM - 9:00 AM", venue: "Hostel Dining Hall", cost: "₹85" },
  { meal: "Lunch", time: "12:30 PM - 2:00 PM", venue: "Ground Canteen", cost: "₹130" },
  { meal: "Dinner", time: "7:00 PM - 9:00 PM", venue: "Hostel Dining Hall", cost: "₹85" },
];

const nearbyRestaurants = [
  {
    id: "1",
    name: "Nutrice KSR",
    type: "Refreshments",
    cuisine: "KSR Campus",
    distance: "Check Map",
    mapLink: "https://maps.app.goo.gl/4ScT6XyU9fEZGJgK6",
  },
  {
    id: "2",
    name: "MK LITTLE BITES",
    type: "Snacks",
    cuisine: "Tiruchengode",
    distance: "Check Map",
    mapLink: "https://maps.app.goo.gl/GUPAre6U3rXyakNZ8",
  },
  {
    id: "3",
    name: "Tarts and Bites",
    type: "Bakery",
    cuisine: "Near Venue",
    distance: "Check Map",
    mapLink: "https://www.google.com/maps/search/Tarts+Bites+Ksr+Kalvi+Nagar+Tiruchengode",
  },
  {
    id: "4",
    name: "Sri vinayaga bakes",
    type: "Bakery",
    cuisine: "Near Venue",
    distance: "Check Map",
    mapLink: "https://www.google.com/maps/search/Sri+Vinayaga+Bakes+Ksr+Kalvi+Nagar+Tiruchengode",
  },
  {
    id: "5",
    name: "Day 2 Day",
    type: "Veg",
    cuisine: "Near Venue",
    distance: "Check Map",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Day+2+Day+Restaurant,+Erode+Main+Road,+Ksr+Kalvi+Nagar,+Tiruchengode",
  },
  {
    id: "6",
    name: "SVM GRAND CAFE",
    type: "Cafe",
    cuisine: "Near Venue",
    distance: "Check Map",
    mapLink: "https://maps.app.goo.gl/wyq6PdC5jYXuQaZVA",
  },
];

const Food = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-4 pb-20">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Utensils className="h-6 w-6 text-secondary" />
          Food & Dining
        </h1>

        <Tabs defaultValue="official" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6 h-auto p-1 bg-secondary/5 border border-border/40 backdrop-blur-sm rounded-xl">
            <TabsTrigger value="official" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 rounded-lg font-semibold transition-all">Official Meals</TabsTrigger>
            <TabsTrigger value="nearby" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 rounded-lg font-semibold transition-all">Nearby Places</TabsTrigger>
          </TabsList>

          <TabsContent value="official" className="space-y-3">
            <Card className="p-4 bg-orange-500/10 border-orange-500/20 backdrop-blur-sm">
              <h3 className="font-bold text-orange-700 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" /> Important Information
              </h3>
              <ul className="text-sm text-foreground/80 space-y-2 list-disc pl-4">
                <li><strong>Provision:</strong> Boarding arrangements have been made on a payment basis.</li>
                <li><strong>Tokens:</strong> Food tokens are to be obtained in advance at the venue.</li>
                <li><strong>Rates:</strong> Charges are fixed at Rs. 85/- for Breakfast, Rs. 130/- for Lunch, and Rs. 85/- for Dinner.</li>
              </ul>
            </Card>

            {mealTimings.map((meal) => (
              <Card key={meal.meal} className="glass-card p-4 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-foreground font-serif">{meal.meal}</h3>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  {(meal as any).time && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{(meal as any).time}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{meal.venue}</span>
                  </div>
                  {(meal as any).cost && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/40">
                      <span className="font-semibold text-primary">Cost: {(meal as any).cost}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="nearby" className="space-y-3">
            {nearbyRestaurants.map((restaurant) => (
              <a
                key={restaurant.id}
                href={restaurant.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="glass-card p-4 hover:border-secondary/40 transition-colors group-hover:bg-secondary/5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-foreground font-serif group-hover:text-primary transition-colors">{restaurant.name}</h3>
                      <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 ${restaurant.type === "Veg"
                      ? "bg-green-500/10 text-green-700 border-green-500/20"
                      : "bg-red-500/10 text-red-700 border-red-500/20"
                      }`}>
                      <Leaf className="h-3 w-3" />
                      {restaurant.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-3">
                    <div className="flex items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors">
                      <MapPin className="h-4 w-4 text-secondary" />
                      <span>{restaurant.distance}</span>
                    </div>
                    <div
                      className="flex items-center gap-1 text-primary group-hover:text-primary/80 transition-colors font-medium bg-primary/5 px-3 py-1.5 rounded-md"
                    >
                      <Navigation className="h-4 w-4" />
                      <span>Open Map</span>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Food;
