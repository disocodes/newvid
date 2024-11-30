import React from 'react';
import BaseWidget from '../BaseWidget';
import { Car, Truck, Bus } from 'lucide-react';

export default function VehicleCountWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Vehicle Count" type="vehicle-count">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">1,234</span>
          </div>
          <span className="text-blue-500 text-sm font-medium">Last Hour</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 p-3 rounded text-center">
            <Car className="w-4 h-4 text-gray-600 mx-auto mb-1" />
            <span className="text-sm font-medium">856</span>
            <span className="text-xs text-gray-500 block">Cars</span>
          </div>
          <div className="bg-gray-50 p-3 rounded text-center">
            <Truck className="w-4 h-4 text-gray-600 mx-auto mb-1" />
            <span className="text-sm font-medium">245</span>
            <span className="text-xs text-gray-500 block">Trucks</span>
          </div>
          <div className="bg-gray-50 p-3 rounded text-center">
            <Bus className="w-4 h-4 text-gray-600 mx-auto mb-1" />
            <span className="text-sm font-medium">133</span>
            <span className="text-xs text-gray-500 block">Buses</span>
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}