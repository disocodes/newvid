import React, { useState } from 'react';
import { Plus, Play, Save, Settings2, Trash2 } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';

interface PipelineNode {
  id: string;
  type: string;
  name: string;
  config: Record<string, any>;
}

interface DragItem {
  type: string;
  name: string;
}

export default function PipelineBuilder() {
  const [nodes, setNodes] = useState<PipelineNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'NODE',
    drop: (item: DragItem) => {
      const newNode = {
        id: Date.now().toString(),
        type: item.type,
        name: `${item.name} ${nodes.length + 1}`,
        config: {}
      };
      setNodes([...nodes, newNode]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  const components = [
    { type: 'input', name: 'Camera Input' },
    { type: 'detection', name: 'Object Detection' },
    { type: 'tracking', name: 'Object Tracking' },
    { type: 'classification', name: 'Classification' },
    { type: 'filter', name: 'Filter' },
    { type: 'alert', name: 'Alert' }
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1 bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Components</h3>
        <div className="space-y-2">
          {components.map((component) => {
            const [{ isDragging }, drag] = useDrag(() => ({
              type: 'NODE',
              item: component,
              collect: (monitor) => ({
                isDragging: monitor.isDragging()
              })
            }));

            return (
              <div
                key={component.type}
                ref={drag}
                className={`p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors ${
                  isDragging ? 'opacity-50' : ''
                }`}
              >
                <span className="text-sm font-medium">{component.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-4 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Pipeline</h3>
            <div className="flex gap-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Play className="w-5 h-5" />
              </button>
              <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                <Save className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={drop}
            className={`min-h-[400px] border-2 border-dashed rounded-lg ${
              isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="p-4 space-y-2">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className={`p-4 rounded-lg border ${
                    selectedNode === node.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{node.name}</span>
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors">
                        <Settings2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setNodes(nodes.filter(n => n.id !== node.id));
                        }}
                        className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1 bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Properties</h3>
        {selectedNode ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={nodes.find(n => n.id === selectedNode)?.name || ''}
                onChange={(e) => {
                  setNodes(nodes.map(node =>
                    node.id === selectedNode
                      ? { ...node, name: e.target.value }
                      : node
                  ));
                }}
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Select a node to view properties</p>
        )}
      </div>
    </div>
  );
}