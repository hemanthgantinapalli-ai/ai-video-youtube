export type AppStep = 'upload' | 'processing' | 'success' | 'error';

export interface VideoFileDetails {
  file: File;
  name: string;
  sizeFormatted: string;
  objectUrl: string;
}

export interface ProcessingStepItem {
  id: string;
  label: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface SubmissionHistoryItem {
  id: string;
  fileName: string;
  fileSize: string;
  notes: string;
  submittedAt: string;
  youtubeUrl?: string;
  status: 'success' | 'failed';
}
