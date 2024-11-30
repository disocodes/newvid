import React from 'react';
import BaseWidget from '../BaseWidget';
import { Activity, AlertTriangle } from 'lucide-react';

export default function BehaviorAnalysisWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Behavior Analysis" type="behavior-analysis">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">Normal</span>
          </div>
          <span className="text-green-500 text-sm font-medium">All Clear</span>
        </div>

        <div className="space-y-2">
          {[
            { location: 'Playground', status: 'Active Play', alert: false },
            { location: 'Cafeteria', status: 'Calm', alert: false },
            { location: 'Hallway', status: 'Movement', alert: true },
          ].map((area) => (
            <div key={area.location} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm text-gray-600">{area.location}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{area.status}</span>
                {area.alert && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}