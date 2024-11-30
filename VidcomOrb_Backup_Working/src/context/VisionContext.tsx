import React, { createContext, useContext, useState } from 'react';

interface VisionContextType {
  processPrompt: (prompt: string, moduleId: string, cameraId: string) => Promise<string>;
  cameras: Camera[];
  addCamera: (camera: Camera) => void;
  removeCamera: (id: string) => void;
  updateCamera: (id: string, updates: Partial<Camera>) => void;
}

interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  resolution: '720p' | '1080p' | '4K';
  fps: number;
  lastPing: string;
}

const VisionContext = createContext<VisionContextType | undefined>(undefined);

export function VisionProvider({ children }: { children: React.ReactNode }) {
  const [cameras, setCameras] = useState<Camera[]>([
    { id: 'CAM-001', name: 'Traffic Cam 1', location: 'Main Intersection', status: 'online', resolution: '1080p', fps: 30, lastPing: '2s ago' },
    { id: 'CAM-002', name: 'Hospital Cam 1', location: 'Emergency Ward', status: 'online', resolution: '4K', fps: 60, lastPing: '1s ago' },
    { id: 'CAM-003', name: 'Mine Cam 1', location: 'Main Pit', status: 'offline', resolution: '1080p', fps: 30, lastPing: '5m ago' },
    { id: 'CAM-004', name: 'School Cam 1', location: 'Main Entrance', status: 'online', resolution: '1080p', fps: 30, lastPing: '3s ago' },
  ]);

  const addCamera = (camera: Camera) => {
    setCameras([...cameras, camera]);
  };

  const removeCamera = (id: string) => {
    setCameras(cameras.filter(camera => camera.id !== id));
  };

  const updateCamera = (id: string, updates: Partial<Camera>) => {
    setCameras(cameras.map(camera => 
      camera.id === id ? { ...camera, ...updates } : camera
    ));
  };

  const processPrompt = async (prompt: string, moduleId: string, cameraId: string): Promise<string> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const camera = cameras.find(c => c.id === cameraId);
    if (!camera) {
      throw new Error('Camera not found');
    }

    // Return simulated response based on module type and camera location
    return `Analyzing ${camera.location}: ${prompt}`;
  };

  return (
    <VisionContext.Provider value={{ 
      processPrompt, 
      cameras,
      addCamera,
      removeCamera,
      updateCamera
    }}>
      {children}
    </VisionContext.Provider>
  );
}

export function useVision() {
  const context = useContext(VisionContext);
  if (context === undefined) {
    throw new Error('useVision must be used within a VisionProvider');
  }
  return context;
}