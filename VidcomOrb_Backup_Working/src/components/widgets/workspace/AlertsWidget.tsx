import React from 'react';
import BaseWidget from '../BaseWidget';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function AlertsWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="System Alerts" type="system-alerts">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">3</span>
          </div>
          <span className="text-orange-500 text-sm font-medium">Active Alerts</span>
        </div>

        <div className="space-y-2">
          {[
            { message: 'High CPU Usage', type: 'warning', time: '5m ago' },
            { message: 'Model Update Available', type: 'info', time: '15m ago' },
            { message: 'Backup Completed', type: 'success', time: '1h ago' }
          ].map((alert) => (
            <div key={alert.message} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-2">
                {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                {alert.type === 'info' && <Info className="w-4 h-4 text-blue-500" />}
                {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                <span className="text-sm font-medium">{alert.message}</span>
              </div>
              <span className="text-xs text-gray-500">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}