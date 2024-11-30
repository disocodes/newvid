import React, { useState } from 'react';
import { Camera, Plus, Settings2, Signal, Wifi, WifiOff } from 'lucide-react';

interface CameraConfig {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  resolution: '720p' | '1080p' | '4K';
  fps: number;
  lastPing: string;
}

export default function Cameras() {
  const [cameras, setCameras] = useState<CameraConfig[]>([
    { id: 'CAM-001', name: 'Traffic Cam 1', location: 'Main Intersection', status: 'online', resolution: '1080p', fps: 30, lastPing: '2s ago' },
    { id: 'CAM-002', name: 'Hospital Cam 1', location: 'Emergency Ward', status: 'online', resolution: '4K', fps: 60, lastPing: '1s ago' },
    { id: 'CAM-003', name: 'Mine Cam 1', location: 'Main Pit', status: 'offline', resolution: '1080p', fps: 30, lastPing: '5m ago' },
    { id: 'CAM-004', name: 'School Cam 1', location: 'Main Entrance', status: 'online', resolution: '1080p', fps: 30, lastPing: '3s ago' },
  ]);

  const [showAddCamera, setShowAddCamera] = useState(false);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Camera className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Camera Management</h1>
            <p className="text-gray-600 mt-1">Configure and monitor your camera network</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddCamera(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Camera
        </button>
      </div>

      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Connected Cameras</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {cameras.filter(c => c.status === 'online').length} Active
              </span>
              <Signal className="w-4 h-4 text-green-500" />
            </div>
          </div>

          <div className="space-y-4">
            {cameras.map((camera) => (
              <div key={camera.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${camera.status === 'online' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {camera.status === 'online' ? (
                      <Wifi className={`w-5 h-5 ${camera.status === 'online' ? 'text-green-600' : 'text-red-600'}`} />
                    ) : (
                      <WifiOff className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{camera.name}</h3>
                    <p className="text-sm text-gray-500">{camera.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <span className="text-sm text-gray-500 block">Resolution</span>
                      <span className="text-sm font-medium">{camera.resolution}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">FPS</span>
                      <span className="text-sm font-medium">{camera.fps}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">Last Ping</span>
                      <span className="text-sm font-medium">{camera.lastPing}</span>
                    </div>
                  </div>

                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                    <Settings2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Network Status</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Bandwidth Usage', value: '45 Mbps', trend: '+5%' },
              { label: 'Average Latency', value: '45ms', trend: '-2ms' },
              { label: 'Packet Loss', value: '0.1%', trend: '0%' },
              { label: 'Storage Used', value: '1.2TB', trend: '+50GB' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-500 block">{stat.label}</span>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-sm text-green-500 block mt-1">{stat.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}