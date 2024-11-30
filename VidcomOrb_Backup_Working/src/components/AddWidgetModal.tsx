import React from 'react';
import { X } from 'lucide-react';
import { useModuleContext } from '../context/ModuleContext';

interface AddWidgetModalProps {
  moduleId: string;
  onClose: () => void;
}

const widgetTemplates = {
  workspace: [
    { type: 'workspace-metrics', title: 'Workspace Metrics', description: 'Monitor system performance' },
    { type: 'model-performance', title: 'Model Performance', description: 'Track AI model accuracy' },
    { type: 'processing-queue', title: 'Processing Queue', description: 'Manage processing tasks' },
    { type: 'storage-usage', title: 'Storage Usage', description: 'Monitor storage capacity' },
    { type: 'system-alerts', title: 'System Alerts', description: 'View system notifications' },
    { type: 'live-camera', title: 'Live Camera Feed', description: 'Real-time camera monitoring' }
  ],
  traffic: [
    { type: 'phone-detection', title: 'Phone Detection', description: 'Monitor driver phone usage' },
    { type: 'speed-violation', title: 'Speed Violations', description: 'Track speeding incidents' },
    { type: 'traffic-flow', title: 'Traffic Flow', description: 'Monitor traffic congestion' },
    { type: 'red-light', title: 'Red Light Violations', description: 'Track intersection violations' }
  ],
  hospital: [
    { type: 'fall-detection', title: 'Fall Detection', description: 'Monitor patient falls' },
    { type: 'ppe-compliance', title: 'PPE Compliance', description: 'Track safety equipment usage' }
  ],
  mine: [
    { type: 'safety-compliance', title: 'Safety Compliance', description: 'Monitor safety protocols' },
    { type: 'equipment-tracking', title: 'Equipment Tracking', description: 'Track heavy machinery' }
  ],
  school: [
    { type: 'attendance', title: 'Live Attendance', description: 'Track student attendance' },
    { type: 'behavior-analysis', title: 'Behavior Analysis', description: 'Monitor student behavior' }
  ]
};

export default function AddWidgetModal({ moduleId, onClose }: AddWidgetModalProps) {
  const { addWidget } = useModuleContext();

  const handleAddWidget = (template: { type: string; title: string }) => {
    addWidget(moduleId, {
      id: `${template.type}-${Date.now()}`,
      type: template.type,
      title: template.title,
      data: {}
    });
    onClose();
  };

  const getTemplates = () => {
    const templates = [...widgetTemplates.workspace];
    if (moduleId === 'traffic') templates.push(...widgetTemplates.traffic);
    if (moduleId === 'hospital') templates.push(...widgetTemplates.hospital);
    if (moduleId === 'mine') templates.push(...widgetTemplates.mine);
    if (moduleId === 'school') templates.push(...widgetTemplates.school);
    return templates;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Add Widget</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="grid gap-3">
            {getTemplates().map((template) => (
              <button
                key={template.type}
                onClick={() => handleAddWidget(template)}
                className="flex flex-col gap-1 p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{template.title}</span>
                <span className="text-sm text-gray-500">{template.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}