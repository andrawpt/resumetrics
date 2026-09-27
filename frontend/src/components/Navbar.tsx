import React from 'react';
import { Sparkles, Cpu } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 mt-4 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-md">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-normal tracking-tight text-white leading-tight">
            Resume AI <span className="text-zinc-400">Strategist</span>
          </h1>
          <p className="text-xs font-normal text-zinc-400">ATS Reality Check & Career Roadmapper</p>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-normal text-zinc-300">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        <Cpu className="w-4 h-4 text-zinc-400" />
        <span>Ollama Qwen 2.5 Active</span>
      </div>
    </header>
  );
};

