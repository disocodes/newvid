import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { ModelConfigPanel } from '../config/ModelConfigPanel';

interface TensorFlowNodeData {
  label: string;
  config: {
    modelType: 'tensorflow';
    properties: {
      modelArchitecture: string;
      pretrainedModel: string;
      params: {
        batchSize: number;
        learningRate: number;
        optimizer: string;
        epochs: number;
        inputShape: [number, number, number];
        device: 'cpu' | 'gpu';
        quantization: {
          enabled: boolean;
          type: 'int8' | 'float16' | 'none';
        };
        preprocessing: {
          normalization: boolean;
          resizing: boolean;
          dataAugmentation: boolean;
        };
      };
    };
  };
  onConfigChange: (newConfig: any) => void;
}

const TensorFlowNode = ({ data }: NodeProps<TensorFlowNodeData>) => {
  const architectures = [
    'MobileNetV2',
    'ResNet50',
    'EfficientNetB0',
    'InceptionV3',
    'Custom'
  ];

  const optimizers = [
    'Adam',
    'SGD',
    'RMSprop',
    'Adagrad'
  ];

  return (
    <div className="vision-node tensorflow" style={{
      padding: '15px',
      borderRadius: '8px',
      background: '#f8f9fa',
      border: '2px solid #ff7f0e',
      minWidth: '250px',
    }}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header" style={{ marginBottom: '10px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>{data.label}</h4>
        <span className="model-type">TensorFlow Model</span>
      </div>

      <ModelConfigPanel
        config={data.config}
        onChange={data.onConfigChange}
        options={{
          architectures,
          optimizers,
          parameters: {
            batchSize: { min: 1, max: 128, step: 1 },
            learningRate: { min: 0.0001, max: 0.1, step: 0.0001 },
            epochs: { min: 1, max: 1000, step: 1 },
            inputShape: {
              width: { min: 32, max: 1024, step: 32 },
              height: { min: 32, max: 1024, step: 32 },
              channels: { min: 1, max: 3, step: 1 }
            }
          },
          quantization: {
            types: ['int8', 'float16', 'none']
          },
          preprocessing: {
            normalization: true,
            resizing: true,
            dataAugmentation: true
          }
        }}
      />

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(TensorFlowNode);
