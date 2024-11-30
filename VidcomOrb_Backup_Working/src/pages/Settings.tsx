import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Database } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure system preferences and notifications</p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Security Alerts', description: 'Get notified about security breaches' },
              { name: 'System Updates', description: 'Notifications about system updates' },
              { name: 'Performance Alerts', description: 'Get alerts about system performance' },
            ].map((setting) => (
              <div key={setting.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{setting.name}</h3>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Security</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Two-Factor Authentication', description: 'Add an extra layer of security' },
              { name: 'API Access', description: 'Manage API keys and access tokens' },
              { name: 'Audit Logs', description: 'View system access logs' },
            ].map((setting) => (
              <div key={setting.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{setting.name}</h3>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
                <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  Configure
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Data Management</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Data Retention', description: 'Configure data storage duration' },
              { name: 'Backup Settings', description: 'Manage automatic backups' },
              { name: 'Export Data', description: 'Download system data' },
            ].map((setting) => (
              <div key={setting.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{setting.name}</h3>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
                <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  Manage
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}