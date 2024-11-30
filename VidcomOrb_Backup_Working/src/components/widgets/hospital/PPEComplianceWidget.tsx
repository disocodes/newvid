import React from 'react';
import BaseWidget from '../BaseWidget';
import { Shield, Users } from 'lucide-react';

export default function PPEComplianceWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="PPE Compliance" type="ppe-compliance">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">98%</span>
          </div>
          <span className="text-green-500 text-sm font-medium">+3% from last week</span>
        </div>

        <div className="space-y-2">
          {[
            { area: 'Emergency Ward', compliance: 100, staff: 25 },
            { area: 'ICU', compliance: 98, staff: 15 },
            { area: 'General Ward', compliance: 95, staff: 30 },
          ].map((zone) => (
            <div key={zone.area} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">{zone.area}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{zone.staff} staff</span>
                <span className={`text-sm font-medium ${
                  zone.compliance >= 98 ? 'text-green-500' :
                  zone.compliance >= 95 ? 'text-yellow-500' : 'text-red-500'
                }`}>{zone.compliance}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}