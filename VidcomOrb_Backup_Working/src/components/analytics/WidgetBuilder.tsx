import React, { useState } from 'react';
import { Plus, Save, Settings2, Layout, BarChart2, PieChart, LineChart } from 'lucide-react';

interface WidgetTemplate {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

export default function WidgetBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: WidgetTemplate[] = [
    {
      id: 'line-chart',
      type: 'chart',
      name: 'Line Chart',
      description: 'Track metrics over time',
      icon: LineChart
    },
    {
      id: 'bar-chart',
      type: 'chart',
      name: 'Bar Chart',
      description: 'Compare values across categories',
      icon: BarChart2
    },
    {
      id: 'pie-chart',
      type: 'chart',
      name: 'Pie Chart',
      description: 'Show data distribution',
      icon: PieChart
    },
    {
      id: 'custom-layout',
      type: 'layout',
      name: 'Custom Layout',
      description: 'Create a custom widget layout',
      icon: Layout
    }
  ];

  const getTemplateIcon = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const IconComponent = template.icon;
      return <IconComponent className="w-12 h-12 text-gray-400" />;
    }
    return null;
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Templates</h3>
          <div className="space-y-2">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedTemplate === template.id
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <template.icon className="w-5 h-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-500">{template.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Widget Preview</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Save className="w-5 h-5" />
              </button>
            </div>
          </div>

          {selectedTemplate ? (
            <div className="border rounded-lg p-4">
              <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
                {getTemplateIcon(selectedTemplate)}
              </div>
            </div>
          ) : (
            <div className="h-[400px] border-2 border-dashed rounded-lg flex items-center justify-center text-gray-500">
              Select a template to start building
            </div>
          )}
        </div>
      </div>
    </div>
  );
}