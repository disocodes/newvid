import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

interface CameraNodeProps {
  data: {
    label: string;
    config: {
      deviceId: string;
      networkUrl?: string;
      useWebcam: boolean;
    };
    onConfigChange: (config: any) => void;
  };
}

export default function CameraNode({ data }: CameraNodeProps) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Get available video devices
    navigator.mediaDevices.enumerateDevices()
      .then(devices => setDevices(devices.filter(d => d.kind === 'videoinput')))
      .catch(err => setError("Failed to enumerate devices: " + err.message));
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }

        if (data.config.useWebcam) {
          const newStream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: data.config.deviceId ? { exact: data.config.deviceId } : undefined
            }
          });
          setStream(newStream);
          if (videoRef.current) {
            videoRef.current.srcObject = newStream;
          }
        } else if (data.config.networkUrl) {
          // For network cameras, we'll use the backend proxy
          // The video element source will be set to the backend stream endpoint
          if (videoRef.current) {
            videoRef.current.src = `/api/camera/stream?url=${encodeURIComponent(data.config.networkUrl)}`;
          }
        }
      } catch (err: any) {
        setError("Failed to start camera: " + err.message);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [data.config.deviceId, data.config.networkUrl, data.config.useWebcam]);

  // Frame capture for downstream processing
  useEffect(() => {
    const captureFrame = () => {
      if (videoRef.current && canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const context = canvasRef.current.getContext('2d');
        if (context) {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
          context.drawImage(videoRef.current, 0, 0);
          // You can add frame processing here if needed
        }
      }
      requestAnimationFrame(captureFrame);
    };

    captureFrame();
  }, []);

  return (
    <div className="camera-node" style={{ 
      background: '#ffffff',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px'
    }}>
      <Handle type="source" position={Position.Right} />
      
      <div style={{ marginBottom: '10px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>{data.label}</h4>
        
        <select
          value={data.config.useWebcam ? "webcam" : "network"}
          onChange={(e) => {
            data.onConfigChange({
              ...data.config,
              useWebcam: e.target.value === "webcam"
            });
          }}
          style={{ marginBottom: '10px', width: '100%' }}
        >
          <option value="webcam">Webcam</option>
          <option value="network">Network Camera</option>
        </select>

        {data.config.useWebcam ? (
          <select
            value={data.config.deviceId}
            onChange={(e) => {
              data.onConfigChange({
                ...data.config,
                deviceId: e.target.value
              });
            }}
            style={{ width: '100%' }}
          >
            <option value="">Select Camera</option>
            {devices.map(device => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={data.config.networkUrl || ''}
            onChange={(e) => {
              data.onConfigChange({
                ...data.config,
                networkUrl: e.target.value
              });
            }}
            placeholder="rtsp:// or http:// camera URL"
            style={{ width: '100%' }}
          />
        )}
      </div>

      {error && (
        <div style={{ 
          color: 'red',
          marginBottom: '10px',
          fontSize: '12px'
        }}>
          {error}
        </div>
      )}

      <div style={{ position: 'relative', width: '320px', height: '240px' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '4px'
          }}
        />
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}
