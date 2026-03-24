import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Navigation } from "lucide-react";

// Places data array
const places = [
    {
        id: 1,
        name: "Arulmigu Thiru Ardhanareeswarar Temple",
        location: "9VFX+36 Tiruchengode, Tamil Nadu",
        image: "/ardhanareeswarar_temple.png",
        timings: "Morning: 6:00 AM – 2:00 PM\nEvening: 3:00 PM – 7:00 PM",
        description: "Famous hilltop temple dedicated to Lord Shiva in his Ardhanareeswarar form. Known for unique architecture and spiritual significance.",
        mapLink: "https://www.google.com/maps/search/?api=1&query=9VFX%2B36+Tiruchengode%2C+Tamil+Nadu"
    },
    {
        id: 2,
        name: "Kodiveri Dam & Waterfalls",
        location: "F7FW+6HC Oddarpalayam, Tamil Nadu",
        image: "/kodiveri_dam.png",
        timings: "Daily: 8:00 AM – 6:00 PM",
        description: "Beautiful dam and waterfalls surrounded by lush greenery. A popular picnic spot with scenic views and flowing water.",
        mapLink: "https://www.google.com/maps/search/?api=1&query=F7FW%2B6HC+Oddarpalayam%2C+Tamil+Nadu"
    },
    {
        id: 3,
        name: "Yercaud",
        location: "Salem District, Tamil Nadu",
        image: "/yercaud.jpg",
        timings: "Always Open",
        description: "A popular hill station known for its pleasant climate and natural beauty, featuring attractions like Yercaud Lake, Lady's Seat, and botanical gardens.",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Yercaud+Tamil+Nadu"
    },
    {
        id: 4,
        name: "Bhavani Kooduthurai",
        location: "Bhavani, Erode, Tamil Nadu",
        image: "/bhavani_kooduthurai.jpg",
        timings: "Morning: 6:00 AM – 1:00 PM\nEvening: 4:00 PM – 8:00 PM",
        description: "The sacred confluence of Rivers Bhavani, Cauvery, and Amudha. A spiritually significant spot often called the Triveni Sangam of the South.",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Bhavani+Kooduthurai"
    },
    {
        id: 5,
        name: "Namakkal Anjaneyar Temple",
        location: "Namakkal, Tamil Nadu",
        image: "/namakkal_anjaneyar.jpg",
        timings: "Morning: 6:30 AM – 1:00 PM\nEvening: 4:30 PM – 9:00 PM",
        description: "A renowned Digambara Anjaneyar temple featuring a colossal 18-foot tall Hanuman statue carved from a single stone, standing open to the sky.",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Namakkal+Anjaneyar+Temple"
    },
    {
        id: 6,
        name: "VOC Park",
        location: "VOC Park & Zoo, Erode, Tamil Nadu, India",
        image: "/voc_park.jpg",
        timings: "Morning: 9:00 AM – 1:00 PM\nEvening: 3:00 PM – 6:30 PM\n(Closed on Tuesdays)",
        description: "A popular recreational park and zoo in Erode featuring diverse flora and fauna, perfect for family outings and nature enthusiasts.",
        mapLink: "https://www.google.com/maps/search/?api=1&query=VOC+Park+Zoo+Erode+Tamil+Nadu"
    },
    {
        id: 7,
        name: "Vellode Bird Sanctuary",
        location: "Vadamugam Vellode, Tamil Nadu 638112",
        image: "/vellode_bird.jpg",
        timings: "Daily: 9:00 AM – 5:00 PM",
        description: "A serene bird sanctuary spread over 77 acres, home to diverse avian species. An ideal spot for bird watching and nature photography.",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Vellode+Bird+Sanctuary+Vadamugam+Tamil+Nadu"
    },
    {
        id: 8,
        name: "Sathyamangalam Wildlife Sanctuary",
        location: "Nature preserve in Talamalai R.F., Tamil Nadu",
        image: "/sathyamangalam.jpg",
        timings: "Daily: 6:00 AM – 6:00 PM",
        description: "A significant tiger reserve and wildlife sanctuary known for its rich biodiversity, housing elephants, tigers, leopards, and other wildlife in their natural habitat.",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Sathyamangalam+Wildlife+Sanctuary+Tamil+Nadu"
    },
    {
        id: 9,
        name: "Bhavanisagar Dam",
        location: "Bhavanisagar, Erode, Tamil Nadu, India",
        image: "/bhavanisagar_dam.jpg",
        timings: "Daily: 8:30 AM – 5:30 PM",
        description: "One of the world's largest earthen dams constructed across the Bhavani River. The adjacent park and garden offer a scenic environment for visitors.",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Bhavanisagar+Dam+Erode+Tamil+Nadu"
    },
];

const Discover = () => {
    return (
        <AppLayout>
            <div className="p-4 space-y-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h1 className="text-2xl font-bold text-foreground">Discover</h1>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                    The venue is located close to several prominent tourist attractions in and around Tiruchengode, Erode, Salem, and Namakkal districts, which participating teams may visit during leisure time, subject to match schedules.
                </p>

                {/* Places List */}
                <div className="space-y-6">
                    {places.map((place) => (
                        <Card key={place.id} className="glass-card overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-md">
                            {/* Place Image */}
                            <div className="relative w-full md:w-80 lg:w-96 shrink-0 h-64 md:h-auto">
                                <img
                                    src={place.image}
                                    alt={place.name}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        if (!target.src.includes("placeholder.svg")) {
                                             target.src = "/placeholder.svg";
                                        }
                                    }}
                                />
                            </div>

                            {/* Place Details */}
                            <div className="p-6 flex flex-col flex-1 justify-center">
                                <h2 className="text-xl md:text-2xl font-bold text-indigo-950 font-serif mb-3">
                                    {place.name}
                                </h2>
                                
                                <div className="space-y-3 mb-4">
                                    {/* Location */}
                                    <div className="flex items-start gap-2.5 text-sm md:text-base">
                                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground font-medium">{place.location}</span>
                                    </div>

                                    {/* Timing */}
                                    <div className="flex items-start gap-2.5 text-sm md:text-base">
                                        <Clock className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground whitespace-pre-line">{place.timings}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-muted-foreground leading-relaxed flex-1 mb-6 text-sm md:text-base">
                                    {place.description}
                                </p>

                                {/* Directions Button */}
                                <div>
                                    <Button
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                        asChild
                                    >
                                        <a
                                            href={place.mapLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Navigation className="h-4 w-4 mr-2" />
                                            Get Directions
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Info Note */}
                <Card className="glass-card p-6 bg-blue-500/5 border-blue-500/20 mt-8">
                    <p className="text-sm text-muted-foreground text-center">
                        Teams are advised to plan visits without affecting match commitments, and any travel outside the venue shall be at the responsibility of the respective Universities.
                    </p>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Discover;
