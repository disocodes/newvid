import React from 'react';
import BaseWidget from '../BaseWidget';
import { Users, Clock } from 'lucide-react';

export default function AttendanceWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Live Attendance" type="attendance">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">342</span>
          </div>
          <span className="text-blue-500 text-sm font-medium">98% Present</span>
        </div>

        <div className="space-y-2">
          {[
            { location: 'Main Building', present: 156, total: 160 },
            { location: 'Science Block', present: 98, total: 100 },
            { location: 'Library', present: 88, total: 90 },
          ].map((area) => (
            <div key={area.location} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{area.location}</span>
                <span className="text-xs text-gray-500">
                  {area.present}/{area.total} students
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}