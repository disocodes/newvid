import React from 'react';
import BaseWidget from '../BaseWidget';
import { Activity, Heart } from 'lucide-react';

export default function PatientMonitoringWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Patient Monitoring" type="patient-monitoring">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">126</span>
          </div>
          <span className="text-blue-500 text-sm font-medium">Active Monitoring</span>
        </div>

        <div className="space-y-2">
          {[
            { ward: 'ICU', patients: 18, alerts: 2 },
            { ward: 'CCU', patients: 24, alerts: 1 },
            { ward: 'General', patients: 84, alerts: 0 },
          ].map((ward) => (
            <div key={ward.ward} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{ward.ward}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{ward.patients}</span>
                {ward.alerts > 0 && (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                    {ward.alerts} alerts
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}