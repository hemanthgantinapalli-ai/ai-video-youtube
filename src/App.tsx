/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppStep, VideoFileDetails, ProcessingStepItem, SubmissionHistoryItem } from './types';
import { formatBytes } from './lib/formatUtils';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VideoUploader } from './components/VideoUploader';
import { NotesInput } from './components/NotesInput';
import { PublishButton } from './components/PublishButton';
import { ProcessingStatus } from './components/ProcessingStatus';
import { SuccessScreen } from './components/SuccessScreen';
import { ErrorScreen } from './components/ErrorScreen';
import { RecentHistory } from './components/RecentHistory';
import { DashboardOverview } from './components/DashboardOverview';
import { Sparkles, CheckCircle2, FileVideo } from 'lucide-react';

const N8N_ENDPOINT = 'https://chinnuhemanth.app.n8n.cloud/form/b481fc92-3599-456e-9b8d-f313c62ee8be';

const INITIAL_PROCESSING_STEPS: ProcessingStepItem[] = [
  { id: '1', label: 'Video uploaded', status: 'in_progress' },
  { id: '2', label: 'AI is analyzing your video', status: 'pending' },
  { id: '3', label: 'Generating YouTube metadata', status: 'pending' },
  { id: '4', label: 'Publishing to YouTube', status: 'pending' },
  { id: '5', label: 'Saving video information', status: 'pending' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'upload' | 'history' | 'dashboard'>('upload');
  const [videoDetails, setVideoDetails] = useState<VideoFileDetails | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<AppStep>('upload');
  const [processingSteps, setProcessingSteps] = useState<ProcessingStepItem[]>(INITIAL_PROCESSING_STEPS);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [responseSummary, setResponseSummary] = useState<string | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string | undefined>(undefined);
  
  // History state synced with LocalStorage
  const [history, setHistory] = useState<SubmissionHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('ai_publisher_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ai_publisher_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save history to localStorage', e);
    }
  }, [history]);

  // Handle video selection
  const handleVideoSelect = (file: File) => {
    if (videoDetails?.objectUrl) {
      URL.revokeObjectURL(videoDetails.objectUrl);
    }
    const objectUrl = URL.createObjectURL(file);
    setVideoDetails({
      file,
      name: file.name,
      sizeFormatted: formatBytes(file.size),
      objectUrl,
    });
  };

  const handleRemoveVideo = () => {
    if (videoDetails?.objectUrl) {
      URL.revokeObjectURL(videoDetails.objectUrl);
    }
    setVideoDetails(null);
  };

  const handleChangeVideo = () => {
    // Kept handled inside VideoUploader component trigger
  };

  // Extract youtube URL from response string or object
  const findYoutubeUrl = (text: string): string | undefined => {
    const match = text.match(/https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]+/i);
    return match ? match[0] : undefined;
  };

  // Main Submit handler to n8n production endpoint
  const handlePublish = async () => {
    if (!videoDetails) return;

    setCurrentStep('processing');
    setProcessingSteps(INITIAL_PROCESSING_STEPS);
    setErrorMessage(null);
    setResponseSummary(null);
    setYoutubeUrl(undefined);

    // Step 1 animation
    await new Promise((r) => setTimeout(r, 600));
    setProcessingSteps((prev) =>
      prev.map((s) =>
        s.id === '1' ? { ...s, status: 'completed' } : s.id === '2' ? { ...s, status: 'in_progress' } : s
      )
    );

    // Step 2 animation timer
    const step2Timer = setTimeout(() => {
      setProcessingSteps((prev) =>
        prev.map((s) =>
          s.id === '2' ? { ...s, status: 'completed' } : s.id === '3' ? { ...s, status: 'in_progress' } : s
        )
      );
    }, 2000);

    // Step 3 animation timer
    const step3Timer = setTimeout(() => {
      setProcessingSteps((prev) =>
        prev.map((s) =>
          s.id === '3' ? { ...s, status: 'completed' } : s.id === '4' ? { ...s, status: 'in_progress' } : s
        )
      );
    }, 4500);

    // Step 4 animation timer
    const step4Timer = setTimeout(() => {
      setProcessingSteps((prev) =>
        prev.map((s) =>
          s.id === '4' ? { ...s, status: 'completed' } : s.id === '5' ? { ...s, status: 'in_progress' } : s
        )
      );
    }, 7000);

    try {
      const formData = new FormData();
      formData.append('Video file', videoDetails.file);
      formData.append('Notes', notes);

      const response = await fetch(N8N_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(step4Timer);

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: Failed to submit video to workflow.`);
      }

      const resText = await response.text();
      let extractedUrl = findYoutubeUrl(resText);

      // Attempt parsing JSON if available
      try {
        const jsonRes = JSON.parse(resText);
        if (jsonRes.youtubeUrl || jsonRes.url || jsonRes.link) {
          extractedUrl = jsonRes.youtubeUrl || jsonRes.url || jsonRes.link;
        }
      } catch {
        // Response is HTML or plain text, which is normal for n8n form submission
      }

      setYoutubeUrl(extractedUrl);
      setResponseSummary(resText.length > 200 ? `${resText.substring(0, 200)}...` : resText || 'Successfully received by n8n workflow.');

      // Complete all steps
      setProcessingSteps((prev) => prev.map((s) => ({ ...s, status: 'completed' })));

      // Add to history
      const newHistoryItem: SubmissionHistoryItem = {
        id: Date.now().toString(),
        fileName: videoDetails.name,
        fileSize: videoDetails.sizeFormatted,
        notes,
        submittedAt: new Date().toISOString(),
        youtubeUrl: extractedUrl,
        status: 'success',
      };
      setHistory((prev) => [newHistoryItem, ...prev]);

      await new Promise((r) => setTimeout(r, 600));
      setCurrentStep('success');
    } catch (err: any) {
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(step4Timer);

      console.error('Submission error:', err);
      const safeErrorMsg = err?.message || 'Failed to complete video submission to n8n.';
      setErrorMessage(safeErrorMsg);

      // Log failed item in history
      const failedHistoryItem: SubmissionHistoryItem = {
        id: Date.now().toString(),
        fileName: videoDetails.name,
        fileSize: videoDetails.sizeFormatted,
        notes,
        submittedAt: new Date().toISOString(),
        status: 'failed',
      };
      setHistory((prev) => [failedHistoryItem, ...prev]);

      setCurrentStep('error');
    }
  };

  const handleResetForm = () => {
    if (videoDetails?.objectUrl) {
      URL.revokeObjectURL(videoDetails.objectUrl);
    }
    setVideoDetails(null);
    setNotes('');
    setCurrentStep('upload');
    setErrorMessage(null);
  };

  const handleTryAgain = () => {
    setCurrentStep('upload');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background radial glow decorations */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-float" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-float" style={{ animationDelay: '4s' }} />

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'history' && (
          <RecentHistory
            history={history}
            onClearHistory={() => setHistory([])}
            onSelectNewUpload={() => setActiveTab('upload')}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardOverview
            onStartUpload={() => setActiveTab('upload')}
            historyCount={history.length}
          />
        )}

        {activeTab === 'upload' && (
          <div className="space-y-8">
            {/* Hero Banner */}
            <Hero />

            {/* Content view depending on step state */}
            {currentStep === 'processing' && (
              <ProcessingStatus steps={processingSteps} videoName={videoDetails?.name} />
            )}

            {currentStep === 'success' && (
              <SuccessScreen
                youtubeUrl={youtubeUrl}
                fileName={videoDetails?.name}
                notes={notes}
                responseSummary={responseSummary || undefined}
                onUploadAnother={handleResetForm}
              />
            )}

            {currentStep === 'error' && (
              <ErrorScreen
                errorMessage={errorMessage || undefined}
                onTryAgain={handleTryAgain}
                onChooseAnother={handleResetForm}
              />
            )}

            {currentStep === 'upload' && (
              <div className="max-w-3xl mx-auto glass-card rounded-[24px] p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8">
                {/* Upload Section Header */}
                <div className="border-b border-white/10 pb-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">📹</span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      Upload Today's Video
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Select a video and add optional instructions before publishing.
                  </p>
                </div>

                {/* Drag and Drop / Video Preview */}
                <VideoUploader
                  videoDetails={videoDetails}
                  onVideoSelect={handleVideoSelect}
                  onChangeVideo={handleChangeVideo}
                  onRemoveVideo={handleRemoveVideo}
                />

                {/* Video Notes Input */}
                <NotesInput notes={notes} setNotes={setNotes} />

                {/* Publish CTA Button */}
                <PublishButton
                  isDisabled={!videoDetails}
                  isPublishing={false}
                  onClick={handlePublish}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 px-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>AI Video Publisher • Frontend Client</span>
          </div>
          <p>
            Connected to <span className="text-slate-400">chinnuhemanth.app.n8n.cloud</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
