import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Camera, CameraOff, Settings } from 'lucide-react';
import CameraConfigModal from '../modals/CameraConfigModal';

interface CameraNodeProps {
  data: {
    label: string;
    deviceId?: string;
    streamUrl?: string;
  };
  id: string;
  selected: boolean;
}

const CameraNode: React.FC<CameraNodeProps> = ({ data, id, selected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        if (data.streamUrl) {
          // Handle RTSP/HTTP stream
          if (videoRef.current) {
            videoRef.current.src = `/api/stream?url=${encodeURIComponent(data.streamUrl)}`;
            await videoRef.current.play();
          }
        } else if (data.deviceId) {
          // Handle webcam
          const constraints: MediaStreamConstraints = {
            video: { deviceId: { exact: data.deviceId } },
            audio: false,
          };

          stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
        setIsStreaming(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to start camera');
        setIsStreaming(false);
      }
    };

    if (data.deviceId || data.streamUrl) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsStreaming(false);
    };
  }, [data.deviceId, data.streamUrl]);

  const handleConfigSave = (config: { deviceId?: string; streamUrl?: string }) => {
    // Update node data through React Flow
    const event = new CustomEvent('updateNodeData', {
      detail: {
        nodeId: id,
        data: {
          ...data,
          ...config
        }
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <div className="relative bg-white rounded-lg shadow-md p-4 min-w-[320px]">
        <Handle type="source" position={Position.Right} className="w-3 h-3" />
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {isStreaming ? (
              <Camera className="w-5 h-5 text-green-500" />
            ) : (
              <CameraOff className="w-5 h-5 text-red-500" />
            )}
            <span className="font-medium">{data.label}</span>
          </div>
          <button
            onClick={() => setIsConfigOpen(true)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Settings className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {(!data.deviceId && !data.streamUrl) ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsConfigOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Configure Camera
              </button>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-50 bg-opacity-90">
              <p className="text-red-500 text-sm text-center px-4">{error}</p>
            </div>
          )}
        </div>
      </div>

      <CameraConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onSave={handleConfigSave}
      />
    </>
  );
};

export default CameraNode;
