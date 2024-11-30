import React, { useState } from 'react';
import BaseWidget from '../BaseWidget';
import BaseChart from '../../charts/BaseChart';
import ChartToggle from '../common/ChartToggle';
import { HardDrive, Database, Film, Image } from 'lucide-react';

export default function StorageUsageWidget({ id }: { id: string }) {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('pie');

  const chartData = {
    labels: ['Video Data', 'Images', 'Models', 'Other'],
    datasets: [
      {
        label: 'Storage Usage',
        data: [650, 350, 200, 100],
        color: '#10B981'
      }
    ]
  };

  return (
    <BaseWidget id={id} title="Storage Usage" type="storage-usage">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-emerald-500" />
            <span className="text-2xl font-bold text-gray-900">1.2TB</span>
          </div>
          <ChartToggle activeType={chartType} onChange={setChartType} />
        </div>

        <BaseChart type={chartType} data={chartData} height={200} />

        <div className="space-y-2">
          {[
            { type: 'Video Data', icon: Film, size: '650GB', percentage: 32.5 },
            { type: 'Images', icon: Image, size: '350GB', percentage: 17.5 },
            { type: 'Models', icon: Database, size: '200GB', percentage: 10 }
          ].map((storage) => (
            <div key={storage.type} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <storage.icon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">{storage.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{storage.size}</span>
                <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${storage.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}