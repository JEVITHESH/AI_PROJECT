
import React from 'react';
import { motion } from 'framer-motion';
import southZoneMap from '@/assets/south_zone_map.png';

const SpiritSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background with slight gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-orange-50/50 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Content Side */}
        <div className="space-y-8 animate-fade-in-up">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-600 mb-4">
              The Spirit of the South Zone
            </h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full mb-6"></div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Reflecting the dynamic landscape of South India, this tournament unites the illustrious states of Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, and Telangana. The glowing contours of our region symbolize the burning competitive spirit of every participating university. Here in Tiruchengode, geographical boundaries fade as a shared passion for cricket takes center stage, bringing together the finest athletic talent for a celebration of unity and excellence.
            </p>
          </div>

          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-100 shadow-sm">
            <h3 className="text-xl font-semibold text-indigo-900 mb-3">Official Welcome Note</h3>
            <p className="text-gray-700 italic font-medium">
              "A Warm Welcome to the South Zone Contingents"
            </p>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Anna University and K.S. Rangasamy College of Technology are honored to host teams from across South India. We deeply value the presence of every player and official, dedicating ourselves to ensuring you enjoy the renowned hospitality of Tamil Nadu. May your time here be defined by memorable camaraderie and spirited competition.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-indigo-900">Tournament Highlights</h3>
            <ul className="space-y-4">
              {[
                { 
                  title: "Upholding Sportsmanship", 
                  text: "True victory lies in fair play. We earnestly solicit the cooperation of all players and officials to uphold the noble spirit of cricket, fostering an atmosphere of mutual respect and integrity throughout the tournament." 
                },
                { 
                  title: "Professional Standards", 
                  text: "To ensure the highest level of competitive integrity, the tournament is technically supported by official umpires and scorers from the Tamil Nadu Cricket Association (TNCA). Their expertise guarantees that every match adheres to professional cricketing standards." 
                },
                { 
                  title: "Cultural Exploration", 
                  text: "Beyond the boundary, immerse yourself in the rich heritage of the Kongu region. We encourage teams to visit the majestic Ardhanareeswarar Temple, a beacon of ancient Dravidian architecture, and unwind at the scenic Kodiveri Dam, offering a perfect retreat into nature's tranquility." 
                },
                { 
                  title: "Quality Infrastructure", 
                  text: "Our grounds are equipped with professionally prepared matting wickets designed to offer a balanced contest between bat and ball. We exclusively utilize premium 4-piece cricket balls, specifically SF Yarker and SG, ensuring an international-quality gameplay experience." 
                }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-orange-500 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">{item.title}:</span>{" "}
                    <span className="text-gray-600 text-sm">{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Image Side with Animation */}
        <div className="relative group">
          {/* Animated Background Blob */}
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-300 via-indigo-300 to-purple-300 rounded-xl opacity-30 blur-2xl animate-pulse group-hover:opacity-50 transition-opacity duration-1000"></div>
          
          {/* Moving shine effect wrapper */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
             {/* The "randomly going through" animation effect - using a wandering spotlight */}
            <motion.div 
               className="absolute w-32 h-32 bg-white/30 blur-3xl rounded-full z-20 pointer-events-none"
               animate={{ 
                 top: ["0%", "80%", "20%", "60%", "10%", "90%"],
                 left: ["0%", "20%", "80%", "10%", "90%", "30%"],
                 opacity: [0.3, 0.6, 0.3, 0.5, 0.2, 0.4]
               }}
               transition={{ 
                 duration: 20, 
                 repeat: Infinity, 
                 ease: "linear",
                 repeatType: "mirror"
               }}
            />
            {/* Secondary random glimmer */}
             <motion.div 
               className="absolute w-20 h-20 bg-indigo-400/30 blur-2xl rounded-full z-20 pointer-events-none"
               animate={{ 
                 top: ["50%", "10%", "70%", "30%", "80%"],
                 left: ["50%", "90%", "20%", "60%", "10%"],
               }}
               transition={{ 
                 duration: 15, 
                 repeat: Infinity, 
                 ease: "easeInOut",
                 repeatType: "mirror"
               }}
            />
            
            <img 
              src={southZoneMap} 
              alt="South Zone Map" 
              className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
            />
            
            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent z-10"></div>
            
            <div className="absolute bottom-4 left-4 right-4 z-20">
               <div className="bg-white/90 backdrop-blur text-xs font-medium text-indigo-900 px-3 py-1.5 rounded-full inline-block shadow-lg">
                 South Zone Inter-University Women's Cricket Tournament
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SpiritSection;
