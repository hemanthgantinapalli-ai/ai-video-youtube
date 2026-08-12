import React from 'react';
import { SubmissionHistoryItem } from '../types';
import { History, FileVideo, Youtube, CheckCircle2, XCircle, Trash2, ExternalLink } from 'lucide-react';

interface RecentHistoryProps {
  history: SubmissionHistoryItem[];
  onClearHistory: () => void;
  onSelectNewUpload: () => void;
}

export const RecentHistory: React.FC<RecentHistoryProps> = ({
  history,
  onClearHistory,
  onSelectNewUpload,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto glass-card rounded-[24px] p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Publishing History</h2>
            <p className="text-xs text-slate-400">Your recent AI Video Publisher submissions</p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
            <FileVideo className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-300">No published videos yet</p>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Videos you upload and send to your n8n AI workflow will appear here in your session history.
          </p>
          <button
            onClick={onSelectNewUpload}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all"
          >
            Upload Your First Video
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-xl ${
                    item.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {item.status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate" title={item.fileName}>
                      {item.fileName}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {item.fileSize} • {new Date(item.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  item.status === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                  {item.status === 'success' ? 'Published' : 'Failed'}
                </span>
              </div>

              {item.notes && (
                <p className="text-xs text-slate-300 italic bg-white/[0.02] p-2 rounded-lg border border-white/5 line-clamp-2">
                  "{item.notes}"
                </p>
              )}

              {item.youtubeUrl && (
                <div className="pt-1 flex justify-end">
                  <a
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
