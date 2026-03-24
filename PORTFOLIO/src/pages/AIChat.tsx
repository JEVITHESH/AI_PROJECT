import { useState, useRef, useEffect, useMemo } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { aiService } from '../services/aiService';
import { usePortfolio } from '../context/PortfolioContext';
import { Bot, Send, User, Sparkles, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Jevithesh's AI assistant. Ask me anything about his projects, skills, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { data } = usePortfolio();

  const contextString = useMemo(() => {
    const projects = data.projects.map(p => `- ${p.title} (${p.category}): ${p.description}. Tech: ${p.tech.join(', ')}. Demo: ${p.demo}`).join('\n');
    const skills = data.skillCategories.map(c => `${c.title}: ${c.skills.map(s => `${s.name} (${s.level}%)`).join(', ')}`).join('\n');
    const experience = data.experience.map(e => `- ${e.title} at ${e.company} (${e.period}): ${e.description}`).join('\n');
    const achievements = data.achievements.map(a => `- ${a.title} (${a.date}): ${a.description}`).join('\n');

    return `
      Developer: ${data.portfolioName}
      Tagline: ${data.heroTitle}
      Email: ${data.contactEmail}
      GitHub: ${data.githubUrl}
      LinkedIn: ${data.linkedinUrl}
      
      About: ${data.aboutText}
      
      Projects:
      ${projects}
      
      Skills:
      ${skills}
      
      Experience:
      ${experience}
      
      Achievements:
      ${achievements}
    `;
  }, [data]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await aiService.sendMessage(userMessage, messages, contextString);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please check your API key or try again later." }]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'model', text: "Hi! I'm Jevithesh's AI assistant. Ask me anything about his projects, skills, or experience!" }]);
  };

  const suggestedPrompts = [
    "Tell me about Jevithesh's AI projects",
    "What are Jevithesh's core skills?",
    "How can I contact Jevithesh?",
    "Tell me about the Cricket Tournament App"
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Assistant</h1>
            <p className="text-xs text-text-muted">Powered by Groq AI</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={clearChat} className="text-red-400 hover:text-red-300">
          <Trash2 size={18} className="mr-2" />
          Clear Chat
        </Button>
      </div>

      <Card className="flex-grow overflow-hidden flex flex-col p-0 mb-6">
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-primary' : 'bg-bg-main border border-white/10'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-primary" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white/5 text-text-main rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-lg bg-bg-main border border-white/10 flex items-center justify-center">
                  <Bot size={16} className="text-primary animate-pulse" />
                </div>
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <div className="p-4 border-t border-white/5 bg-white/5">
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedPrompts.map(prompt => (
              <button
                key={prompt}
                onClick={() => setInput(prompt)}
                className="text-xs px-3 py-1.5 glass rounded-full text-text-muted hover:text-primary hover:border-primary/50 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full bg-bg-main border border-white/10 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </Card>
      
      <div className="flex items-center justify-center space-x-2 text-text-muted text-xs">
        <Sparkles size={14} className="text-primary" />
        <span>AI can make mistakes. Verify important information.</span>
      </div>
    </div>
  );
};
