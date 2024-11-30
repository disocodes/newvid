import React from 'react';
import BaseWidget from '../BaseWidget';
import { Wind, AlertTriangle } from 'lucide-react';

export default function DustDetectionWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Dust Detection" type="dust-detection">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-900">75 µg/m³</span>
          </div>
          <span className="text-yellow-500 text-sm font-medium">Moderate</span>
        </div>

        <div className="space-y-2">
          {[
            { location: 'Crushing Plant', level: 85, status: 'high' },
            { location: 'Pit Area', level: 65, status: 'medium' },
            { location: 'Storage Area', level: 45, status: 'low' },
          ].map((reading) => (
            <div key={reading.location} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm text-gray-600">{reading.location}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{reading.level} µg/m³</span>
                <AlertTriangle className={`w-4 h-4 ${
                  reading.status === 'high' ? 'text-red-500' :
                  reading.status === 'medium' ? 'text-yellow-500' : 'text-green-500'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}