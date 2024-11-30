import React from 'react';
import BaseWidget from '../BaseWidget';
import { Users, AlertTriangle } from 'lucide-react';

export default function PlaygroundSafetyWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Playground Safety" type="playground-safety">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">Safe</span>
          </div>
          <span className="text-green-500 text-sm font-medium">Normal Activity</span>
        </div>

        <div className="space-y-2">
          {[
            { zone: 'Main Playground', students: 45, status: 'normal' },
            { zone: 'Sports Field', students: 30, status: 'caution' },
            { zone: 'Equipment Area', students: 15, status: 'normal' },
          ].map((zone) => (
            <div key={zone.zone} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{zone.zone}</span>
                <span className="text-xs text-gray-500">{zone.students} students</span>
              </div>
              {zone.status === 'caution' && (
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}