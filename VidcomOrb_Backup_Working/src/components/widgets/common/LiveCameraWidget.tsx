import React, { useState } from 'react';
import BaseWidget from '../BaseWidget';
import { Camera, Maximize2, RefreshCw, MessageSquare } from 'lucide-react';
import PromptInput from '../../PromptInput';
import PromptHistory from '../../PromptHistory';
import { useVision } from '../../../context/VisionContext';

interface LiveCameraWidgetProps {
  id: string;
  data?: {
    cameraId?: string;
    location?: string;
  };
}

export default function LiveCameraWidget({ id, data }: LiveCameraWidgetProps) {
  const { processPrompt } = useVision();
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Array<{
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>>([]);

  const cameraId = data?.cameraId || 'CAM-001';
  const location = data?.location || 'Main Entrance';

  const handlePrompt = async (prompt: string) => {
    setIsProcessing(true);
    
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: new Date()
    }]);

    try {
      const response = await processPrompt(prompt, id, cameraId);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error processing prompt:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <BaseWidget id={id} title="Live Camera Feed" type="live-camera">
      <div className="space-y-4">
        <div className="relative">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <img 
              src={`https://images.unsplash.com/photo-1693519357858-0a3d2a3ee9b1?auto=format&fit=crop&w=800&q=80`}
              alt="Live Feed"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Live
            </div>
            <button className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">{location}</span>
          </div>
          <span className="text-xs text-gray-500">Camera ID: {cameraId}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Status', value: 'Online', color: 'text-green-500' },
            { label: 'Quality', value: '1080p', color: 'text-blue-500' },
            { label: 'FPS', value: '30', color: 'text-purple-500' },
            { label: 'Latency', value: '45ms', color: 'text-orange-500' }
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-50 p-2 rounded">
              <span className="text-xs text-gray-500 block">{stat.label}</span>
              <span className={`text-sm font-medium ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Vision Prompts</span>
          </div>
          
          <div className="space-y-4">
            <PromptHistory messages={messages} />
            <PromptInput onSubmit={handlePrompt} isProcessing={isProcessing} />
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}