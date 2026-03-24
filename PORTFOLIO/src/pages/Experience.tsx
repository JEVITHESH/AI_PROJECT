import * as React from 'react';
import { Card } from '../components/Card';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

// Experience is now managed via Admin Panel / PortfolioContext

export const Experience = () => {
  const { data } = usePortfolio();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-5xl font-black tracking-tight text-gradient">Experience & Education</h1>
        <p className="text-text-muted max-w-2xl text-lg mx-auto md:mx-0">
          My professional journey, academic background, and notable achievements in the tech industry.
        </p>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {data.experience.map((item, idx) => (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${idx % 2 === 0 ? 'is-active' : ''}`}
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary/30 bg-bg-main text-primary shadow-[0_0_15px_rgba(129,140,248,0.5)] z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2 transition-transform duration-500 group-hover:scale-110">
              {item.type === 'work' && <Briefcase size={18} />}
              {item.type === 'education' && <GraduationCap size={18} />}
              {item.type === 'award' && <Award size={18} />}
            </div>
            
            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl glass border border-white/5 space-y-2 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between space-x-2 mb-1">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{item.period}</span>
                <span className="text-xs text-text-muted">{item.company}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-text-muted border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
