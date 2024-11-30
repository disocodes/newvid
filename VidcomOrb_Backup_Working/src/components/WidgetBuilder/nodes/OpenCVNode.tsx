import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { ModelConfigPanel } from '../config/ModelConfigPanel';

interface OpenCVNodeData {
  label: string;
  config: {
    modelType: 'opencv';
    properties: {
      operation: string;
      params: {
        threshold?: number;
        kernelSize?: number;
        blurAmount?: number;
        cannyLow?: number;
        cannyHigh?: number;
        dilateIterations?: number;
        erodeIterations?: number;
        adaptiveMethod?: 'ADAPTIVE_THRESH_MEAN_C' | 'ADAPTIVE_THRESH_GAUSSIAN_C';
        thresholdType?: 'THRESH_BINARY' | 'THRESH_BINARY_INV';
      };
    };
  };
  onConfigChange: (newConfig: any) => void;
}

const OpenCVNode = ({ data }: NodeProps<OpenCVNodeData>) => {
  const operations = [
    'Threshold',
    'Blur',
    'Canny Edge',
    'Dilate',
    'Erode',
    'Adaptive Threshold',
    'Color Space Conversion'
  ];

  return (
    <div className="vision-node opencv" style={{
      padding: '15px',
      borderRadius: '8px',
      background: '#f8f9fa',
      border: '2px solid #28a745',
      minWidth: '250px',
    }}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header" style={{ marginBottom: '10px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>{data.label}</h4>
        <span className="model-type">OpenCV Processing</span>
      </div>
      
      <ModelConfigPanel
        config={data.config}
        onChange={data.onConfigChange}
        options={{
          operations,
          parameters: {
            threshold: { min: 0, max: 255, step: 1 },
            kernelSize: { min: 1, max: 31, step: 2 },
            blurAmount: { min: 1, max: 99, step: 2 },
            cannyLow: { min: 0, max: 255, step: 1 },
            cannyHigh: { min: 0, max: 255, step: 1 },
            dilateIterations: { min: 1, max: 10, step: 1 },
            erodeIterations: { min: 1, max: 10, step: 1 }
          }
        }}
      />

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(OpenCVNode);
