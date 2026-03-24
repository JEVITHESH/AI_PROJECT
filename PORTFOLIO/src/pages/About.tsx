import * as React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Eye, Mail, MapPin, User } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import profileImg from '../assets/image/profile.jpeg';

export const About = () => {
  const { data } = usePortfolio();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative aspect-square rounded-2xl overflow-hidden glass border border-white/10">
            <img 
              src={profileImg} 
              alt="Jevithesh" 
              className="object-cover w-full h-full transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight">About Me</h1>
            <p className="text-gradient font-bold text-lg">{data.heroTitle}</p>
          </div>
          
          <p className="text-text-muted leading-relaxed whitespace-pre-line">
            {data.aboutText}
          </p>

          <p className="text-text-muted leading-relaxed">
            I believe in the power of clean code, continuous learning, and the potential of AI to solve real-world problems. When I'm not coding, you can find me exploring new deep learning models, contributing to open-source projects, and leading initiatives like the AEVA Club.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center space-x-3 text-sm text-text-muted">
              <MapPin size={18} className="text-primary" />
              <span>Namakkal, Tamil Nadu - 637001</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-text-muted">
              <Mail size={18} className="text-primary" />
              <span>jev0760@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-text-muted">
              <User size={18} className="text-primary" />
              <span>Available for Hire</span>
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <a href="/resume.docx" target="_blank" rel="noopener noreferrer">
              <Button className="flex items-center space-x-2 shadow-lg shadow-primary/20">
                <Eye size={18} />
                <span>View My Resume</span>
              </Button>
            </a>
            <a href="#projects">
              <Button variant="outline">View Projects</Button>
            </a>
          </div>
        </motion.div>
      </section>

      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <Card className="text-center space-y-2 group">
          <h4 className="text-4xl font-black text-gradient group-hover:scale-110 transition-transform duration-300">2+</h4>
          <p className="text-text-muted text-sm uppercase tracking-wider font-semibold">Years Experience</p>
        </Card>
        <Card className="text-center space-y-2 group">
          <h4 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-accent to-emerald-200 group-hover:scale-110 transition-transform duration-300">10+</h4>
          <p className="text-text-muted text-sm uppercase tracking-wider font-semibold">Projects Completed</p>
        </Card>
        <Card className="text-center space-y-2 group">
          <h4 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-400 group-hover:scale-110 transition-transform duration-300">5+</h4>
          <p className="text-text-muted text-sm uppercase tracking-wider font-semibold">AI Models Built</p>
        </Card>
      </motion.section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">My Focus</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="space-y-4">
            <h3 className="text-xl font-bold">AI/ML Integration</h3>
            <p className="text-text-muted">
              Leveraging large language models and machine learning frameworks to build smarter applications that understand and adapt to user needs.
            </p>
          </Card>
          <Card className="space-y-4">
            <h3 className="text-xl font-bold">Scalable Architecture</h3>
            <p className="text-text-muted">
              Designing robust backend systems and efficient frontend architectures that can grow with your business and handle high traffic.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};
