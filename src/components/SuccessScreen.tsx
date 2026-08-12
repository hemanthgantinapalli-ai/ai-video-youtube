import React from 'react';
import { ExternalLink, RotateCcw, CheckCircle2, Youtube, Sparkles, Share2 } from 'lucide-react';

interface SuccessScreenProps {
  youtubeUrl?: string;
  fileName?: string;
  notes?: string;
  responseSummary?: string;
  onUploadAnother: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  youtubeUrl,
  fileName,
  notes,
  responseSummary,
  onUploadAnother,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto glass-card rounded-[24px] p-6 sm:p-10 border border-emerald-500/30 shadow-2xl space-y-6 text-center animate-fade-in relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Success Badge Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600/20 via-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-400 shadow-xl shadow-emerald-500/10 mx-auto relative">
        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        <Sparkles className="w-4 h-4 text-emerald-300 absolute -top-1 -right-1 animate-pulse" />
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          🎉 Video Published!
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
          Your video has been successfully processed and published.
        </p>
      </div>

      {/* Video Details Card */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left space-y-2 font-sans">
        {fileName && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Video File:</span>
            <span className="text-slate-200 font-semibold font-mono truncate max-w-[240px]">{fileName}</span>
          </div>
        )}
        {notes && (
          <div className="text-xs border-t border-white/5 pt-2 mt-2">
            <span className="text-slate-400 block mb-0.5 font-medium">Notes attached:</span>
            <span className="text-slate-300 italic line-clamp-2">{notes}</span>
          </div>
        )}
        {responseSummary && (
          <div className="text-xs border-t border-white/5 pt-2 mt-2">
            <span className="text-slate-400 block mb-0.5 font-medium">Workflow Response:</span>
            <span className="text-emerald-300 font-mono text-[11px] block bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
              {responseSummary}
            </span>
          </div>
        )}
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-3 pt-2">
        {youtubeUrl ? (
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-2xl font-bold text-base bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] border border-red-400/30"
          >
            <Youtube className="w-5 h-5 text-white" />
            <span>Watch on YouTube →</span>
            <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
          </a>
        ) : (
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Publish workflow completed & saved to Google Sheets!</span>
          </div>
        )}

        {/* Upload Another Video Button */}
        <button
          type="button"
          onClick={onUploadAnother}
          className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <RotateCcw className="w-4 h-4 text-indigo-400" />
          <span>Upload Another Video</span>
        </button>
      </div>
    </div>
  );
};
