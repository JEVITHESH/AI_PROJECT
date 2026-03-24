import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, MapPin, Camera, Star } from "lucide-react";
import southZoneMap from "@/assets/south_zone_map.png";

const ZoneInfoSection = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Map with Animation */}
        <div className="relative group">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-500/30">
            <img
              src={southZoneMap}
              alt="South Zone Map"
              className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
            />

            {/* Glowing Border Overlay */}
            <div className="absolute inset-0 border-2 border-yellow-400/50 rounded-2xl pointer-events-none" />

            {/* Random Moving Lines Animation */}
            <MovingLines />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        </div>

        {/* Right Side: Content */}
        <div className="space-y-8">
          {/* Spirit of the South Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-purple-600 bg-clip-text text-transparent mb-4">
              The Spirit of the South Zone
            </h2>
            <Card className="bg-card/50 backdrop-blur-sm border-yellow-500/20">
              <CardContent className="p-6 text-muted-foreground leading-relaxed">
                In the vibrant visual provided, the dynamic landscape of the
                South Zone is artistically highlighted. The illustrious states
                of Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, and Telangana
                are showcased, symbolizing the diverse yet united spirit of the
                participating universities. Through this tournament, a stage is
                set where geographical boundaries are transcended by the shared
                passion for cricket, and the finest athletic talent from these
                regions is brought together in Tiruchengode. The glowing borders
                in the image are seen as a representation of the burning
                competitive spirit that is carried by every team.
              </CardContent>
            </Card>
          </motion.div>

          {/* Official Welcome Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-1 bg-yellow-500 rounded-full" />
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Official Welcome Note
                </h3>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  "A Warm Welcome to the South Zone Contingents"
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">
              A prestigious and heartfelt welcome is extended to all the
              university teams arriving from the length and breadth of South
              India. The hosting privileges are exercised with great pride by
              Anna University and the K.S. Rangasamy College of Technology. The
              presence of every player and official is deeply valued. It is
              hoped that the hospitality of Tamil Nadu is enjoyed and that a
              memorable experience of camaraderie and competition is found
              within our campus.
            </p>
          </motion.div>

          {/* Tournament Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Tournament Highlights
            </h3>
            <p className="text-muted-foreground mb-4 italic">
              To ensure a wonderful experience, the following aspects have been
              prioritized:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HighlightItem
                icon={<Users className="w-5 h-5 text-blue-500" />}
                title="Upholding Sportsmanship"
                description="The esteemed cooperation of all teams is solicited to ensuring the tournament is conducted in the true spirit of sportsmanship."
              />
              <HighlightItem
                icon={<Trophy className="w-5 h-5 text-yellow-500" />}
                title="Professional Standards"
                description="Technical support is being provided by Tamil Nadu Cricket Association Officials to ensure that professional standards are maintained throughout the event."
              />
              <HighlightItem
                icon={<MapPin className="w-5 h-5 text-green-500" />}
                title="Cultural Exploration"
                description="Opportunities to explore the rich history of the region are made available. Visits to renowned landmarks, such as the ancient Ardhanareeswarar Temple and the scenic Kodiveri Dam, are suggested."
              />
              <HighlightItem
                icon={<Camera className="w-5 h-5 text-purple-500" />}
                title="Quality Infrastructure"
                description="Matches are to be played on well-prepared matting wickets, and high-quality 4-piece cricket balls (SF Yarker and SG) are to be utilized to ensure the best gameplay experience."
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MovingLines = () => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent w-full"
          style={{ top: `${20 + i * 15}%`, left: "-100%" }}
          animate={{
            left: ["100%", "-100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + Math.random() * 4,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-[2px] bg-gradient-to-b from-transparent via-yellow-400/60 to-transparent h-full"
          style={{ left: `${30 + i * 25}%`, top: "-100%" }}
          animate={{
            top: ["100%", "-100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 4 + Math.random() * 3,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </>
  );
};

const HighlightItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
    <div className="mt-1 shrink-0">{icon}</div>
    <div>
      <h4 className="font-semibold text-sm mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default ZoneInfoSection;
