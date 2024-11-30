import React from 'react';
import { Camera } from 'lucide-react';

interface WidgetPanelProps {
  onAddWidget: (type: string) => void;
}

const widgetTypes = [
  { 
    type: 'camera',
    label: 'Camera Input',
    description: 'Connect to webcam or network camera',
    color: '#dc3545',
    icon: Camera,
  },
  { 
    type: 'opencv',
    label: 'OpenCV Processing',
    description: 'Image processing operations using OpenCV',
    color: '#28a745'
  },
  { 
    type: 'yolo',
    label: 'YOLO Detection',
    description: 'Object detection using YOLO models',
    color: '#007bff'
  },
  { 
    type: 'tensorflow',
    label: 'TensorFlow Model',
    description: 'Custom vision models using TensorFlow',
    color: '#ff7f0e'
  },
];

export default function WidgetPanel({ onAddWidget }: WidgetPanelProps) {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="widget-panel">
      <h3 style={{ marginBottom: '20px' }}>Vision Models</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {widgetTypes.map(({ type, label, description, color, icon }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => onDragStart(e, type)}
            style={{
              padding: '15px',
              border: `2px solid ${color}`,
              borderRadius: '8px',
              background: 'white',
              cursor: 'grab',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            {icon && <icon style={{ marginRight: '8px' }} />}
            <h4 style={{ margin: '0 0 8px 0', color: color }}>{label}</h4>
            <p style={{ 
              margin: '0',
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.4'
            }}>
              {description}
            </p>
            <div style={{
              marginTop: '10px',
              fontSize: '12px',
              color: '#888',
              fontStyle: 'italic'
            }}>
              Drag to add to flow
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
