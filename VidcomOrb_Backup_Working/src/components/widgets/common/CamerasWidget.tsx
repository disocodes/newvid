import React from 'react';
import BaseWidget from '../BaseWidget';
import { Camera, Wifi, WifiOff } from 'lucide-react';

interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  lastUpdate: string;
}

interface CamerasWidgetProps {
  id: string;
  cameras: Camera[];
}

export default function CamerasWidget({ id, cameras }: CamerasWidgetProps) {
  const onlineCameras = cameras.filter(cam => cam.status === 'online').length;

  return (
    <BaseWidget id={id} title="Connected Cameras" type="cameras">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">{cameras.length}</span>
          </div>
          <span className="text-sm font-medium text-blue-500">
            {onlineCameras} Online
          </span>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {cameras.map((camera) => (
            <div key={camera.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{camera.name}</span>
                <span className="text-xs text-gray-500">{camera.location}</span>
              </div>
              <div className="flex items-center gap-2">
                {camera.status === 'online' ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                <span className="text-xs text-gray-500">{camera.lastUpdate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}