import React from 'react';
import { Sparkles, Zap, ShieldAlert, Layers } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative text-center pt-8 pb-6 px-4 max-w-4xl mx-auto overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-blue-600/10 blur-[90px] rounded-full pointer-events-none -z-10 animate-pulse" />

      {/* AI Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide shadow-inner shadow-indigo-500/10 mb-5 animate-fade-in">
        <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" />
        <span>✦ AI Powered Video Publishing</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
        Upload. Analyze.{' '}
        <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
          Publish.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-slate-400 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
        Upload your video and let your AI workflow prepare and publish it to YouTube.
      </p>

      {/* Mini feature indicators */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Instant n8n Automation</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Gemini Video Analysis</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>YouTube + Google Sheets</span>
        </div>
      </div>
    </section>
  );
};
