import React, { createContext, useContext, useState } from 'react';

interface Widget {
  id: string;
  type: string;
  title: string;
  data: any;
}

interface Module {
  id: string;
  title: string;
  widgets: Widget[];
}

interface ModuleContextType {
  modules: Module[];
  addWidget: (moduleId: string, widget: Widget) => void;
  removeWidget: (moduleId: string, widgetId: string) => void;
  updateWidget: (moduleId: string, widgetId: string, data: any) => void;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

const initialModules: Module[] = [
  {
    id: 'traffic',
    title: 'Traffic Vision',
    widgets: [
      { id: 'live-camera-1', type: 'live-camera', title: 'Live Camera Feed', data: { location: 'Main Intersection', cameraId: 'CAM-001' } },
      { id: 'phone-detection-1', type: 'phone-detection', title: 'Phone Detection', data: {} },
      { id: 'speed-violation-1', type: 'speed-violation', title: 'Speed Violations', data: {} },
      { id: 'traffic-flow-1', type: 'traffic-flow', title: 'Traffic Flow', data: {} },
      { id: 'workspace-metrics-1', type: 'workspace-metrics', title: 'Workspace Metrics', data: {} },
      { id: 'model-performance-1', type: 'model-performance', title: 'Model Performance', data: {} },
      { id: 'processing-queue-1', type: 'processing-queue', title: 'Processing Queue', data: {} },
      { id: 'storage-usage-1', type: 'storage-usage', title: 'Storage Usage', data: {} },
      { id: 'system-alerts-1', type: 'system-alerts', title: 'System Alerts', data: {} }
    ]
  },
  {
    id: 'hospital',
    title: 'Hospital Vision',
    widgets: [
      { id: 'live-camera-2', type: 'live-camera', title: 'Live Camera Feed', data: { location: 'Emergency Ward', cameraId: 'CAM-002' } },
      { id: 'fall-detection-1', type: 'fall-detection', title: 'Fall Detection', data: {} },
      { id: 'ppe-compliance-1', type: 'ppe-compliance', title: 'PPE Compliance', data: {} },
      { id: 'workspace-metrics-2', type: 'workspace-metrics', title: 'Workspace Metrics', data: {} },
      { id: 'model-performance-2', type: 'model-performance', title: 'Model Performance', data: {} },
      { id: 'processing-queue-2', type: 'processing-queue', title: 'Processing Queue', data: {} },
      { id: 'storage-usage-2', type: 'storage-usage', title: 'Storage Usage', data: {} },
      { id: 'system-alerts-2', type: 'system-alerts', title: 'System Alerts', data: {} }
    ]
  },
  {
    id: 'mine',
    title: 'Mine Site',
    widgets: [
      { id: 'live-camera-3', type: 'live-camera', title: 'Live Camera Feed', data: { location: 'Main Pit', cameraId: 'CAM-003' } },
      { id: 'safety-compliance-1', type: 'safety-compliance', title: 'Safety Compliance', data: {} },
      { id: 'equipment-tracking-1', type: 'equipment-tracking', title: 'Equipment Tracking', data: {} },
      { id: 'workspace-metrics-3', type: 'workspace-metrics', title: 'Workspace Metrics', data: {} },
      { id: 'model-performance-3', type: 'model-performance', title: 'Model Performance', data: {} },
      { id: 'processing-queue-3', type: 'processing-queue', title: 'Processing Queue', data: {} },
      { id: 'storage-usage-3', type: 'storage-usage', title: 'Storage Usage', data: {} },
      { id: 'system-alerts-3', type: 'system-alerts', title: 'System Alerts', data: {} }
    ]
  },
  {
    id: 'school',
    title: 'School Vision',
    widgets: [
      { id: 'live-camera-4', type: 'live-camera', title: 'Live Camera Feed', data: { location: 'Main Entrance', cameraId: 'CAM-004' } },
      { id: 'attendance-1', type: 'attendance', title: 'Live Attendance', data: {} },
      { id: 'behavior-analysis-1', type: 'behavior-analysis', title: 'Behavior Analysis', data: {} },
      { id: 'workspace-metrics-4', type: 'workspace-metrics', title: 'Workspace Metrics', data: {} },
      { id: 'model-performance-4', type: 'model-performance', title: 'Model Performance', data: {} },
      { id: 'processing-queue-4', type: 'processing-queue', title: 'Processing Queue', data: {} },
      { id: 'storage-usage-4', type: 'storage-usage', title: 'Storage Usage', data: {} },
      { id: 'system-alerts-4', type: 'system-alerts', title: 'System Alerts', data: {} }
    ]
  }
];

export function ModuleProvider({ children }: { children: React.ReactNode }) {
  const [modules, setModules] = useState<Module[]>(initialModules);

  const addWidget = (moduleId: string, widget: Widget) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, widgets: [...module.widgets, widget] }
        : module
    ));
  };

  const removeWidget = (moduleId: string, widgetId: string) => {
    setModules(modules.map(module =>
      module.id === moduleId
        ? { ...module, widgets: module.widgets.filter(w => w.id !== widgetId) }
        : module
    ));
  };

  const updateWidget = (moduleId: string, widgetId: string, data: any) => {
    setModules(modules.map(module =>
      module.id === moduleId
        ? {
            ...module,
            widgets: module.widgets.map(w =>
              w.id === widgetId ? { ...w, data } : w
            )
          }
        : module
    ));
  };

  return (
    <ModuleContext.Provider value={{ modules, addWidget, removeWidget, updateWidget }}>
      {children}
    </ModuleContext.Provider>
  );
}

export function useModuleContext() {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error('useModuleContext must be used within a ModuleProvider');
  }
  return context;
}