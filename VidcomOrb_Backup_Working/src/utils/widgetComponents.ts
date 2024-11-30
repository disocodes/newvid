import { LiveCameraWidget } from '../components/widgets/common';
import { WorkspaceMetricsWidget } from '../components/widgets/workspace';
import { 
  AttendanceWidget,
  BehaviorAnalysisWidget,
  PlaygroundSafetyWidget,
  AccessControlWidget,
  BoundaryMonitoringWidget
} from '../components/widgets/school';

export const widgetComponents = {
  'live-camera': LiveCameraWidget,
  'workspace-metrics': WorkspaceMetricsWidget,
  'attendance': AttendanceWidget,
  'behavior-analysis': BehaviorAnalysisWidget,
  'playground-safety': PlaygroundSafetyWidget,
  'access-control': AccessControlWidget,
  'boundary-monitoring': BoundaryMonitoringWidget,
  // ... other widget components
};
