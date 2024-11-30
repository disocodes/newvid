import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Layout, 
  Settings, 
  BarChart3, 
  Camera,
  Brain
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: Layout, path: '/' },
  { name: 'Analytics', icon: BarChart3, path: '/analytics' },
  { name: 'Models', icon: Brain, path: '/models' },
  { name: 'Cameras', icon: Camera, path: '/cameras' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <Brain className="w-8 h-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-900">Vision AI</span>
      </div>
      
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}