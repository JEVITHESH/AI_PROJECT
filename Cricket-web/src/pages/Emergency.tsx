import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, Shield, Heart, MapPin, Search, Navigation, Building2, Info, Ambulance } from "lucide-react";

const emergencyContacts = [
  {
    icon: Heart,
    title: "Medical Emergency",
    subtitle: "Campus Medical Center",
    phone: "+91 98765 00010",
    color: "bg-destructive",
  },
  {
    icon: Phone,
    title: "Ambulance",
    subtitle: "24/7 Emergency Service",
    phone: "+91 98765 00011",
    color: "bg-destructive",
  },
  {
    icon: Shield,
    title: "Women Safety Officer",
    subtitle: "Dr. S. Vasanthi",
    phone: "+91 98765 00020",
    color: "bg-secondary",
  },
  {
    icon: Shield,
    title: "Campus Security",
    subtitle: "Main Gate Security",
    phone: "+91 98765 00012",
    color: "bg-primary",
  },

  {
    icon: Search,
    title: "Lost & Found",
    subtitle: "Help Desk",
    phone: "+91 98765 00013",
    color: "bg-muted-foreground",
  },
];

const localHospitals = [
  {
    name: "KSR Hospital",
    location: "Tiruchengodu",
    distance: "2 km",
    phone: "+91 98765 00030",
    available24x7: true,
    mapLink: "https://maps.app.goo.gl/UbX2dtHEHPKjLZx49",
    type: "Multi-Specialty Hospital",
  },
  {
    name: "Tiruchengode Government Hospital",
    location: "Tiruchengode",
    distance: "8.2 km",
    phone: "+91 98765 00050",
    available24x7: true,
    mapLink: "https://www.google.com/maps/search/?api=1&query=9VGV%2BHP2%2C+SH+86%2C+Kamalar%2C+Tiruchengode%2C+Tamil+Nadu+637211",
    type: "Government Hospital",
  },
  {
    name: "K.M.C.H Multi Speciality Hospital",
    location: "Erode",
    distance: "15 km",
    phone: "+91 97888 22223",
    available24x7: true,
    mapLink: "https://www.google.com/maps/search/?api=1&query=8PQ8%2BQC+Erode%2C+Tamil+Nadu",
    type: "Multi-Specialty Hospital",
  },
  {
    name: "Soorya Multispecialty Hospital",
    location: "Tiruchengode",
    distance: "3 km",
    phone: "+91 4288 252 520",
    available24x7: true,
    mapLink: "https://www.google.com/maps/search/?api=1&query=9VHV%2BCC+Tiruchengode%2C+Tamil+Nadu",
    type: "Multi-Specialty Hospital",
  },
  {
    name: "M.M. Hospital",
    location: "Namakkal",
    distance: "12 km",
    phone: "+91 96262 10000",
    available24x7: true,
    mapLink: "https://www.google.com/maps/search/?api=1&query=656H%2B33+Namakkal%2C+Tamil+Nadu",
    type: "Hospital",
  },
];

const ambulanceServices = [
  {
    name: "KSR Ambulance",
    phone: "+91 98765 00070",
    available24x7: true,
  },
  {
    name: "Local Ambulance",
    phone: "108",
    available24x7: true,
  },
];

const Emergency = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <h1 className="text-2xl font-bold text-foreground">Emergency Help</h1>
        </div>

        <Card className="p-5 bg-destructive text-destructive-foreground shadow-lg shadow-destructive/20 border-none rounded-xl">
          <p className="text-center mb-4 font-bold text-lg">One-Tap Emergency Call</p>
          <Button
            size="lg"
            className="w-full bg-white text-destructive hover:bg-white/90 text-lg font-black shadow-md"
            asChild
          >
            <a href="tel:+919876500010">
              <Phone className="h-5 w-5 mr-2 animate-pulse" />
              CALL EMERGENCY
            </a>
          </Button>
        </Card>

        {/* First Aid Notice */}
        <Card className="p-4 bg-green-500/10 border-green-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-700 dark:text-green-400 mb-1">First Aid Available</h3>
              <p className="text-sm text-green-600 dark:text-green-300">
                Required first aid arrangements have been made at the respective venues.
              </p>
            </div>
          </div>
        </Card>

        {/* Ambulance Services Section */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Ambulance className="h-5 w-5 text-destructive" />
            <h2 className="text-xl font-bold text-foreground">Ambulance Services</h2>
          </div>

          <div className="space-y-3">
            {ambulanceServices.map((service) => (
              <Card key={service.name} className="glass-card p-4 hover:border-destructive/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center shadow-sm text-white">
                    <Ambulance className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground font-serif">{service.name}</h3>
                    {service.available24x7 && (
                      <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded-full font-semibold inline-block mt-1">
                        24/7 Available
                      </span>
                    )}
                  </div>
                  <Button
                    size="icon"
                    className="h-12 w-12 rounded-full bg-destructive hover:bg-destructive/90 text-white transition-colors"
                    asChild
                  >
                    <a href={`tel:${service.phone}`}>
                      <Phone className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Local Hospitals Section */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Local Hospitals</h2>
          </div>

          <div className="space-y-3">
            {localHospitals.map((hospital) => (
              <Card key={hospital.name} className="glass-card p-4 hover:border-primary/30 transition-all">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground font-serif">{hospital.name}</h3>
                      <p className="text-sm text-muted-foreground">{hospital.type}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {hospital.location} • {hospital.distance}
                        </span>
                        {hospital.available24x7 && (
                          <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded-full font-semibold">
                            24/7 Available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      asChild
                    >
                      <a href={`tel:${hospital.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary/20 hover:bg-primary/10"
                      asChild
                    >
                      <a href={hospital.mapLink} target="_blank" rel="noopener noreferrer">
                        <Navigation className="h-4 w-4 mr-2" />
                        Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="glass-card p-5 bg-secondary/5">
          <h3 className="font-bold text-foreground mb-3 font-serif">Important Instructions</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> Stay calm and provide clear information</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> Share your exact location when calling</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> Follow instructions from emergency responders</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> Keep this number saved: <span className="font-mono text-foreground font-semibold">+91 98765 00010</span></li>
          </ul>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Emergency;
