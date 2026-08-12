import React, { useState, useRef } from 'react';
import { VideoFileDetails } from '../types';
import { VideoPreview } from './VideoPreview';
import { Upload, Film, AlertCircle } from 'lucide-react';

interface VideoUploaderProps {
  videoDetails: VideoFileDetails | null;
  onVideoSelect: (file: File) => void;
  onChangeVideo: () => void;
  onRemoveVideo: () => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  videoDetails,
  onVideoSelect,
  onChangeVideo,
  onRemoveVideo,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Validate video file
    if (!file.type.startsWith('video/') && !/\.(mp4|mov|webm|avi|mkv)$/i.test(file.name)) {
      setErrorMsg('Please select a valid video file (MP4, MOV, WEBM, AVI, MKV).');
      return;
    }

    setErrorMsg(null);
    onVideoSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  if (videoDetails) {
    return (
      <VideoPreview
        videoDetails={videoDetails}
        onChangeVideo={() => {
          onChangeVideo();
          setTimeout(() => fileInputRef.current?.click(), 100);
        }}
        onRemoveVideo={onRemoveVideo}
      />
    );
  }

  return (
    <div className="w-full space-y-3">
      {/* Drag & Drop Card */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer rounded-[20px] p-8 sm:p-12 text-center transition-all duration-300 border-2 border-dashed flex flex-col items-center justify-center min-h-[260px] ${
          isDragging
            ? 'border-indigo-400 bg-indigo-500/10 scale-[1.01] shadow-xl shadow-indigo-500/20'
            : 'border-white/15 bg-white/[0.02] hover:bg-white/[0.04] hover:border-indigo-500/40 shadow-inner'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          accept="video/*,.mp4,.mov,.webm,.avi,.mkv"
          className="hidden"
        />

        {/* Video Camera Icon */}
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600/30 via-indigo-500/20 to-purple-500/30 border border-indigo-400/30 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/10 group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
            🎥
          </div>
          <div className="absolute -bottom-1 -right-1 bg-indigo-600 rounded-full p-1 border border-black text-white">
            <Upload className="w-3 h-3" />
          </div>
        </div>

        {/* Primary Call to Action */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-indigo-200 transition-colors">
          Drop your video here
        </h3>

        <div className="flex items-center gap-2 my-2 text-xs text-slate-400">
          <span className="w-8 h-[1px] bg-white/10" />
          <span className="uppercase text-[10px] tracking-widest font-semibold text-slate-400">or</span>
          <span className="w-8 h-[1px] bg-white/10" />
        </div>

        {/* Choose Video Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="mt-1 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-600/25 border border-indigo-400/30 transition-all hover:scale-105 active:scale-95"
        >
          Choose Video
        </button>

        {/* Supported formats */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-mono tracking-wide text-slate-400 uppercase bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/5">
          <Film className="w-3.5 h-3.5 text-indigo-400" />
          <span>MP4 • MOV • WEBM • AVI • MKV</span>
        </div>
      </div>

      {/* Error Message if invalid file selected */}
      {errorMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium animate-fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
