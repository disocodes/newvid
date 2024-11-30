import React from 'react';
import BaseWidget from '../BaseWidget';
import { Phone, AlertTriangle } from 'lucide-react';

export default function PhoneDetectionWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Phone Detection" type="phone-detection">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">24</span>
          </div>
          <span className="text-red-500 text-sm font-medium">+12% from last hour</span>
        </div>
        
        <div className="space-y-2">
          {[
            { location: 'Main Street', count: 8, severity: 'high' },
            { location: 'Highway 101', count: 12, severity: 'medium' },
            { location: 'Downtown', count: 4, severity: 'low' },
          ].map((item) => (
            <div key={item.location} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm text-gray-600">{item.location}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{item.count}</span>
                <AlertTriangle className={`w-4 h-4 ${
                  item.severity === 'high' ? 'text-red-500' :
                  item.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}