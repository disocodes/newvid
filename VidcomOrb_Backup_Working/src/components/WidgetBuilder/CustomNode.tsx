import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface CustomNodeData {
  label: string;
  config: {
    type: string;
    properties: Record<string, any>;
  };
}

function CustomNode({ data }: NodeProps<CustomNodeData>) {
  return (
    <div className="custom-node" style={{
      padding: '10px',
      borderRadius: '5px',
      background: 'white',
      border: '1px solid #ddd',
      minWidth: '150px',
    }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ marginBottom: '8px' }}>
        <strong>{data.label}</strong>
      </div>
      <div style={{ fontSize: '12px' }}>
        Type: {data.config.type}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(CustomNode);
