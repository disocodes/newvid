import React from 'react';
import BaseWidget from '../BaseWidget';
import { LineChart, Users, Clock, Activity } from 'lucide-react';

export default function WorkspaceMetricsWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Workspace Metrics" type="workspace-metrics">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">98%</span>
          </div>
          <span className="text-blue-500 text-sm font-medium">Performance</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Users, label: 'Active Users', value: '24' },
            { icon: Clock, label: 'Uptime', value: '99.9%' },
            { icon: Activity, label: 'CPU Usage', value: '45%' },
            { icon: LineChart, label: 'Memory', value: '3.2GB' }
          ].map((metric, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded">
              <div className="flex items-center gap-2 mb-1">
                <metric.icon className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500">{metric.label}</span>
              </div>
              <span className="text-sm font-semibold">{metric.value}</span>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}