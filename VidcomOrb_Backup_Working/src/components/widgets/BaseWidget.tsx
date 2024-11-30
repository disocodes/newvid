import React from 'react';
import { DraggableWidget } from '../DraggableWidget';
import { MoreVertical, Trash2 } from 'lucide-react';
import { useModuleContext } from '../../context/ModuleContext';
import { useParams } from 'react-router-dom';

interface BaseWidgetProps {
  id: string;
  title: string;
  type: string;
  children: React.ReactNode;
}

export default function BaseWidget({ id, title, type, children }: BaseWidgetProps) {
  const { removeWidget } = useModuleContext();
  const { id: moduleId } = useParams();
  const [showMenu, setShowMenu] = React.useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this widget?')) {
      if (moduleId) {
        removeWidget(moduleId, id);
      }
    }
  };

  return (
    <DraggableWidget id={id} type={type} data={{ title }}>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 relative">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <div className="relative pointer-events-auto">
            <button 
              className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMenu(false)}
                />
                <div 
                  className="absolute right-0 mt-1 py-1 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full cursor-pointer"
                    onClick={handleDelete}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Widget
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {children}
      </div>
    </DraggableWidget>
  );
}