import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Models from './pages/Models';
import Cameras from './pages/Cameras';
import Analytics from './pages/Analytics';
import ModuleView from './pages/ModuleView';
import { WidgetProvider } from './contexts/WidgetContext';

const App = () => {
  return (
    <WidgetProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/models" element={<Models />} />
            <Route path="/cameras" element={<Cameras />} />
            <Route path="/module/:id" element={<ModuleView />} />
          </Routes>
        </main>
      </div>
    </WidgetProvider>
  );
};

export default App;