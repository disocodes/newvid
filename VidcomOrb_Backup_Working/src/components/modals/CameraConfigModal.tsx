import React, { useEffect, useState } from 'react';

interface CameraDevice {
  deviceId: string;
  label: string;
}

interface CameraConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: { deviceId?: string; streamUrl?: string }) => void;
}

const CameraConfigModal: React.FC<CameraConfigModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [selectedType, setSelectedType] = useState<'webcam' | 'stream'>('webcam');
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [streamUrl, setStreamUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices
          .filter(device => device.kind === 'videoinput')
          .map(device => ({
            deviceId: device.deviceId,
            label: device.label || `Camera ${device.deviceId.slice(0, 8)}...`
          }));
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDevice(videoDevices[0].deviceId);
        }
      } catch (err) {
        setError('Failed to load camera devices');
        console.error(err);
      }
    };

    if (isOpen) {
      loadDevices();
    }
  }, [isOpen]);

  const handleSave = () => {
    if (selectedType === 'webcam') {
      onSave({ deviceId: selectedDevice });
    } else {
      onSave({ streamUrl });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Camera Configuration</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Camera Type</label>
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded ${
                selectedType === 'webcam'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setSelectedType('webcam')}
            >
              Webcam
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedType === 'stream'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setSelectedType('stream')}
            >
              IP Camera
            </button>
          </div>
        </div>

        {selectedType === 'webcam' ? (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Camera</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Stream URL</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="rtsp:// or http://"
              value={streamUrl}
              onChange={(e) => setStreamUrl(e.target.value)}
            />
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraConfigModal;
