import React from 'react';
import BaseWidget from '../BaseWidget';
import { AlertTriangle, Gauge } from 'lucide-react';

export default function SpeedViolationWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Speed Violations" type="speed-violation">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">23</span>
          </div>
          <span className="text-red-500 text-sm font-medium">+15% from last hour</span>
        </div>
        
        <div className="space-y-2">
          {[
            { location: 'School Zone', speed: '45mph', limit: '25mph' },
            { location: 'Highway 101', speed: '95mph', limit: '70mph' },
            { location: 'Residential', speed: '40mph', limit: '30mph' },
          ].map((violation) => (
            <div key={violation.location} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm text-gray-600">{violation.location}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-red-500">{violation.speed}</span>
                <span className="text-xs text-gray-500">limit: {violation.limit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}