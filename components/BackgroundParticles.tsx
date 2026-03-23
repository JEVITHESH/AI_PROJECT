
import React, { useMemo } from 'react';

const BackgroundParticles: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      cx: Math.random() * 100,
      cy: Math.random() * 100,
      r: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 animate-gradient opacity-30 bg-gradient-to-br from-indigo-950 via-slate-950 to-emerald-950"></div>
      <svg className="w-full h-full opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {particles.map((p) => (
          <circle
            key={p.id}
            cx={`${p.cx}%`}
            cy={`${p.cy}%`}
            r={p.r}
            fill="currentColor"
            className="text-blue-500/30"
            filter="url(#glow)"
            style={{
              opacity: p.opacity,
              animation: `float ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes float {
          0% { transform: translateY(100vh) scale(1); }
          100% { transform: translateY(-10vh) scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default BackgroundParticles;
