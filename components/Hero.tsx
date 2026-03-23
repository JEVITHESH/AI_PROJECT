
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "Intelligent Chemical Reactivity Predictor";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-24 pb-16 text-center px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-500/10 blur-[120px] rounded-full"></div>
      <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-500">
        ChemiSafe Pro
      </h1>
      <p className="text-xl md:text-2xl font-medium text-slate-300 mono h-8">
        {text}<span className="animate-pulse">|</span>
      </p>
      <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
        Powered by Gemini 3 Pro. Instantly detect hazardous chemical interactions, safety ratings,
        and receive smart alternatives for your laboratory mixtures.
      </p>
    </section>
  );
};

export default Hero;
