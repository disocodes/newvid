import React from 'react';
import BaseWidget from '../BaseWidget';
import { BedDouble, Users } from 'lucide-react';

export default function OccupancyWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Ward Occupancy" type="occupancy">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">85%</span>
          </div>
          <span className="text-yellow-500 text-sm font-medium">Near Capacity</span>
        </div>

        <div className="space-y-2">
          {[
            { ward: 'ICU', occupied: 18, total: 20 },
            { ward: 'Emergency', occupied: 45, total: 50 },
            { ward: 'General', occupied: 85, total: 100 },
          ].map((ward) => (
            <div key={ward.ward} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm text-gray-600">{ward.ward}</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">
                  {ward.occupied}/{ward.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}