import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, AlertTriangle, Truck, GraduationCap, Hospital } from 'lucide-react';

const moduleIcons = {
  traffic: Truck,
  hospital: Hospital,
  mine: AlertTriangle,
  school: GraduationCap,
};

interface ModuleCardProps {
  id: string;
  title: string;
  type: keyof typeof moduleIcons;
  metrics: { label: string; value: string | number }[];
}

export default function ModuleCard({ id, title, type, metrics }: ModuleCardProps) {
  const navigate = useNavigate();
  const Icon = moduleIcons[type];

  return (
    <div 
      onClick={() => navigate(`/module/${id}`)}
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-blue-50">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <Activity className="w-5 h-5 text-green-500" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">{metric.label}</p>
            <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}