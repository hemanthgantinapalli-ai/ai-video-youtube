import React from 'react';
import { CheckCircle2, Loader2, Circle, Sparkles, Cpu } from 'lucide-react';
import { ProcessingStepItem } from '../types';

interface ProcessingStatusProps {
  steps: ProcessingStepItem[];
  videoName?: string;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ steps, videoName }) => {
  return (
    <div className="w-full max-w-xl mx-auto glass-card rounded-[24px] p-6 sm:p-10 border border-indigo-500/20 shadow-2xl space-y-8 animate-fade-in relative overflow-hidden">
      {/* Background glow behind card */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-indigo-500/20 border border-indigo-500/30 text-indigo-400 shadow-xl shadow-indigo-500/10 mb-1 relative">
          <Cpu className="w-8 h-8 text-indigo-400 animate-pulse" />
          <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1 animate-spin-slow" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          AI is processing your video
        </h2>

        {videoName && (
          <p className="text-xs sm:text-sm text-slate-400 font-mono truncate max-w-md mx-auto bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
            Processing: <span className="text-slate-200 font-semibold">{videoName}</span>
          </p>
        )}
      </div>

      {/* Step Sequence */}
      <div className="space-y-3 relative">
        {/* Connecting vertical line */}
        <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-slate-800/80 -z-1" />

        {steps.map((step) => {
          const isCompleted = step.status === 'completed';
          const isInProgress = step.status === 'in_progress';

          return (
            <div
              key={step.id}
              className={`flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 border ${
                isInProgress
                  ? 'bg-indigo-500/10 border-indigo-500/40 text-white shadow-lg shadow-indigo-500/10'
                  : isCompleted
                  ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-200'
                  : 'bg-white/[0.01] border-white/5 text-slate-500'
              }`}
            >
              {/* Icon Status Indicator */}
              <div className="shrink-0 flex items-center justify-center">
                {isCompleted ? (
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : isInProgress ? (
                  <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-600">
                    <Circle className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* Step Label */}
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-semibold tracking-wide ${
                  isInProgress ? 'text-indigo-200' : isCompleted ? 'text-slate-200' : 'text-slate-500'
                }`}>
                  {step.label}
                </span>
              </div>

              {/* Status Badge */}
              {isInProgress && (
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-full animate-pulse">
                  Working...
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <p className="text-center text-xs text-slate-400 leading-relaxed pt-2">
        Please keep this window open while the AI workflow analyzes and publishes your video to YouTube.
      </p>
    </div>
  );
};
