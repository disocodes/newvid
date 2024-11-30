import React, { useState } from 'react';
import BaseWidget from '../BaseWidget';
import BaseChart from '../../charts/BaseChart';
import ChartToggle from '../common/ChartToggle';
import { Car } from 'lucide-react';

export default function TrafficFlowWidget({ id }: { id: string }) {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');

  const chartData = {
    labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    datasets: [
      {
        label: 'Vehicles per hour',
        data: [120, 450, 280, 320, 480, 220],
        color: '#3B82F6'
      }
    ]
  };

  return (
    <BaseWidget id={id} title="Traffic Flow" type="traffic-flow">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">Heavy</span>
          </div>
          <ChartToggle activeType={chartType} onChange={setChartType} />
        </div>

        <BaseChart type={chartType} data={chartData} height={200} />
        
        <div className="space-y-2">
          {[
            { route: 'Main Highway', status: 'Heavy', vehicles: 450 },
            { route: 'Downtown', status: 'Medium', vehicles: 280 },
            { route: 'Bridge', status: 'Light', vehicles: 120 },
          ].map((flow) => (
            <div key={flow.route} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm text-gray-600">{flow.route}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  {flow.vehicles}/hr
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}