import React from 'react';
import { Loader2, Rocket, ArrowRight } from 'lucide-react';

interface PublishButtonProps {
  isDisabled: boolean;
  isPublishing: boolean;
  onClick: () => void;
}

export const PublishButton: React.FC<PublishButtonProps> = ({
  isDisabled,
  isPublishing,
  onClick,
}) => {
  return (
    <button
      type="button"
      disabled={isDisabled || isPublishing}
      onClick={onClick}
      className={`relative w-full py-4 px-6 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
        isDisabled || isPublishing
          ? 'bg-slate-800/60 text-slate-500 border border-slate-700/50 cursor-not-allowed shadow-none'
          : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:via-indigo-400 hover:to-purple-500 text-white shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.01] active:scale-[0.99] border border-indigo-400/30'
      }`}
    >
      {isPublishing ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin text-indigo-200" />
          <span className="tracking-wide">Publishing...</span>
        </>
      ) : (
        <>
          <span className="text-xl">🚀</span>
          <span className="tracking-wide">Publish Video</span>
          {!isDisabled && <ArrowRight className="w-5 h-5 ml-1 text-indigo-200 animate-pulse" />}
        </>
      )}
    </button>
  );
};
