import React from 'react';
import BaseWidget from '../BaseWidget';
import { HardHat, Shield } from 'lucide-react';

export default function SafetyComplianceWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Safety Compliance" type="safety-compliance">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">95%</span>
          </div>
          <span className="text-green-500 text-sm font-medium">+2% from last shift</span>
        </div>

        <div className="space-y-2">
          {[
            { area: 'Pit Area', compliance: 98, workers: 45 },
            { area: 'Processing Plant', compliance: 94, workers: 32 },
            { area: 'Storage Zone', compliance: 92, workers: 28 },
          ].map((zone) => (
            <div key={zone.area} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <HardHat className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">{zone.area}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">{zone.workers} workers</span>
                <span className={`text-sm font-medium ${
                  zone.compliance >= 95 ? 'text-green-500' :
                  zone.compliance >= 90 ? 'text-yellow-500' : 'text-red-500'
                }`}>{zone.compliance}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}