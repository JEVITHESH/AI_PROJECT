
import React, { useState } from 'react';
import { HistoryItem, PredictionResult, HazardLevel } from '../types';
import SafetyGauge from './SafetyGauge';

interface VaultProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onDeleteItem: (id: string) => void;
}

const Vault: React.FC<VaultProps> = ({ history, onSelectItem, onDeleteItem }) => {
  const [search, setSearch] = useState('');

  const filteredHistory = history.filter(item =>
    item.chemicals.some(c => c.toLowerCase().includes(search.toLowerCase())) ||
    item.result.primaryReaction.toLowerCase().includes(search.toLowerCase())
  );

  const getHazardColor = (level: HazardLevel) => {
    switch (level) {
      case HazardLevel.LETHAL: return "text-red-500";
      case HazardLevel.DANGER: return "text-red-400";
      case HazardLevel.CAUTION: return "text-yellow-500";
      case HazardLevel.SAFE: return "text-green-500";
      default: return "text-slate-400";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Personal Data Vault</h2>
          <p className="text-slate-400">Manage and review your laboratory simulation history.</p>
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search records..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute right-3 top-2.5 opacity-30">🔍</span>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="glass p-20 rounded-3xl border-dashed border-slate-800 text-center">
          <p className="text-slate-500">No records found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="glass p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group relative cursor-pointer"
              onClick={() => onSelectItem(item)}
            >
              <button
                onClick={(e) => { e.stopPropagation(); onDeleteItem(item.id); }}
                className="absolute top-4 right-4 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>

              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 mono">
                    {new Date(item.timestamp).toLocaleDateString()} • {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className={`text-xs font-bold uppercase tracking-widest ${getHazardColor(item.result.hazardLevel)}`}>
                    {item.result.hazardLevel}
                  </div>
                </div>
                <div className="scale-75 -mr-4 -mt-4">
                  <SafetyGauge score={item.result.safetyScore} />
                </div>
              </div>

              <h4 className="font-bold text-lg text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
                {item.chemicals.join(" + ")}
              </h4>

              <p className="text-sm text-slate-400 line-clamp-2 italic mb-4">
                "{item.result.primaryReaction}"
              </p>

              <div className="flex gap-2">
                {item.result.hazards.slice(0, 2).map((h, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-black/30 text-slate-500 border border-white/5">
                    {h}
                  </span>
                ))}
                {item.result.hazards.length > 2 && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-black/30 text-slate-500 border border-white/5">
                    +{item.result.hazards.length - 2}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vault;
