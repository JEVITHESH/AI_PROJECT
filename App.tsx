
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BackgroundParticles from './components/BackgroundParticles';
import Hero from './components/Hero';
import SafetyGauge from './components/SafetyGauge';
import LoadingReaction from './components/LoadingReaction';
import Vault from './components/Vault';
import AuthModal from './components/AuthModal';
import { Chemical, PredictionResult, HistoryItem, HazardLevel, User } from './types';
import { predictReactivity } from './geminiService';
import { onAuthChange, logout } from './authService';
import { saveHistoryItem, getHistory, deleteHistoryItem } from './historyService';

const COMMON_CHEMICALS = [
  "Acetone", "Ammonia", "Bleach (Sodium Hypochlorite)", "Vinegar (Acetic Acid)",
  "Baking Soda (Sodium Bicarbonate)", "Hydrogen Peroxide", "Ethanol", "Isopropyl Alcohol",
  "Hydrochloric Acid", "Sulfuric Acid", "Sodium Hydroxide", "Glycerin", "Mentos"
];

type View = 'lab' | 'vault';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('lab');
  const [chemicals, setChemicals] = useState<Chemical[]>([{ id: uuidv4(), name: '' }]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        // Logged out — load local guest history
        const savedHistory = localStorage.getItem('chemsafe_history');
        if (savedHistory) {
          try { setHistory(JSON.parse(savedHistory)); } catch { setHistory([]); }
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Load history when user changes
  useEffect(() => {
    if (user) {
      setLoadingHistory(true);
      getHistory(user.id)
        .then((items) => setHistory(items))
        .catch((err) => console.error('Failed to load history:', err))
        .finally(() => setLoadingHistory(false));
    }
  }, [user]);

  // Save guest history to local storage
  useEffect(() => {
    if (!user) {
      localStorage.setItem('chemsafe_history', JSON.stringify(history));
    }
  }, [history, user]);

  const addChemical = () => {
    setChemicals([...chemicals, { id: uuidv4(), name: '' }]);
  };

  const removeChemical = (id: string) => {
    if (chemicals.length > 1) {
      setChemicals(chemicals.filter(c => c.id !== id));
    }
  };

  const updateChemical = (id: string, name: string) => {
    setChemicals(chemicals.map(c => c.id === id ? { ...c, name } : c));
  };

  const handlePredict = async () => {
    const activeNames = chemicals.map(c => c.name.trim()).filter(n => n !== '');
    if (activeNames.length < 1) {
      setError("Please add at least one chemical.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predictReactivity(activeNames);
      setResult(data);

      // Save to Firestore if logged in, or localStorage if guest
      if (user) {
        try {
          const savedItem = await saveHistoryItem(user.id, activeNames, data);
          setHistory(prev => [savedItem, ...prev].slice(0, 50));
        } catch (err) {
          console.error('Failed to save to Firestore:', err);
        }
      } else {
        const newItem: HistoryItem = {
          id: uuidv4(),
          userId: 'guest',
          chemicals: activeNames,
          result: data,
          timestamp: Date.now()
        };
        setHistory(prev => [newItem, ...prev].slice(0, 50));
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistory = async (id: string) => {
    if (user) {
      try {
        await deleteHistoryItem(id);
      } catch (err) {
        console.error('Failed to delete from Firestore:', err);
      }
    }
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setHistory([]);
  };

  const getHazardStyles = (level: HazardLevel) => {
    switch (level) {
      case HazardLevel.LETHAL: return "neon-border-red bg-red-950/20 text-red-400";
      case HazardLevel.DANGER: return "neon-border-red bg-red-900/10 text-red-500";
      case HazardLevel.CAUTION: return "neon-border-blue bg-blue-900/10 text-yellow-500";
      case HazardLevel.SAFE: return "neon-border-green bg-green-900/10 text-green-500";
      default: return "border-slate-700 bg-slate-900/50";
    }
  };

  return (
    <div className="min-h-screen relative font-sans selection:bg-blue-500/30">
      <BackgroundParticles />

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          onLogin={(loggedInUser) => {
            setUser(loggedInUser);
            setShowAuth(false);
          }}
          onClose={() => setShowAuth(false)}
        />
      )}

      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-40 bg-black/10 backdrop-blur-md border-b border-white/5 h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveView('lab')}>
            <span className="text-blue-500 text-xl font-bold tracking-tighter">CS</span>
            <span className="font-semibold text-slate-200 hidden sm:block">ChemiSafe Pro</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveView('lab')}
              className={`px-4 py-1 rounded-lg text-sm font-medium transition-all ${activeView === 'lab' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              Lab Predictor
            </button>
            <button
              onClick={() => setActiveView('vault')}
              className={`px-4 py-1 rounded-lg text-sm font-medium transition-all ${activeView === 'vault' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
            >
              Data Vault
            </button>
          </nav>
        </div>

        {/* Auth Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-300 hidden sm:block">{user.name || user.email}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="px-4 py-1.5 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all text-white"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-24 pt-24">

        {activeView === 'lab' ? (
          <div className="space-y-12 animate-in fade-in duration-500">
            <Hero />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* LEFT: Builder Panel */}
              <div className="lg:col-span-5 space-y-6">
                <div className="glass p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                      <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">🧪</span>
                      Lab Builder
                    </h2>
                    <button
                      onClick={addChemical}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all"
                    >
                      + Add Input
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scroll">
                    {chemicals.map((chem, idx) => (
                      <div key={chem.id} className="relative group">
                        <input
                          list="chemicals-list"
                          type="text"
                          placeholder={`Component ${idx + 1}`}
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 transition-all group-hover:bg-slate-800/50"
                          value={chem.name}
                          onChange={(e) => updateChemical(chem.id, e.target.value)}
                        />
                        {chemicals.length > 1 && (
                          <button
                            onClick={() => removeChemical(chem.id)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <datalist id="chemicals-list">
                    {COMMON_CHEMICALS.map(c => <option key={c} value={c} />)}
                  </datalist>

                  <button
                    disabled={loading}
                    onClick={handlePredict}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? "Computing Interactions..." : "Execute Simulation"}
                  </button>

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-2">
                      <span>⚠️</span> {error}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT: Result Panel */}
              <div className="lg:col-span-7 space-y-6">
                {loading ? (
                  <div className="glass rounded-2xl min-h-[500px] flex items-center justify-center">
                    <LoadingReaction />
                  </div>
                ) : result ? (
                  <div className={`glass p-8 rounded-3xl transition-all ${getHazardStyles(result.hazardLevel)} animate-in zoom-in duration-300`}>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex-shrink-0">
                        <SafetyGauge score={result.safetyScore} />
                      </div>
                      <div className="flex-grow space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/20 uppercase tracking-widest">
                            {result.hazardLevel} Hazard
                          </span>
                          <span className="text-xs text-slate-400 mono">AI Confidence: {(result.confidence * 100).toFixed(1)}%</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white leading-tight">{result.primaryReaction}</h2>
                        <div className="flex flex-wrap gap-2">
                          {result.hazards.map((h, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded bg-black/20 border border-white/10">#{h}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-bold flex items-center gap-2 text-slate-200 uppercase text-xs tracking-wider">
                          <span className="text-orange-400">🚨</span> Critical Warnings
                        </h4>
                        <ul className="space-y-2">
                          {result.warnings.map((w, i) => (
                            <li key={i} className="text-sm bg-black/20 p-3 rounded-xl border border-white/5 text-slate-300">
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold flex items-center gap-2 text-slate-200 uppercase text-xs tracking-wider">
                          <span className="text-emerald-400">💡</span> Intelligent Alternatives
                        </h4>
                        <ul className="space-y-2">
                          {result.alternatives.map((alt, i) => (
                            <li key={i} className="text-sm bg-black/20 p-3 rounded-xl border border-white/5 text-slate-300">
                              {alt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 p-6 bg-black/20 rounded-2xl border border-white/5 space-y-3">
                      <h4 className="font-bold text-slate-200 text-xs uppercase tracking-widest">Model Synthesis Explanation</h4>
                      <p className="text-sm leading-relaxed text-slate-300 italic">
                        "{result.explanation}"
                      </p>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`Lab Report:\nReaction: ${result.primaryReaction}\nSafety: ${result.safetyScore}%`);
                        }}
                        className="text-xs px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 text-slate-300"
                      >
                        Copy Report
                      </button>
                      <button
                        onClick={() => setActiveView('vault')}
                        className="text-xs px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-all border border-blue-500/20 text-blue-400"
                      >
                        View In Vault
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="glass rounded-2xl min-h-[500px] border-dashed border-slate-700 flex flex-col items-center justify-center p-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-3xl opacity-50">
                      🥽
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-400">Simulator Idle</h3>
                      <p className="text-slate-500 max-w-sm mt-2">
                        Provide a chemical composition on the left to initialize the predictive engine.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Vault
            history={history}
            onSelectItem={(item) => { setResult(item.result); setActiveView('lab'); }}
            onDeleteItem={handleDeleteHistory}
          />
        )}
      </main>

      <footer className="fixed bottom-0 w-full glass py-4 px-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2 z-30">
        <div>&copy; 2025 ChemiSafe Pro. Advanced Molecular Intelligence.</div>
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${user ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}></span>
            {user ? user.name || user.email : 'Guest Session'}
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">Lab Protocols</span>
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Shield</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
