import React from 'react';
import BaseWidget from '../BaseWidget';
import { Brain, BarChart } from 'lucide-react';

export default function ClassroomAttentionWidget({ id }: { id: string }) {
  return (
    <BaseWidget id={id} title="Classroom Attention" type="classroom-attention">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <span className="text-2xl font-bold text-gray-900">85%</span>
          </div>
          <span className="text-purple-500 text-sm font-medium">Average Attention</span>
        </div>

        <div className="space-y-2">
          {[
            { room: 'Room 101', subject: 'Math', attention: 90 },
            { room: 'Room 102', subject: 'Science', attention: 85 },
            { room: 'Room 103', subject: 'English', attention: 80 },
          ].map((classroom) => (
            <div key={classroom.room} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{classroom.room}</span>
                <span className="text-xs text-gray-500">{classroom.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="w-4 h-4 text-gray-400" />
                <span className={`text-sm font-medium ${
                  classroom.attention >= 85 ? 'text-green-500' :
                  classroom.attention >= 75 ? 'text-yellow-500' : 'text-red-500'
                }`}>{classroom.attention}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}