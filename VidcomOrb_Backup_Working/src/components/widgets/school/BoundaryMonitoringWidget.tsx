import React from 'react';
import BaseWidget from '../BaseWidget';
import { MapPin, AlertTriangle, Shield } from 'lucide-react';

export default function BoundaryMonitoringWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Boundary Monitoring" type="boundary-monitoring">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">4</span>
          </div>
          <span className="text-blue-500 text-sm font-medium">Active Boundaries</span>
        </div>

        <div className="space-y-2">
          {[
            { area: 'School Perimeter', status: 'Secure', alerts: 0 },
            { area: 'Playground Border', status: 'Alert', alerts: 2 },
            { area: 'Sports Field', status: 'Secure', alerts: 0 },
            { area: 'Parking Area', status: 'Warning', alerts: 1 },
          ].map((boundary) => (
            <div key={boundary.area} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{boundary.area}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  boundary.status === 'Secure' ? 'bg-green-100 text-green-600' :
                  boundary.status === 'Warning' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {boundary.status}
                </span>
                {boundary.alerts > 0 && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-red-500">{boundary.alerts}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}
