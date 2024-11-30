import React from 'react';
import BaseWidget from '../BaseWidget';
import { Lock, Shield } from 'lucide-react';

export default function AccessControlWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Access Control" type="access-control">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">Secured</span>
          </div>
          <span className="text-blue-500 text-sm font-medium">All Systems Active</span>
        </div>

        <div className="space-y-2">
          {[
            { entry: 'Main Entrance', status: 'Locked', authorized: 45 },
            { entry: 'Side Gate', status: 'Monitored', authorized: 12 },
            { entry: 'Staff Entry', status: 'Restricted', authorized: 8 },
          ].map((point) => (
            <div key={point.entry} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{point.entry}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  point.status === 'Locked' ? 'bg-green-100 text-green-600' :
                  point.status === 'Monitored' ? 'bg-blue-100 text-blue-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {point.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}