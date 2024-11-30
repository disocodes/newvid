import React from 'react';
import BaseWidget from '../BaseWidget';
import { Truck, Battery } from 'lucide-react';

export default function EquipmentTrackingWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Equipment Tracking" type="equipment-tracking">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">28</span>
          </div>
          <span className="text-green-500 text-sm font-medium">All Units Active</span>
        </div>

        <div className="space-y-2">
          {[
            { type: 'Excavator', active: 8, total: 10, battery: 85 },
            { type: 'Dump Truck', active: 12, total: 12, battery: 72 },
            { type: 'Loader', active: 8, total: 8, battery: 64 },
          ].map((equipment) => (
            <div key={equipment.type} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{equipment.type}</span>
                <span className="text-xs text-gray-500">
                  {equipment.active}/{equipment.total} active
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Battery className="w-4 h-4 text-gray-400" />
                <span className={`text-sm font-medium ${
                  equipment.battery > 80 ? 'text-green-500' :
                  equipment.battery > 60 ? 'text-yellow-500' : 'text-red-500'
                }`}>{equipment.battery}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}