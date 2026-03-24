import * as React from 'react';
import { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Layout, Briefcase, Code, Database, Settings, LogOut, Plus, Trash2, Edit2, Check, X, Trophy, Terminal } from 'lucide-react';
import { cn } from '../lib/utils';

type AdminPage = 'Dashboard' | 'Projects' | 'Skills' | 'Experience' | 'Achievements' | 'Settings';

export const AdminPanel = () => {
  const [activePage, setActivePage] = useState<AdminPage>('Dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  
  const { data, updateData } = usePortfolio();
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid password (hint: admin123)');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main p-4">
        <Card className="w-full max-w-md p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-text-muted text-sm">Enter your password to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </Card>
      </div>
    );
  }

  const menuItems: { name: AdminPage; icon: React.ReactNode }[] = [
    { name: 'Dashboard', icon: <Layout size={20} /> },
    { name: 'Projects', icon: <Code size={20} /> },
    { name: 'Skills', icon: <Terminal size={20} /> },
    { name: 'Experience', icon: <Briefcase size={20} /> },
    { name: 'Achievements', icon: <Trophy size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen flex bg-bg-main">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/5 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Admin Panel</h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name as AdminPage)}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                activePage === item.name 
                  ? 'bg-primary text-white glow-primary' 
                  : 'text-text-muted hover:bg-white/5 hover:text-white'
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between sticky top-0 bg-bg-main/80 backdrop-blur-md py-4 z-20 border-b border-white/5 mb-8">
            <h1 className="text-3xl font-black tracking-tight">{activePage}</h1>
            {activePage !== 'Dashboard' && (
              <Button 
                onClick={() => {
                  updateData(formData);
                  alert('Portfolio successfully updated!');
                }}
                className="flex items-center space-x-2 shadow-xl shadow-primary/20"
              >
                <Check size={18} />
                <span>Save All Changes</span>
              </Button>
            )}
          </div>

          {activePage === 'Dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 space-y-2 border-primary/20 bg-primary/5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest">Projects</h3>
                  <Code className="text-primary" size={20} />
                </div>
                <p className="text-4xl font-black">{formData.projects.length}</p>
              </Card>
              <Card className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest">Skills</h3>
                  <Terminal className="text-green-400" size={20} />
                </div>
                <p className="text-4xl font-black">
                  {formData.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}
                </p>
              </Card>
              <Card className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest">Achievements</h3>
                  <Trophy className="text-orange-400" size={20} />
                </div>
                <p className="text-4xl font-black">{formData.achievements.length}</p>
              </Card>
            </div>
          )}

          {activePage === 'Projects' && (
            <div className="space-y-4">
              {formData.projects.map((p, idx) => (
                <Card key={p.id} className="relative group p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Title</label>
                      <input 
                        className="w-full glass p-2 rounded-lg text-sm"
                        value={p.title}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[idx].title = e.target.value;
                          setFormData({ ...formData, projects: newProjects });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Category</label>
                      <select 
                        className="w-full glass p-2 rounded-lg text-sm"
                        value={p.category}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[idx].category = e.target.value;
                          setFormData({ ...formData, projects: newProjects });
                        }}
                      >
                        <option value="AI/ML">AI/ML</option>
                        <option value="Web">Web</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Tech Stack (comma-separated)</label>
                      <input 
                        className="w-full glass p-2 rounded-lg text-sm"
                        value={p.tech.join(', ')}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[idx].tech = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          setFormData({ ...formData, projects: newProjects });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">GitHub URL</label>
                      <input 
                        className="w-full glass p-2 rounded-lg text-sm"
                        value={p.github}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[idx].github = e.target.value;
                          setFormData({ ...formData, projects: newProjects });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Demo/Live URL</label>
                      <input 
                        className="w-full glass p-2 rounded-lg text-sm"
                        value={p.demo}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[idx].demo = e.target.value;
                          setFormData({ ...formData, projects: newProjects });
                        }}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Description</label>
                      <textarea 
                        className="w-full glass p-2 rounded-lg text-sm resize-none h-20"
                        value={p.description}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[idx].description = e.target.value;
                          setFormData({ ...formData, projects: newProjects });
                        }}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const newProjects = [...formData.projects];
                      newProjects.splice(idx, 1);
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    className="absolute top-4 right-4 text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </Card>
              ))}
              <Button 
                variant="outline" 
                className="w-full border-dashed"
                onClick={() => {
                  const newId = Math.max(0, ...formData.projects.map(p => p.id)) + 1;
                  setFormData({
                    ...formData,
                    projects: [...formData.projects, {
                      id: newId,
                      title: 'New Project',
                      category: 'Web',
                      description: 'Project summary...',
                      tech: ['React'],
                      github: '#',
                      demo: '#'
                    }]
                  });
                }}
              >
                <Plus size={16} className="mr-2" /> Add Project
              </Button>
            </div>
          )}

          {activePage === 'Skills' && (
            <div className="space-y-6">
              {formData.skillCategories.map((cat, catIdx) => (
                <Card key={catIdx} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <input 
                      className="bg-transparent border-none text-xl font-bold text-white focus:ring-0 w-full"
                      value={cat.title}
                      onChange={(e) => {
                        const newCats = [...formData.skillCategories];
                        newCats[catIdx].title = e.target.value;
                        setFormData({ ...formData, skillCategories: newCats });
                      }}
                    />
                    <button 
                       onClick={() => {
                         const newCats = [...formData.skillCategories];
                         newCats.splice(catIdx, 1);
                         setFormData({ ...formData, skillCategories: newCats });
                       }}
                       className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cat.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="glass p-3 rounded-lg flex items-center justify-between group">
                        <div className="space-y-1 w-full">
                          <input 
                            className="bg-transparent border-none text-sm font-medium text-white focus:ring-0 p-0 w-full"
                            value={skill.name}
                            onChange={(e) => {
                              const newCats = [...formData.skillCategories];
                              newCats[catIdx].skills[skillIdx].name = e.target.value;
                              setFormData({ ...formData, skillCategories: newCats });
                            }}
                          />
                          <input 
                            type="range"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => {
                              const newCats = [...formData.skillCategories];
                              newCats[catIdx].skills[skillIdx].level = parseInt(e.target.value);
                              setFormData({ ...formData, skillCategories: newCats });
                            }}
                            className="w-full accent-primary h-1"
                          />
                        </div>
                        <button 
                          onClick={() => {
                            const newCats = [...formData.skillCategories];
                            newCats[catIdx].skills.splice(skillIdx, 1);
                            setFormData({ ...formData, skillCategories: newCats });
                          }}
                          className="ml-2 text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <button 
                       onClick={() => {
                         const newCats = [...formData.skillCategories];
                         newCats[catIdx].skills.push({ name: "New Skill", level: 50 });
                         setFormData({ ...formData, skillCategories: newCats });
                       }}
                       className="glass border-dashed border border-white/10 p-3 rounded-lg text-xs text-text-muted hover:text-white transition-colors flex items-center justify-center"
                    >
                      <Plus size={14} className="mr-1" /> Add Skill
                    </button>
                  </div>
                </Card>
              ))}
              <Button 
                variant="outline" 
                className="w-full border-dashed"
                onClick={() => {
                  setFormData({
                    ...formData,
                    skillCategories: [...formData.skillCategories, { title: "New Category", skills: [] }]
                  });
                }}
              >
                <Plus size={16} className="mr-2" /> Add Skill Category
              </Button>
            </div>
          )}

          {activePage === 'Experience' && (
            <div className="space-y-4">
              {formData.experience.map((exp, idx) => (
                <Card key={exp.id} className="relative group p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Role / Title</label>
                      <input 
                        className="w-full glass p-2 rounded-lg text-sm"
                        value={exp.title}
                        onChange={(e) => {
                          const newExp = [...formData.experience];
                          newExp[idx].title = e.target.value;
                          setFormData({ ...formData, experience: newExp });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Company / Institution</label>
                      <input 
                        className="w-full glass p-2 rounded-lg text-sm"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...formData.experience];
                          newExp[idx].company = e.target.value;
                          setFormData({ ...formData, experience: newExp });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Period</label>
                      <input 
                        className="w-full glass p-2 rounded-lg text-sm"
                        value={exp.period}
                        onChange={(e) => {
                          const newExp = [...formData.experience];
                          newExp[idx].period = e.target.value;
                          setFormData({ ...formData, experience: newExp });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Type</label>
                      <select 
                        className="w-full glass p-2 rounded-lg text-sm"
                        value={exp.type}
                        onChange={(e) => {
                          const newExp = [...formData.experience];
                          newExp[idx].type = e.target.value as any;
                          setFormData({ ...formData, experience: newExp });
                        }}
                      >
                        <option value="work">Work</option>
                        <option value="education">Education</option>
                        <option value="award">Award</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Description</label>
                      <textarea 
                        className="w-full glass p-2 rounded-lg text-sm resize-none h-20"
                        value={exp.description}
                        onChange={(e) => {
                          const newExp = [...formData.experience];
                          newExp[idx].description = e.target.value;
                          setFormData({ ...formData, experience: newExp });
                        }}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const newExp = [...formData.experience];
                      newExp.splice(idx, 1);
                      setFormData({ ...formData, experience: newExp });
                    }}
                    className="absolute top-4 right-4 text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </Card>
              ))}
              <Button 
                variant="outline" 
                className="w-full border-dashed"
                onClick={() => {
                  const newId = Math.max(0, ...formData.experience.map(e => e.id)) + 1;
                  setFormData({
                    ...formData,
                    experience: [...formData.experience, {
                      id: newId,
                      type: 'work',
                      title: 'New Role',
                      company: 'New Company',
                      period: 'Present',
                      description: 'Task description...',
                      tags: []
                    }]
                  });
                }}
              >
                <Plus size={16} className="mr-2" /> Add Experience Entry
              </Button>
            </div>
          )}

          {activePage === 'Achievements' && (
            <div className="space-y-4">
              {formData.achievements.map((ach, idx) => (
                <Card key={ach.id} className="relative group p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Achievement Title</label>
                      <input 
                        className="w-full glass p-2 rounded-lg text-sm"
                        value={ach.title}
                        onChange={(e) => {
                          const newAch = [...formData.achievements];
                          newAch[idx].title = e.target.value;
                          setFormData({ ...formData, achievements: newAch });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Date / Year</label>
                      <input 
                        className="w-full glass p-2 rounded-lg text-sm"
                        value={ach.date}
                        onChange={(e) => {
                          const newAch = [...formData.achievements];
                          newAch[idx].date = e.target.value;
                          setFormData({ ...formData, achievements: newAch });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Category</label>
                      <input 
                        className="w-full glass p-2 rounded-lg text-sm"
                        value={ach.category}
                        onChange={(e) => {
                          const newAch = [...formData.achievements];
                          newAch[idx].category = e.target.value;
                          setFormData({ ...formData, achievements: newAch });
                        }}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Description</label>
                      <textarea 
                        className="w-full glass p-2 rounded-lg text-sm resize-none h-20"
                        value={ach.description}
                        onChange={(e) => {
                          const newAch = [...formData.achievements];
                          newAch[idx].description = e.target.value;
                          setFormData({ ...formData, achievements: newAch });
                        }}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const newAch = [...formData.achievements];
                      newAch.splice(idx, 1);
                      setFormData({ ...formData, achievements: newAch });
                    }}
                    className="absolute top-4 right-4 text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </Card>
              ))}
              <Button 
                variant="outline" 
                className="w-full border-dashed"
                onClick={() => {
                  const newId = Math.max(0, ...formData.achievements.map(a => a.id)) + 1;
                  setFormData({
                    ...formData,
                    achievements: [...formData.achievements, {
                      id: newId,
                      title: 'New Milestone',
                      date: '2026',
                      category: 'Recognition',
                      description: 'Milestone description...',
                      quote: '',
                      stats: []
                    }]
                  });
                }}
              >
                <Plus size={16} className="mr-2" /> Add Achievement Milestone
              </Button>
            </div>
          )}

          {activePage === 'Settings' && (
            <Card className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">General Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Portfolio Name</label>
                    <input 
                      type="text" 
                      value={formData.portfolioName} 
                      onChange={(e) => setFormData({...formData, portfolioName: e.target.value})}
                      className="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Role / Title</label>
                    <input 
                      type="text" 
                      value={formData.heroTitle} 
                      onChange={(e) => setFormData({...formData, heroTitle: e.target.value})}
                      className="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Contact Email</label>
                    <input 
                      type="email" 
                      value={formData.contactEmail} 
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                      className="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">GitHub profile URL</label>
                    <input 
                      type="url" 
                      value={formData.githubUrl} 
                      onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                      className="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">LinkedIn profile URL</label>
                    <input 
                      type="url" 
                      value={formData.linkedinUrl} 
                      onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                      className="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-text-muted">Summary/About me</label>
                    <textarea 
                      rows={4}
                      value={formData.aboutText} 
                      onChange={(e) => setFormData({...formData, aboutText: e.target.value})}
                      className="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};
