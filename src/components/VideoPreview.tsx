import React from 'react';
import { VideoFileDetails } from '../types';
import { Film, FileVideo, Trash2, RefreshCw, PlayCircle } from 'lucide-react';

interface VideoPreviewProps {
  videoDetails: VideoFileDetails;
  onChangeVideo: () => void;
  onRemoveVideo: () => void;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoDetails,
  onChangeVideo,
  onRemoveVideo,
}) => {
  return (
    <div className="w-full space-y-4 animate-fade-in">
      {/* HTML Video Player Card */}
      <div className="relative rounded-2xl overflow-hidden bg-black/80 border border-white/10 group shadow-2xl">
        <div className="aspect-video w-full flex items-center justify-center bg-slate-950/90 relative">
          <video
            src={videoDetails.objectUrl}
            controls
            preload="metadata"
            className="w-full h-full max-h-[380px] object-contain rounded-xl"
          >
            Your browser does not support HTML5 video preview.
          </video>
        </div>

        {/* Video format overlay badge */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5 shadow-md">
          <Film className="w-3.5 h-3.5 text-indigo-400" />
          <span>{videoDetails.file.type || 'Video file'}</span>
        </div>
      </div>

      {/* Video Details & Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3 overflow-hidden min-w-0 w-full sm:w-auto">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
            <FileVideo className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold text-white truncate" title={videoDetails.name}>
              {videoDetails.name}
            </h4>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Size: <span className="text-slate-200 font-semibold">{videoDetails.sizeFormatted}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
          <button
            type="button"
            onClick={onChangeVideo}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
            <span>Change Video</span>
          </button>

          <button
            type="button"
            onClick={onRemoveVideo}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/30 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};
