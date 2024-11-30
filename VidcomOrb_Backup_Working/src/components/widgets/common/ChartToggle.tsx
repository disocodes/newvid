import React from 'react';
import { BarChart2, LineChart, PieChart } from 'lucide-react';

interface ChartToggleProps {
  activeType: 'line' | 'bar' | 'pie';
  onChange: (type: 'line' | 'bar' | 'pie') => void;
}

export default function ChartToggle({ activeType, onChange }: ChartToggleProps) {
  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => onChange('line')}
        className={`p-1.5 rounded ${
          activeType === 'line' ? 'bg-white shadow' : 'hover:bg-gray-200'
        }`}
      >
        <LineChart className="w-4 h-4 text-gray-600" />
      </button>
      <button
        onClick={() => onChange('bar')}
        className={`p-1.5 rounded ${
          activeType === 'bar' ? 'bg-white shadow' : 'hover:bg-gray-200'
        }`}
      >
        <BarChart2 className="w-4 h-4 text-gray-600" />
      </button>
      <button
        onClick={() => onChange('pie')}
        className={`p-1.5 rounded ${
          activeType === 'pie' ? 'bg-white shadow' : 'hover:bg-gray-200'
        }`}
      >
        <PieChart className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}