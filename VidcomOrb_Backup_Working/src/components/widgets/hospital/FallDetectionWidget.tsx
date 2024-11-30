import React from 'react';
import BaseWidget from '../BaseWidget';
import { UserMinus, Clock } from 'lucide-react';

export default function FallDetectionWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Fall Detection" type="fall-detection">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserMinus className="w-5 h-5 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">2</span>
          </div>
          <span className="text-green-500 text-sm font-medium">-50% from yesterday</span>
        </div>

        <div className="space-y-2">
          {[
            { location: 'Ward A', time: '10 mins ago', status: 'Resolved' },
            { location: 'Emergency', time: '1 hour ago', status: 'Resolved' },
          ].map((incident) => (
            <div key={incident.location} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{incident.location}</span>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{incident.time}</span>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                {incident.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}