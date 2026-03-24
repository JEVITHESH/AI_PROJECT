import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { Bot, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar = () => {
  const { data } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Achievements', path: '/#achievements' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/#home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-primary">
              <span className="text-white font-bold">{data.portfolioName.charAt(0)}</span>
            </div>
            <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-text-muted truncate max-w-[150px] sm:max-w-none">
              {data.portfolioName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === link.path ? 'text-primary' : 'text-text-muted'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/chat">
              <Button size="sm" className="flex items-center space-x-2">
                <Bot size={16} />
                <span>Ask AI</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-muted hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/5 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                'block px-3 py-2 rounded-md text-base font-medium',
                location.pathname === link.path ? 'bg-primary/10 text-primary' : 'text-text-muted hover:bg-white/5'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/chat" onClick={() => setIsOpen(false)} className="block pt-2">
            <Button className="w-full flex items-center justify-center space-x-2">
              <Bot size={18} />
              <span>Ask AI</span>
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
