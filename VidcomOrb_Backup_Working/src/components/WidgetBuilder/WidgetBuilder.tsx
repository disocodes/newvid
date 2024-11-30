import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  addEdge,
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  EdgeTypes,
  Panel,
  useReactFlow,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';
import OpenCVNode from './nodes/OpenCVNode';
import YOLONode from './nodes/YOLONode';
import TensorFlowNode from './nodes/TensorFlowNode';
import CameraNode from '../nodes/CameraNode';
import CustomEdge from './edges/CustomEdge';
import WidgetPanel from './WidgetPanel';
import { validateFlow, validateNode } from './utils/validation';

const nodeTypes: NodeTypes = {
  camera: CameraNode,
  opencv: OpenCVNode,
  yolo: YOLONode,
  tensorflow: TensorFlowNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function WidgetBuilder() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const { project } = useReactFlow();

  useEffect(() => {
    const handleNodeDataUpdate = (event: CustomEvent) => {
      const { nodeId, data } = event.detail;
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
        )
      );
    };

    window.addEventListener('updateNodeData', handleNodeDataUpdate as EventListener);
    return () => {
      window.removeEventListener('updateNodeData', handleNodeDataUpdate as EventListener);
    };
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      // Validate connection before adding
      const sourceNode = nodes.find(n => n.id === params.source);
      const targetNode = nodes.find(n => n.id === params.target);
      
      if (sourceNode && targetNode) {
        const sourceValidation = validateNode(sourceNode);
        const targetValidation = validateNode(targetNode);
        
        if (!sourceValidation.isValid || !targetValidation.isValid) {
          setValidationErrors([
            ...sourceValidation.errors,
            ...targetValidation.errors
          ]);
          return;
        }
      }

      const newEdge = {
        ...params,
        type: 'custom',
        animated: true,
        style: { stroke: '#2196f3' },
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [nodes]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setValidationErrors([]);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance?.project({
        x: event.clientX,
        y: event.clientY,
      });

      if (position) {
        const newNode = {
          id: `${nodes.length + 1}`,
          type,
          position,
          data: {
            label: `${type.toUpperCase()} Node ${nodes.length + 1}`,
            config: getDefaultConfig(type),
            onConfigChange: (newConfig: any) =>
              updateNodeConfig(`${nodes.length + 1}`, newConfig),
          },
        };

        setNodes((nds) => [...nds, newNode]);
      }
    },
    [reactFlowInstance, nodes]
  );

  const onNodesDelete = useCallback((nodesToDelete: Node[]) => {
    setValidationErrors([]);
    setSelectedNode(null);
  }, []);

  const validateCurrentFlow = useCallback(() => {
    const validation = validateFlow(nodes, edges);
    setValidationErrors(validation.errors);
    return validation.isValid;
  }, [nodes, edges]);

  const getDefaultConfig = (type: string) => {
    switch (type) {
      case 'camera':
        return {
          deviceId: '',
          networkUrl: '',
          useWebcam: true,
        };
      case 'opencv':
        return {
          modelType: 'opencv',
          properties: {
            operation: 'Threshold',
            params: {
              threshold: 127,
              kernelSize: 3,
              blurAmount: 3,
              cannyLow: 100,
              cannyHigh: 200,
            },
          },
        };
      case 'yolo':
        return {
          modelType: 'yolo',
          properties: {
            version: 'YOLOv8',
            weights: '',
            configFile: '',
            params: {
              confidenceThreshold: 0.5,
              nmsThreshold: 0.4,
              inputSize: 640,
              device: 'cpu',
              batchSize: 1,
              augmentation: {
                enabled: true,
                mosaic: true,
                mixup: false,
                flipHorizontal: true,
                flipVertical: false,
              },
            },
          },
        };
      case 'tensorflow':
        return {
          modelType: 'tensorflow',
          properties: {
            modelArchitecture: 'MobileNetV2',
            pretrainedModel: '',
            params: {
              batchSize: 32,
              learningRate: 0.001,
              optimizer: 'Adam',
              epochs: 10,
              inputShape: [224, 224, 3],
              device: 'cpu',
              quantization: {
                enabled: false,
                type: 'none',
              },
              preprocessing: {
                normalization: true,
                resizing: true,
                dataAugmentation: false,
              },
            },
          },
        };
      default:
        return {};
    }
  };

  const updateNodeConfig = useCallback((nodeId: string, newConfig: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          const updatedNode = {
            ...node,
            data: {
              ...node.data,
              config: newConfig,
            },
          };
          const validation = validateNode(updatedNode);
          setValidationErrors(validation.errors);
          return updatedNode;
        }
        return node;
      })
    );
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
      <div style={{ width: '20%', padding: '20px', borderRight: '1px solid #ccc' }}>
        <WidgetPanel onAddWidget={(type) => null} /> {/* We'll use drag and drop instead */}
      </div>
      <div style={{ flex: 1 }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes) => {
            setNodes((nds) =>
              nds.map((node) => {
                const change = changes.find((c) => c.id === node.id);
                if (change) {
                  return { ...node, position: change.position || node.position };
                }
                return node;
              })
            );
          }}
          onEdgesChange={(changes) => {
            setEdges((eds) =>
              eds.map((edge) => {
                const change = changes.find((c) => c.id === edge.id);
                if (change) {
                  return { ...edge, ...change };
                }
                return edge;
              })
            );
          }}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onNodesDelete={onNodesDelete}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
          <Panel position="top-right">
            <button
              onClick={validateCurrentFlow}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                background: '#4caf50',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Validate Flow
            </button>
          </Panel>
        </ReactFlow>
      </div>
      {selectedNode && (
        <div style={{ width: '300px', padding: '20px', borderLeft: '1px solid #ccc' }}>
          <h3>Model Configuration</h3>
          {validationErrors.length > 0 && (
            <div style={{ 
              marginBottom: '15px', 
              padding: '10px', 
              background: '#ffebee',
              border: '1px solid #ffcdd2',
              borderRadius: '4px'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#c62828' }}>Validation Errors:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {validationErrors.map((error, index) => (
                  <li key={index} style={{ color: '#c62828' }}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <pre>{JSON.stringify(selectedNode.data.config, null, 2)}</pre>
          <button 
            onClick={() => {
              setSelectedNode(null);
              setValidationErrors([]);
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              background: '#dc3545',
              color: 'white',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
