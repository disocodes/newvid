import React from 'react';
import BaseWidget from '../BaseWidget';
import { Lock, AlertTriangle } from 'lucide-react';

export default function RestrictedAccessWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Restricted Access" type="restricted-access">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">15</span>
          </div>
          <span className="text-red-500 text-sm font-medium">Unauthorized Access</span>
        </div>

        <div className="space-y-2">
          {[
            { area: 'Surgery Wing', time: '10:45 AM', severity: 'high' },
            { area: 'Pharmacy', time: '09:30 AM', severity: 'medium' },
            { area: 'Records Room', time: '08:15 AM', severity: 'low' },
          ].map((access) => (
            <div key={access.area} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{access.area}</span>
                <span className="text-xs text-gray-500">{access.time}</span>
              </div>
              <AlertTriangle className={`w-4 h-4 ${
                access.severity === 'high' ? 'text-red-500' :
                access.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}