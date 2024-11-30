import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import PipelineBuilder from '../components/analytics/PipelineBuilder';
import WidgetBuilder from '../components/analytics/WidgetBuilder';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<'pipelines' | 'widgets'>('pipelines');

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Builder</h1>
          <p className="text-gray-600 mt-1">Create custom analytics pipelines and widgets</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('pipelines')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'pipelines'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Pipelines
        </button>
        <button
          onClick={() => setActiveTab('widgets')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'widgets'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Widgets
        </button>
      </div>

      {activeTab === 'pipelines' ? <PipelineBuilder /> : <WidgetBuilder />}
    </div>
  );
}