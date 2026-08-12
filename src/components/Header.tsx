import React from 'react';
import { Sparkles, Video, History, LayoutDashboard, Upload, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'upload' | 'history' | 'dashboard';
  setActiveTab: (tab: 'upload' | 'history' | 'dashboard') => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, historyCount }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090a0f]/80 border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('upload')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0d0f17] rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <Video className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              <Sparkles className="w-3 h-3 text-purple-400 absolute top-1 right-1 animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                AI Video Publisher
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Workflow Active
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:block font-medium">
              Automated Gemini & YouTube Pipeline
            </span>
          </div>
        </div>

        {/* Navigation Controls */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'upload'
                ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-600/25 border border-indigo-500/50'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Video</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 relative ${
              activeTab === 'history'
                ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-600/25 border border-indigo-500/50'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <History className="w-4 h-4" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="ml-0.5 bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-600/25 border border-indigo-500/50'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
