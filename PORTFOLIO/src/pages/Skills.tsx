import * as React from 'react';
import { Card } from '../components/Card';
import { Code, Database, Layout, Server, Settings, Terminal, ExternalLink, Github, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

const ICON_MAP: Record<string, React.ReactNode> = {
  'Frontend & Web Dev': <Layout className="text-blue-400" />,
  'Languages & API': <Server className="text-green-400" />,
  'Machine Learning': <Terminal className="text-purple-400" />,
  'Data & NLP': <Settings className="text-orange-400" />,
};

// Skills are now managed via Admin Panel / PortfolioContext

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

export const Skills = () => {
  const { data } = usePortfolio();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />
      
      <div className="space-y-8 relative">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex items-center space-x-3 text-primary mb-4"
        >
          <Sparkles size={20} />
          <span className="text-sm font-black uppercase tracking-[0.3em]">Technical Proficiency</span>
        </motion.div>
        
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-tight"
          >
            Skills & <span className="text-gradient">Expertise</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-muted max-w-2xl text-xl md:text-2xl leading-relaxed font-medium"
          >
            A master overview of my technical architecture, deep-learning frameworks, and full-stack capabilities.
          </motion.p>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {data.skillCategories.map((category) => (
          <motion.div key={category.title} variants={itemVariants}>
            <Card className="space-y-6 h-full">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  {ICON_MAP[category.title] || <Code className="text-primary" />}
                </div>
                <h2 className="text-xl font-bold">{category.title}</h2>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-main font-medium">{skill.name}</span>
                      <span className="text-text-muted">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-primary glow-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-8 pt-12"
      >
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-black text-white px-4 py-1 border-l-4 border-primary">Live Activity & Stats</h2>
          <div className="h-px flex-grow bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Codolio Profile Card */}
          <Card className="p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-primary/50 transition-all bg-white/[0.02] border-white/5">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center p-1 shadow-lg shadow-primary/20 shrink-0">
               <div className="w-full h-full bg-[#0a0a0c] rounded-xl flex items-center justify-center">
                 <Terminal size={40} className="text-primary group-hover:scale-110 transition-transform duration-500" />
               </div>
            </div>
            <div className="flex-grow space-y-4 text-center md:text-left">
              <div>
                <h3 className="text-2xl font-black">Codolio Coding Profile</h3>
                <p className="text-text-muted mt-2 text-base leading-relaxed">Tracking competitive programming metrics and technical growth.</p>
              </div>
              <a 
                href="https://codolio.com/profile/Jevithesh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary hover:text-white transition-colors font-black uppercase tracking-widest text-xs"
              >
                <span>Check My Coding Level</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </Card>

          {/* GitHub Stats Card */}
          <Card className="p-8 flex flex-col items-center justify-center space-y-6 group hover:border-accent/50 transition-all bg-white/[0.02] border-white/5">
            <div className="flex items-center space-x-2">
              <Github size={24} className="text-accent" />
              <h3 className="text-xl font-bold">GitHub Performance</h3>
            </div>
            <img 
              src="https://github-readme-stats.vercel.app/api?username=JEVITHESH&show_icons=true&theme=transparent&hide_border=true&title_color=00d2ff&text_color=94a3b8&icon_color=00d2ff&text_bold=false" 
              alt="Jevithesh GitHub Stats"
              className="w-full max-w-[400px] rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
            />
          </Card>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12"
      >
        {['Python', 'Java', 'PyTorch', 'TensorFlow', 'React', 'Firebase', 'Git', 'AWS', 'OpenCV', 'Pandas', 'MySQL', 'BERT'].map((skill) => (
          <motion.div 
            key={skill}
            whileHover={{ y: -5, scale: 1.05 }}
            className="glass p-4 rounded-xl flex flex-col items-center justify-center space-y-2 hover:border-primary/50 transition-all cursor-default"
          >
            <span className="text-sm font-medium">{skill}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
