import React from 'react';
import BaseWidget from '../BaseWidget';
import { ListChecks, Clock, RotateCw } from 'lucide-react';

export default function ProcessingQueueWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Processing Queue" type="processing-queue">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-indigo-500" />
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <span className="text-indigo-500 text-sm font-medium">Active Tasks</span>
        </div>

        <div className="space-y-2">
          {[
            { task: 'Video Analysis', status: 'processing', time: '2m' },
            { task: 'Model Training', status: 'queued', time: '5m' },
            { task: 'Data Export', status: 'processing', time: '1m' }
          ].map((item) => (
            <div key={item.task} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-2">
                {item.status === 'processing' ? (
                  <RotateCw className="w-4 h-4 text-blue-500 animate-spin" />
                ) : (
                  <Clock className="w-4 h-4 text-gray-400" />
                )}
                <span className="text-sm font-medium">{item.task}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}