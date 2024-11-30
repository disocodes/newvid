import React from 'react';
import BaseWidget from '../BaseWidget';
import { MapPin, AlertTriangle } from 'lucide-react';

export default function ZoneMonitoringWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Zone Monitoring" type="zone-monitoring">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-500" />
            <span className="text-2xl font-bold text-gray-900">6</span>
          </div>
          <span className="text-purple-500 text-sm font-medium">Active Zones</span>
        </div>

        <div className="space-y-2">
          {[
            { zone: 'Blast Area', status: 'Restricted', personnel: 0 },
            { zone: 'Pit Edge', status: 'Warning', personnel: 5 },
            { zone: 'Processing', status: 'Active', personnel: 12 },
          ].map((zone) => (
            <div key={zone.zone} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{zone.zone}</span>
                <span className="text-xs text-gray-500">{zone.personnel} present</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                zone.status === 'Restricted' ? 'bg-red-100 text-red-600' :
                zone.status === 'Warning' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              }`}>
                {zone.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}