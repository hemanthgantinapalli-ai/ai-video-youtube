import React from 'react';
import { FileText, Sparkles, Plus } from 'lucide-react';

interface NotesInputProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const EXAMPLE_NOTES = [
  'Create an engaging YouTube title',
  'Focus on futuristic technology',
  'Make the description SEO friendly',
  'This is an AI-generated short video',
];

export const NotesInput: React.FC<NotesInputProps> = ({ notes, setNotes }) => {
  const handleChipClick = (example: string) => {
    if (!notes.trim()) {
      setNotes(example);
    } else if (!notes.includes(example)) {
      setNotes(`${notes}\n• ${example}`);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor="video-notes-input" className="flex items-center gap-2 text-sm font-bold text-white">
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>Video Notes</span>
          <span className="text-xs font-normal text-slate-400 font-mono">(Optional)</span>
        </label>
        <span className="text-[11px] text-slate-400 font-mono">
          {notes.length} chars
        </span>
      </div>

      <div className="relative">
        <textarea
          id="video-notes-input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add instructions or context about your video..."
          rows={4}
          className="w-full rounded-2xl glass-input p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all duration-200 resize-y min-h-[110px]"
        />
      </div>

      {/* Quick Example Chips */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Suggested Instructions:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_NOTES.map((example, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(example)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/[0.03] hover:bg-indigo-500/10 hover:text-indigo-200 border border-white/10 hover:border-indigo-500/30 px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-95 text-left"
            >
              <Plus className="w-3 h-3 text-indigo-400 shrink-0" />
              <span>{example}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
