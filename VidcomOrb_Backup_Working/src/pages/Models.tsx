import React from 'react';
import { Upload, RefreshCw, Trash2, Brain } from 'lucide-react';

export default function Models() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Brain className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Model Management</h1>
          <p className="text-gray-600 mt-1">Manage and deploy computer vision models</p>
        </div>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Deployed Models</h2>
            
            <div className="space-y-4">
              {[
                { name: 'YOLOv8', version: '1.0.0', status: 'Active', type: 'Object Detection' },
                { name: 'YOLO-NAS', version: '2.1.0', status: 'Active', type: 'Object Detection' },
                { name: 'Vision Transformer', version: '1.2.0', status: 'Active', type: 'Classification' },
              ].map((model) => (
                <div key={model.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-gray-900">{model.name}</h3>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                        {model.status}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-4">
                      <span className="text-sm text-gray-500">Version {model.version}</span>
                      <span className="text-sm text-gray-500">{model.type}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <RefreshCw className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">ONNX, TensorFlow, or PyTorch models</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Model Compatibility</h2>
          <div className="space-y-4">
            {[
              { format: 'YOLO Models', types: ['v5', 'v6', 'v7', 'v8', 'NAS'], status: 'Supported' },
              { format: 'TensorFlow', types: ['SavedModel', 'TF Lite'], status: 'Supported' },
              { format: 'ONNX', types: ['Dynamic', 'Static'], status: 'Supported' },
              { format: 'PyTorch', types: ['TorchScript', 'JIT'], status: 'Supported' },
            ].map((format) => (
              <div key={format.format} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{format.format}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Supported types: {format.types.join(', ')}
                  </p>
                </div>
                <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                  {format.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}