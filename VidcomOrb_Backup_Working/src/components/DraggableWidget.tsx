import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableWidgetProps {
  id: string;
  type: string;
  data: any;
  children: React.ReactNode;
}

export function DraggableWidget({ id, type, data, children }: DraggableWidgetProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'WIDGET',
    item: { id, type, data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {children}
    </div>
  );
}