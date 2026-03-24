import * as React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Mail, MessageSquare, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Contact = () => {
  const { data } = usePortfolio();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Get In Touch</h1>
        <p className="text-text-muted max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to new opportunities and collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider font-bold">Email</p>
              <p className="text-sm font-medium">{data.contactEmail}</p>
            </div>
          </Card>

          <Card className="flex items-center space-x-4">
            <div className="p-3 bg-accent/10 rounded-xl text-accent">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider font-bold">Social</p>
              <div className="flex space-x-2 mt-1 items-center">
                <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary transition-colors">LinkedIn</a>
                <span className="text-text-muted text-xs">|</span>
                <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary transition-colors">GitHub</a>
              </div>
            </div>
          </Card>

          <Card className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider font-bold">Phone</p>
              <p className="text-sm font-medium">+91 8072827232</p>
            </div>
          </Card>
        </div>

        <Card className="lg:col-span-2 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Name</label>
                <input
                  required
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Email</label>
                <input
                  required
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Message</label>
              <textarea
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="How can I help you?"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </Button>
            {isSuccess && (
              <p className="text-center text-accent text-sm font-medium animate-pulse">
                Message sent successfully! I'll get back to you soon.
              </p>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};
