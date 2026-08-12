import React from 'react';
import { Cpu, Youtube, FileSpreadsheet, Zap, CheckCircle2, ShieldCheck, ArrowUpRight, Activity } from 'lucide-react';

interface DashboardOverviewProps {
  onStartUpload: () => void;
  historyCount: number;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onStartUpload,
  historyCount,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Workflow Status</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Online</span>
          </div>
          <p className="text-xs text-slate-400 font-mono">n8n Production Connected</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>AI Model</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            Gemini AI
          </div>
          <p className="text-xs text-slate-400 font-mono">Multimodal Video Analysis</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Session Uploads</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {historyCount} <span className="text-sm font-normal text-slate-400">videos</span>
          </div>
          <p className="text-xs text-slate-400 font-mono">YouTube + Sheets Sync</p>
        </div>
      </div>

      {/* Pipeline Architecture Visualizer Card */}
      <div className="glass-card p-6 sm:p-8 rounded-[24px] border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Automated AI Publishing Pipeline</h3>
            <p className="text-xs text-slate-400">Live integration flow powering your video uploads</p>
          </div>
          <span className="text-xs font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full">
            n8n Cloud Workflow
          </span>
        </div>

        {/* Integration Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-sm font-bold text-white">Video Upload</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receives MP4/MOV files and custom notes via multipart/form-data.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-sm font-bold text-white">Gemini AI Analysis</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyzes video content, generates SEO title, tags, and timestamps.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-sm font-bold text-white">YouTube Publish</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Publishes video directly to YouTube with generated metadata.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h4 className="text-sm font-bold text-white">Google Sheets Sync</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Logs video metadata, upload time, and YouTube URL for tracking.
            </p>
          </div>
        </div>

        {/* Direct Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Endpoint: <code className="text-indigo-300 font-mono text-[11px]">chinnuhemanth.app.n8n.cloud/form/...</code></span>
          </div>

          <button
            onClick={onStartUpload}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <span>Upload New Video</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
