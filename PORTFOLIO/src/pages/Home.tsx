import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { motion } from 'motion/react';
import { ArrowRight, Bot, Code, Cpu, Sparkles, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { About } from './About';
import { Projects } from './Projects';
import { Skills } from './Skills';
import { Experience } from './Experience';
import { Contact } from './Contact';
import { Achievements } from './Achievements';
import { usePortfolio } from '../context/PortfolioContext';
import profileImg from '../assets/image/profile.jpeg';

export const Home = () => {
  const { data } = usePortfolio();
  return (
    <div className="space-y-0 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/5 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-accent/5 blur-[120px] rounded-full"
        />
      </div>

      {/* Hero Section */}
      <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-[90vh] flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center lg:text-left space-y-8 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full lg:hidden" />
            <h1 className="text-5xl md:text-7xl md:leading-[1.1] font-display font-black tracking-tight text-white relative">
              Hi, I'm <br className="hidden lg:block"/>
              <span className="text-gradient drop-shadow-md">{data.portfolioName}</span>
            </h1>
          </motion.div>
          
          <p className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto lg:mx-0">
            {data.heroTitle}. Building real-time intelligent systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#projects">
              <Button size="lg" className="w-full sm:w-auto">
                View Projects <ArrowRight className="ml-2" size={20} />
              </Button>
            </a>
            <a href={data.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center space-x-2 border-white/20 hover:border-primary/50">
                <Github size={20} />
                <span>GitHub Profile</span>
              </Button>
            </a>
            <Link to="/chat">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto flex items-center justify-center space-x-2 text-text-muted hover:text-white">
                <Bot size={20} />
                <span>Ask AI About Me</span>
              </Button>
            </Link>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 relative order-1 lg:order-2"
        >
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
            <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 border border-accent/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-2 rounded-full overflow-hidden glass border-4 border-white/10 glow-primary">
              <img 
                src={profileImg} 
                alt="Jevithesh Profile" 
                className="w-full h-full object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quick Stats/Features */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, staggerChildren: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="flex flex-col items-center text-center space-y-4 h-full">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Code size={32} />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Modern Stack</h3>
            <p className="text-text-muted">Expertise in React, Node.js, and TypeScript for robust applications.</p>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <Card className="flex flex-col items-center text-center space-y-4 h-full">
            <div className="p-3 bg-accent/10 rounded-xl text-accent">
              <Cpu size={32} />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">AI Developer & Integration</h3>
            <p className="text-text-muted">AI Developer specializing in LLM integration and intelligent automation.</p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <Card className="flex flex-col items-center text-center space-y-4 h-full">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">User Centric</h3>
            <p className="text-text-muted">Designing intuitive interfaces with focus on performance and UX.</p>
          </Card>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white/5">
        <About />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <Projects />
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-white/5">
        <Skills />
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <Experience />
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 bg-white/5">
        <Achievements />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white/5">
        <Contact />
      </section>
    </div>
  );
};
