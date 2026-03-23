
import React from 'react';

const LoadingReaction: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <div className="relative w-24 h-32">
        {/* Beaker Body */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-24 border-2 border-blue-400 rounded-b-xl rounded-t-sm overflow-hidden bg-blue-900/20">
          <div className="absolute bottom-0 w-full h-1/2 bg-blue-500/40 animate-pulse"></div>
          {/* Bubbles */}
          <div className="absolute bottom-2 left-4 w-2 h-2 bg-blue-200/60 rounded-full animate-bubble-1"></div>
          <div className="absolute bottom-4 left-10 w-3 h-3 bg-blue-200/60 rounded-full animate-bubble-2"></div>
          <div className="absolute bottom-6 left-14 w-1.5 h-1.5 bg-blue-200/60 rounded-full animate-bubble-3"></div>
        </div>
        {/* Steam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-8 space-x-1 flex justify-center">
            <div className="w-1 h-full bg-slate-500/20 rounded-full animate-steam-1"></div>
            <div className="w-1 h-full bg-slate-500/20 rounded-full animate-steam-2"></div>
            <div className="w-1 h-full bg-slate-500/20 rounded-full animate-steam-3"></div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-blue-400">Synthesizing Data...</h3>
        <p className="text-sm text-slate-500 italic">Simulating molecular interactions and safety protocols</p>
      </div>
      <style>{`
        @keyframes bubble-1 {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-40px) scale(0.5); opacity: 0; }
        }
        @keyframes bubble-2 {
          0% { transform: translateY(0) scale(1.2); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-50px) scale(0.6); opacity: 0; }
        }
        @keyframes bubble-3 {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-35px) scale(0.4); opacity: 0; }
        }
        .animate-bubble-1 { animation: bubble-1 2s infinite ease-in; }
        .animate-bubble-2 { animation: bubble-2 2.5s infinite ease-in; animation-delay: 0.5s; }
        .animate-bubble-3 { animation: bubble-3 1.8s infinite ease-in; animation-delay: 1s; }
        
        @keyframes steam {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        .animate-steam-1 { animation: steam 2s infinite linear; }
        .animate-steam-2 { animation: steam 2s infinite linear; animation-delay: 0.7s; }
        .animate-steam-3 { animation: steam 2s infinite linear; animation-delay: 1.4s; }
      `}</style>
    </div>
  );
};

export default LoadingReaction;
