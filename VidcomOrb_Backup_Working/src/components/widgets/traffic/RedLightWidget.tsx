import React from 'react';
import BaseWidget from '../BaseWidget';
import { StopCircle } from 'lucide-react';

export default function RedLightWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Red Light Violations" type="red-light">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StopCircle className="w-5 h-5 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <span className="text-green-500 text-sm font-medium">-8% from yesterday</span>
        </div>
        
        <div className="space-y-2">
          {[
            { intersection: '5th & Main', time: '10:30 AM', status: 'Processed' },
            { intersection: '3rd & Oak', time: '10:15 AM', status: 'Pending' },
            { intersection: 'Broadway & 1st', time: '9:45 AM', status: 'Processed' },
          ].map((violation) => (
            <div key={violation.intersection} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{violation.intersection}</span>
                <span className="text-xs text-gray-500">{violation.time}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                violation.status === 'Processed' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {violation.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}