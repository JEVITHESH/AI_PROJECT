import * as React from 'react';
import { Card } from '../components/Card';
import { Award, Calendar, Users, Trophy, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import annualDayImg from '../assets/image/Annuval.png';
import cricketLaunchImg from '../assets/image/cricket_launch.png';
import aeveaImg from '../assets/image/Avaa.png';
import sophomoreImg from '../assets/image/avav.png';
import ideaImg from '../assets/image/idea.png';
import traitJourneyVideo from '../assets/video/trait_center.mp4';

const ASSET_MAP: Record<number, { image?: string; video?: string }> = {
  1: { video: traitJourneyVideo },
  2: { image: annualDayImg },
  3: { image: cricketLaunchImg },
  4: { image: aeveaImg },
  5: { image: sophomoreImg },
  6: { image: ideaImg },
};

const STAT_ICON_MAP: Record<string, any> = {
  'Organization': Users,
  'Impact': Trophy,
  'Initiative': Users,
  'Award': Award,
  'Tech': Trophy,
  'Role': Award,
  'Association': Users,
  'Department': Users,
  'Project': Trophy,
  'Event': Award,
};

// Achievements are now managed via Admin Panel / PortfolioContext

// Hardcoded achievements removed

export const Achievements = () => {
  const { data } = usePortfolio();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24">
      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl font-black tracking-tight text-gradient"
        >
          Milestones & Recognition
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-text-muted max-w-2xl mx-auto text-xl"
        >
          A journey of innovation, teamwork, and transformative technology.
        </motion.p>
      </div>

      <div className="space-y-32">
        {data.achievements.map((ach, idx) => {
          const assets = ASSET_MAP[ach.id] || {};
          const video = assets.video;
          const image = assets.image;
          
          return (
          <div key={ach.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            <motion.div 
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative group ${idx % 2 === 1 ? 'lg:order-2' : ''}`}
            >
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl aspect-[16/9] lg:aspect-[4/3]">
                {video ? (
                  <video 
                    src={video} 
                    className="w-full h-full object-cover relative z-0"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                ) : (
                  <img 
                    src={image} 
                    alt={ach.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                )}
                {/* Overlay Gradient - Added pointer-events-none to prevent blocking video controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main/90 via-transparent to-transparent opacity-80 pointer-events-none" />
                
                {/* Content Overlay - Added pointer-events-none to prevent blocking video controls */}
                <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                  <div className="flex items-center space-x-3 text-primary font-bold mb-3">
                    <Calendar size={20} />
                    <span className="text-lg">{ach.date}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">{ach.title}</h3>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: idx % 2 === 0 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`space-y-10 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}
            >
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-black uppercase tracking-widest">
                  <Trophy size={16} />
                  <span>{ach.category}</span>
                </div>
                
                <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tight">
                  {ach.title.split(' & ')[0]}
                </h2>
                
                <p className="text-text-muted text-xl leading-relaxed font-medium">
                  {ach.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {ach.stats.map((stat, sIdx) => {
                  const Icon = STAT_ICON_MAP[stat.label] || Award;
                  return (
                  <Card key={sIdx} className="p-5 flex items-center space-x-5 group/stat">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover/stat:bg-primary group-hover/stat:text-white transition-all duration-300">
                      <Icon size={28} />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-lg">{stat.value}</h4>
                      <p className="text-sm text-text-muted font-bold uppercase tracking-wider">{stat.label}</p>
                    </div>
                  </Card>
                )})}
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-lg text-text-muted italic leading-relaxed">
                  "{ach.quote}"
                </p>
              </div>
            </motion.div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

