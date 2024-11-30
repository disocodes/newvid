import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Building2, 
  HardHat, 
  School,
  Users,
  AlertTriangle,
  Activity,
  Video
} from 'lucide-react';

const modules = [
  {
    id: 'traffic',
    title: 'Traffic Vision',
    icon: Car,
    description: 'Monitor traffic flow and detect violations',
    metrics: ['Phone Usage: 45', 'Speed Violations: 23', 'Red Light Violations: 12'],
    color: 'blue'
  },
  {
    id: 'hospital',
    title: 'Hospital Vision',
    icon: Building2,
    description: 'Monitor patient safety and facility security',
    metrics: ['Fall Incidents: 2', 'Restricted Access: 15', 'PPE Compliance: 98%'],
    color: 'green'
  },
  {
    id: 'mine',
    title: 'Mine Site',
    icon: HardHat,
    description: 'Monitor mining operations and safety compliance',
    metrics: ['Safety Violations: 3', 'Equipment Usage: 85%', 'Zone Monitoring: Active'],
    color: 'yellow'
  },
  {
    id: 'school',
    title: 'School Vision',
    icon: School,
    description: 'Monitor school safety and security',
    metrics: ['Attendance: 342', 'Security Alerts: 0', 'Access Control: Active'],
    color: 'purple'
  }
];

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vision AI Dashboard</h1>
        <p className="mt-2 text-gray-600">Monitor and manage your computer vision modules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {modules.map((module) => (
          <Link
            key={module.id}
            to={`/module/${module.id}`}
            className="block group"
          >
            <div className={`p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg bg-${module.color}-100`}>
                  <module.icon className={`w-6 h-6 text-${module.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{module.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{module.description}</p>
              
              <div className="space-y-2">
                {module.metrics.map((metric, index) => (
                  <div key={index} className="text-sm text-gray-500">
                    {metric}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickStatCard
          icon={Users}
          title="Total Users"
          value="1,234"
          trend="+12%"
        />
        <QuickStatCard
          icon={AlertTriangle}
          title="Active Alerts"
          value="23"
          trend="-5%"
          trendDown
        />
        <QuickStatCard
          icon={Activity}
          title="System Health"
          value="98%"
          trend="+2%"
        />
        <QuickStatCard
          icon={Video}
          title="Active Cameras"
          value="42"
          trend="Stable"
        />
      </div>
    </div>
  );
}

interface QuickStatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  trend: string;
  trendDown?: boolean;
}

function QuickStatCard({ icon: Icon, title, value, trend, trendDown }: QuickStatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <Icon className="w-6 h-6 text-gray-400" />
      </div>
      <div className="mt-4">
        <span className={`text-sm ${trendDown ? 'text-red-600' : 'text-green-600'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}