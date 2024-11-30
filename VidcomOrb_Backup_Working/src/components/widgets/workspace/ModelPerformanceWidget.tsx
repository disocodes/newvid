import React, { useState } from 'react';
import BaseWidget from '../BaseWidget';
import BaseChart from '../../charts/BaseChart';
import ChartToggle from '../common/ChartToggle';
import { Brain, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ModelPerformanceWidget({ id }: { id: string }) {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'YOLOv8',
        data: [96.2, 96.5, 96.1, 96.8, 96.3, 96.4, 96.2],
        color: '#3B82F6'
      },
      {
        label: 'YOLO-NAS',
        data: [94.8, 94.9, 94.7, 94.6, 94.8, 94.9, 94.8],
        color: '#10B981'
      }
    ]
  };

  return (
    <BaseWidget id={id} title="Model Performance" type="model-performance">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <span className="text-2xl font-bold text-gray-900">95.8%</span>
          </div>
          <ChartToggle activeType={chartType} onChange={setChartType} />
        </div>

        <BaseChart type={chartType} data={chartData} height={200} />

        <div className="space-y-2">
          {[
            { name: 'YOLOv8', accuracy: 96.2, status: 'optimal' },
            { name: 'YOLO-NAS', accuracy: 94.8, status: 'warning' },
            { name: 'ViT', accuracy: 95.5, status: 'optimal' }
          ].map((model) => (
            <div key={model.name} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">{model.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{model.accuracy}%</span>
                {model.status === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}