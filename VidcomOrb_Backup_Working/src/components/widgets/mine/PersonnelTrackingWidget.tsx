import React from 'react';
import BaseWidget from '../BaseWidget';
import { Users, Clock } from 'lucide-react';

export default function PersonnelTrackingWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Personnel Tracking" type="personnel-tracking">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">145</span>
          </div>
          <span className="text-blue-500 text-sm font-medium">Active Workers</span>
        </div>

        <div className="space-y-2">
          {[
            { area: 'Main Pit', workers: 45, shift: 'A' },
            { area: 'Processing', workers: 32, shift: 'B' },
            { area: 'Maintenance', workers: 28, shift: 'A' },
          ].map((area) => (
            <div key={area.area} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{area.area}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{area.workers}</span>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                  Shift {area.shift}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}