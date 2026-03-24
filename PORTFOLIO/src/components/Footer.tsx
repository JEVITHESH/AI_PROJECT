import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer = () => {
  const { data } = usePortfolio();
  return (
    <footer className="glass border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
            <span className="text-xl font-display font-bold text-white">{data.portfolioName}</span>
            <p className="mt-2 text-text-muted text-sm max-w-xs">
              Building the future with AI and modern web technologies. Let's create something amazing together.
            </p>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <Mail size={20} />
            </a>
          </div>

          <div className="text-right text-text-muted text-sm">
            <p>© {new Date().getFullYear()} {data.portfolioName}. All rights reserved.</p>
            <Link to="/admin" className="hover:text-primary transition-colors mt-1 inline-block">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
