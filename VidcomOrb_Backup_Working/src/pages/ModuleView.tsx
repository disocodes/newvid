import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useModuleContext } from '../context/ModuleContext';
import { Plus } from 'lucide-react';
import AddWidgetModal from '../components/AddWidgetModal';
import WorkspaceMetricsWidget from '../components/widgets/workspace/WorkspaceMetricsWidget';
import ModelPerformanceWidget from '../components/widgets/workspace/ModelPerformanceWidget';
import ProcessingQueueWidget from '../components/widgets/workspace/ProcessingQueueWidget';
import StorageUsageWidget from '../components/widgets/workspace/StorageUsageWidget';
import AlertsWidget from '../components/widgets/workspace/AlertsWidget';
import RedLightWidget from '../components/widgets/traffic/RedLightWidget';
import TrafficFlowWidget from '../components/widgets/traffic/TrafficFlowWidget';
import PhoneDetectionWidget from '../components/widgets/traffic/PhoneDetectionWidget';
import SpeedViolationWidget from '../components/widgets/traffic/SpeedViolationWidget';
import FallDetectionWidget from '../components/widgets/hospital/FallDetectionWidget';
import PPEComplianceWidget from '../components/widgets/hospital/PPEComplianceWidget';
import SafetyComplianceWidget from '../components/widgets/mine/SafetyComplianceWidget';
import EquipmentTrackingWidget from '../components/widgets/mine/EquipmentTrackingWidget';
import AttendanceWidget from '../components/widgets/school/AttendanceWidget';
import BehaviorAnalysisWidget from '../components/widgets/school/BehaviorAnalysisWidget';
import LiveCameraWidget from '../components/widgets/common/LiveCameraWidget';

const widgetComponents: { [key: string]: React.ComponentType<{ id: string }> } = {
  'workspace-metrics': WorkspaceMetricsWidget,
  'model-performance': ModelPerformanceWidget,
  'processing-queue': ProcessingQueueWidget,
  'storage-usage': StorageUsageWidget,
  'system-alerts': AlertsWidget,
  'red-light': RedLightWidget,
  'traffic-flow': TrafficFlowWidget,
  'phone-detection': PhoneDetectionWidget,
  'speed-violation': SpeedViolationWidget,
  'fall-detection': FallDetectionWidget,
  'ppe-compliance': PPEComplianceWidget,
  'safety-compliance': SafetyComplianceWidget,
  'equipment-tracking': EquipmentTrackingWidget,
  'attendance': AttendanceWidget,
  'behavior-analysis': BehaviorAnalysisWidget,
  'live-camera': LiveCameraWidget
};

export default function ModuleView() {
  const { id } = useParams();
  const { modules } = useModuleContext();
  const [showAddWidget, setShowAddWidget] = useState(false);
  const currentModule = modules.find(m => m.id === id);

  if (!currentModule) {
    return <div>Module not found</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{currentModule.title}</h1>
          <p className="text-gray-600 mt-2">Customize your dashboard layout</p>
        </div>
        <button 
          onClick={() => setShowAddWidget(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Widget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentModule.widgets.map((widget) => {
          const WidgetComponent = widgetComponents[widget.type];
          if (!WidgetComponent) {
            console.warn(`Widget type ${widget.type} not found`);
            return null;
          }
          return <WidgetComponent key={widget.id} id={widget.id} />;
        })}
      </div>

      {showAddWidget && (
        <AddWidgetModal 
          moduleId={currentModule.id} 
          onClose={() => setShowAddWidget(false)} 
        />
      )}
    </div>
  );
}