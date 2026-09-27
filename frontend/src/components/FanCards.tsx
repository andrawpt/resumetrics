import React from 'react';
import { Award, CheckCircle2, TrendingUp, Target, Zap, ShieldCheck } from 'lucide-react';

export const FanCards: React.FC = () => {
  return (
    <div className="relative w-full max-w-md 2xl:max-w-xl mx-auto 2xl:ml-auto py-4 sm:py-6 2xl:py-12 px-2 group select-none scale-85 sm:scale-90 md:scale-95 lg:scale-100 xl:scale-105 2xl:scale-120 3xl:scale-130 2xl:translate-x-6 3xl:translate-x-10 transition-transform origin-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 blur-3xl rounded-full pointer-events-none transition-all duration-500 group-hover:scale-125 group-hover:bg-white/10"></div>

      <div className="relative h-[320px] sm:h-[350px] w-full flex items-center justify-center">
        <div className="absolute w-64 sm:w-72 lg:w-76 transition-all duration-500 ease-out origin-bottom-left rotate-[-12deg] -translate-x-6 sm:-translate-x-8 translate-y-4 group-hover:rotate-[-20deg] group-hover:-translate-x-12 group-hover:translate-y-8">
          <div className="animate-float-card-1 p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 backdrop-blur-xl shadow-2xl group-hover:border-zinc-600 transition-colors duration-500">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-zinc-900 text-white border border-zinc-800">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-[11px] sm:text-xs font-normal text-zinc-400 uppercase tracking-wider">ATS Score</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white text-black text-[11px] sm:text-xs font-normal border border-zinc-200">
                92% Excellent
              </span>
            </div>

            <div className="space-y-1.5 mb-3">
              <div className="text-xs sm:text-sm font-normal text-white">Structure & Formatting</div>
              <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                <div className="bg-white h-full rounded-full w-[92%]"></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 text-[10px] sm:text-[11px]">
              <span className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 flex items-center gap-1">
                <ShieldCheck size={11} className="text-zinc-400" /> Standard Fonts
              </span>
              <span className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">No Tables</span>
              <span className="px-1.5 py-0.5 rounded bg-zinc-900 text-white border border-zinc-700 font-normal">Parse Ready</span>
            </div>
          </div>
        </div>

        <div className="absolute w-64 sm:w-72 lg:w-76 transition-all duration-500 ease-out origin-bottom-center rotate-[-2deg] translate-y-1 z-10 group-hover:rotate-[-4deg] group-hover:-translate-y-3">
          <div className="animate-float-card-2 p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-700 backdrop-blur-xl shadow-2xl group-hover:border-zinc-500 transition-colors duration-500">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-zinc-800 text-white border border-zinc-700">
                  <Target size={16} />
                </div>
                <span className="text-[11px] sm:text-xs font-normal text-zinc-400 uppercase tracking-wider">Role Fit</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-white font-normal bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700">
                <Zap size={12} className="text-white fill-white" /> High Match
              </div>
            </div>

            <div className="text-xs sm:text-sm font-normal text-white mb-1">Senior Fullstack Strategist</div>
            <p className="text-[11px] sm:text-xs text-zinc-400 mb-3 line-clamp-2">
              Quantitative impact metrics found across 4 recent positions.
            </p>

            <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] font-normal text-zinc-400">Est. Target Salary</span>
              <span className="text-[11px] font-normal text-white flex items-center gap-1">
                <TrendingUp size={12} /> +25% Potential
              </span>
            </div>
          </div>
        </div>

        <div className="absolute w-64 sm:w-72 lg:w-76 transition-all duration-500 ease-out origin-bottom-right rotate-[10deg] translate-x-6 sm:translate-x-8 -translate-y-2 z-20 group-hover:rotate-[16deg] group-hover:translate-x-12 group-hover:-translate-y-4">
          <div className="animate-float-card-3 p-4 sm:p-5 rounded-2xl bg-black border border-zinc-800 backdrop-blur-xl shadow-2xl group-hover:border-zinc-600 transition-colors duration-500">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-zinc-900 text-white border border-zinc-800">
                  <Award size={16} />
                </div>
                <span className="text-[11px] sm:text-xs font-normal text-zinc-400 uppercase tracking-wider">AI Recommendation</span>
              </div>
            </div>

            <div className="text-xs sm:text-sm font-normal text-white mb-1.5">Skill Gap Optimizer</div>
            <div className="space-y-1 mb-2.5 text-[11px] sm:text-xs text-zinc-300">
              <div className="flex items-center justify-between">
                <span>System Architecture</span>
                <span className="text-white font-normal">✓ Strong</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cloud Native / K8s</span>
                <span className="text-zinc-400 font-normal">+ Add Keyword</span>
              </div>
            </div>

            <div className="text-[10px] sm:text-[11px] text-zinc-300 bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-800 font-normal flex items-center gap-1.5">
              <Zap size={11} className="shrink-0 text-white" />
              <span>Keyword recommendations updated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
