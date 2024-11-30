export interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  resolution: '720p' | '1080p' | '4K';
  fps: number;
  lastPing: string;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Widget {
  id: string;
  type: string;
  title: string;
  data: any;
}

export interface Module {
  id: string;
  title: string;
  widgets: Widget[];
}