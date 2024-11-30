export const CAMERA_RESOLUTIONS = ['720p', '1080p', '4K'] as const;
export const FPS_OPTIONS = [15, 24, 30, 60] as const;

export const MODULE_TYPES = {
  TRAFFIC: 'traffic',
  HOSPITAL: 'hospital',
  MINE: 'mine',
  SCHOOL: 'school',
} as const;

export const WIDGET_TYPES = {
  LIVE_CAMERA: 'live-camera',
  METRICS: 'workspace-metrics',
  MODEL_PERFORMANCE: 'model-performance',
  PROCESSING_QUEUE: 'processing-queue',
  STORAGE_USAGE: 'storage-usage',
  SYSTEM_ALERTS: 'system-alerts',
} as const;