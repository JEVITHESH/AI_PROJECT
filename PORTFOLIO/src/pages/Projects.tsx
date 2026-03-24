import * as React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ExternalLink, Github, Search } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

// Projects are now managed via Admin Panel / PortfolioContext

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const Projects = () => {
  const { data } = usePortfolio();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredProjects = data.projects.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase()) ||
                          p.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const aiProjects = filteredProjects.filter(p => p.category === 'AI/ML');
  const webProjects = filteredProjects.filter(p => p.category === 'Web');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      {/* Header & Controls */}
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tight text-gradient">My Projects</h1>
          <p className="text-text-muted max-w-2xl text-xl font-medium">
            Building intelligent systems and robust web applications.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex p-1 glass rounded-lg w-full md:w-auto">
            {['All', 'Web', 'AI/ML'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`flex-1 md:flex-none px-8 py-3 rounded-lg text-sm font-black uppercase tracking-widest transition-all ${
                  filter === cat ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105 z-10' : 'text-text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
            <input
              type="text"
              placeholder="Search by tech or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white font-medium"
            />
          </div>
        </div>
      </div>

      {/* AI/ML Section */}
      {(filter === 'All' || filter === 'AI/ML') && aiProjects.length > 0 && (
        <section className="space-y-10">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-black text-white px-4 py-1 border-l-4 border-primary">AI & Machine Learning</h2>
            <div className="h-px flex-grow bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Web Development Section */}
      {(filter === 'All' || filter === 'Web') && webProjects.length > 0 && (
        <section className="space-y-10">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-black text-white px-4 py-1 border-l-4 border-accent">Web Development</h2>
            <div className="h-px flex-grow bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-text-muted text-lg">No projects found matching your search.</p>
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project }: { project: any }) => (
  <Card className="p-8 flex flex-col h-full group hover:border-primary/50 transition-all duration-500 hover:bg-white/[0.02] border-white/5">
    <div className="flex-grow space-y-6">
      <h3 className="text-2xl font-black group-hover:text-primary transition-colors leading-tight">
        {project.title}
      </h3>
      
      <p className="text-text-muted text-base leading-relaxed">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2.5">
        {project.tech.map((t: string) => (
          <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-[11px] font-bold text-text-muted border border-white/10 group-hover:border-primary/20 group-hover:text-text-main transition-colors">
            {t}
          </span>
        ))}
      </div>
    </div>
    
    <div className="pt-8 mt-auto flex gap-4">
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
        <Button variant="outline" size="sm" className="w-full space-x-2 border-white/10 group-hover:border-primary group-hover:bg-primary/5">
          <Github size={18} />
          <span className="font-bold whitespace-nowrap text-[12px]">Code</span>
        </Button>
      </a>
      {project.demo !== '#' && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button size="sm" className="w-full space-x-2 shadow-lg shadow-primary/20">
            <ExternalLink size={18} />
            <span className="font-bold whitespace-nowrap text-[12px]">Live Demo</span>
          </Button>
        </a>
      )}
    </div>
  </Card>
);
