import React from 'react';
import { AlertTriangle, RefreshCw, Upload, ShieldAlert } from 'lucide-react';

interface ErrorScreenProps {
  errorMessage?: string;
  onTryAgain: () => void;
  onChooseAnother: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  errorMessage,
  onTryAgain,
  onChooseAnother,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto glass-card rounded-[24px] p-6 sm:p-10 border border-rose-500/30 shadow-2xl space-y-6 text-center animate-fade-in relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-40 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Warning Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-600/20 via-rose-500/20 to-amber-500/20 border border-rose-500/40 text-rose-400 shadow-xl shadow-rose-500/10 mx-auto">
        <AlertTriangle className="w-10 h-10 text-rose-400 animate-bounce" />
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Something went wrong
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
          We couldn't complete the video publishing request.
        </p>
      </div>

      {/* Sanitized Error Box */}
      <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-xs text-left font-mono space-y-1">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-rose-400 mb-1">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Error Details</span>
        </div>
        <p className="leading-relaxed">
          {errorMessage || 'Unable to connect to the n8n production workflow endpoint. Please verify your connection or video size and try again.'}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={onTryAgain}
          className="flex-1 py-3.5 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-600/25 border border-indigo-400/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <RefreshCw className="w-4 h-4 text-white" />
          <span>Try Again</span>
        </button>

        <button
          type="button"
          onClick={onChooseAnother}
          className="flex-1 py-3.5 px-5 rounded-2xl font-bold text-sm bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Upload className="w-4 h-4 text-indigo-400" />
          <span>Choose Another Video</span>
        </button>
      </div>
    </div>
  );
};
