import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { ModelConfigPanel } from '../config/ModelConfigPanel';

interface YOLONodeData {
  label: string;
  config: {
    modelType: 'yolo';
    properties: {
      version: string;
      weights: string;
      configFile: string;
      params: {
        confidenceThreshold: number;
        nmsThreshold: number;
        inputSize: number;
        device: 'cpu' | 'cuda';
        batchSize: number;
        augmentation: {
          enabled: boolean;
          mosaic: boolean;
          mixup: boolean;
          flipHorizontal: boolean;
          flipVertical: boolean;
        };
      };
    };
  };
  onConfigChange: (newConfig: any) => void;
}

const YOLONode = ({ data }: NodeProps<YOLONodeData>) => {
  const yoloVersions = ['YOLOv5', 'YOLOv7', 'YOLOv8'];

  return (
    <div className="vision-node yolo" style={{
      padding: '15px',
      borderRadius: '8px',
      background: '#f8f9fa',
      border: '2px solid #007bff',
      minWidth: '250px',
    }}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header" style={{ marginBottom: '10px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>{data.label}</h4>
        <span className="model-type">YOLO Detection</span>
      </div>

      <ModelConfigPanel
        config={data.config}
        onChange={data.onConfigChange}
        options={{
          versions: yoloVersions,
          parameters: {
            confidenceThreshold: { min: 0, max: 1, step: 0.01 },
            nmsThreshold: { min: 0, max: 1, step: 0.01 },
            inputSize: { min: 32, max: 1536, step: 32 },
            batchSize: { min: 1, max: 64, step: 1 }
          },
          augmentation: {
            mosaic: true,
            mixup: true,
            flipHorizontal: true,
            flipVertical: true
          }
        }}
      />

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(YOLONode);
