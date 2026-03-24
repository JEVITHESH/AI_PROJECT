import { motion } from "framer-motion";
import southZoneMap from "@/assets/south-zone-map-small.png";
import mapGlow from "@/assets/map-glow.png";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export default function SpiritOfSouthZone() {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Map Visualization */}
        <div className="relative order-2 lg:order-1 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-[80%] mx-auto group"
          >
            {/* Image-based Glow Effect Behind Map */}
            <div className="absolute inset-0 transform scale-110 translate-y-4">
               <img 
                  src={mapGlow} 
                  alt="" 
                  className="w-full h-full object-cover blur-3xl opacity-50"
               />
            </div>
            
            {/* The Map Image - Little Image */}
            <div className="relative z-10">
              <img 
                src={southZoneMap} 
                alt="South Zone Map" 
                className="w-full h-auto drop-shadow-xl"
              />
              
              {/* Scanning Line Animation - Random Movement */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl mix-blend-overlay">
                <motion.div
                  animate={{ top: ["-20%", "120%"] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatType: "loop"
                  }}
                  className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-white/40 to-transparent blur-sm w-full"
                />
              </div>
            </div>

          </motion.div>
        </div>

        {/* Right Column: Content */}
        <div className="order-1 lg:order-2 space-y-8">
          
          <div className="space-y-4">
             <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-3 py-1">
                The Spirit of the South Zone
             </Badge>
             <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground leading-tight">
                A Write-Up
             </h2>
             <p className="text-muted-foreground leading-relaxed text-lg text-justify">
                In the vibrant visual provided, the dynamic landscape of the South Zone is artistically highlighted. The illustrious states of Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, and Telangana are showcased, symbolizing the diverse yet united spirit of the participating universities. Through this tournament, a stage is set where geographical boundaries are transcended by the shared passion for cricket, and the finest athletic talent from these regions is brought together in Tiruchengode. The glowing borders in the image are seen as a representation of the burning competitive spirit that is carried by every team.
             </p>
          </div>

          <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-l-4 border-primary pl-6 py-4 rounded-r-xl">
             <h3 className="text-xl font-bold text-primary mb-2">"A Warm Welcome to the South Zone Contingents"</h3>
             <p className="text-sm md:text-base text-foreground/80 italic text-justify">
                A prestigious and heartfelt welcome is extended to all the university teams arriving from the length and breadth of South India. The hosting privileges are exercised with great pride by Anna University and the K.S. Rangasamy College of Technology. The presence of every player and official is deeply valued. It is hoped that the hospitality of Tamil Nadu is enjoyed and that a memorable experience of camaraderie and competition is found within our campus.
             </p>
          </div>

          <div className="space-y-4">
             <h3 className="text-xl font-bold font-serif flex items-center gap-2">
                <Search className="w-5 h-5 text-accent" />
                Tournament Highlights
             </h3>
             <p className="text-sm text-muted-foreground mb-4">
                To ensure a wonderful experience, the following aspects have been prioritized:
             </p>
             <div className="grid gap-3">
                {[
                   { title: "Upholding Sportsmanship", desc: "The esteemed cooperation of all teams is solicited to ensuring the tournament is conducted in the true spirit of sportsmanship." },
                   { title: "Professional Standards", desc: "Technical support is being provided by Tamil Nadu Cricket Association Officials to ensure that professional standards are maintained throughout the event." },
                   { title: "Cultural Exploration", desc: "Opportunities to explore the rich history of the region are made available. Visits to renowned landmarks, such as the ancient Ardhanareeswarar Temple and the scenic Kodiveri Dam, are suggested for teams during their leisure time." },
                   { title: "Quality Infrastructure", desc: "Matches are to be played on well-prepared matting wickets, and high-quality 4-piece cricket balls (SF Yarker and SG) are to be utilized to ensure the best gameplay experience." }
                ].map((item, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-3 items-start p-3 rounded-lg hover:bg-white/40 dark:hover:bg-black/40 transition-colors"
                   >
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      <div>
                         <span className="font-bold text-foreground block mb-1">{item.title}</span>
                         <span className="text-sm text-muted-foreground leading-relaxed text-justify">{item.desc}</span>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
