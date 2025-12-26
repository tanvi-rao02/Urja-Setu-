import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import StatusIndicator from './components/StatusIndicator';
import RealtimeCharts from './components/RealtimeCharts';
import AnalyticsView from './components/AnalyticsView';
import DevicesView from './components/DevicesView';
import { subscribeToSensorData } from './services/mockDataService';
import { SensorData, SystemStatus } from './types';
import { 
  ZapIcon, 
  ActivityIcon, 
  BatteryIcon, 
  SunIcon, 
  DropletsIcon 
} from './components/Icons';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<SensorData[]>([]);

  useEffect(() => {
    // Subscribe to mock data service
    const unsubscribe = subscribeToSensorData((newData) => {
      setCurrentData(newData);
      setHistory(prev => {
        // Keep last 30 readings
        const newHistory = [...prev, newData];
        if (newHistory.length > 30) {
          return newHistory.slice(newHistory.length - 30);
        }
        return newHistory;
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!currentData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header currentView={currentView} onNavigate={setCurrentView} />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Connecting to ESP32 Gateway...</p>
          </div>
        </div>
      </div>
    );
  }

  const renderDashboard = () => (
    <>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Live Monitor</h2>
            <p className="text-slate-500">Real-time solar performance metrics</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Last updated: {new Date(currentData.timestamp).toLocaleTimeString()}
          </div>
        </div>

        <StatusIndicator status={currentData.status} />
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <MetricCard 
          title="Voltage" 
          value={currentData.voltage} 
          unit="V" 
          icon={<ZapIcon />} 
          colorClass="text-indigo-600" 
        />
        <MetricCard 
          title="Current" 
          value={currentData.current} 
          unit="A" 
          icon={<ActivityIcon />} 
          colorClass="text-amber-500" 
        />
        <MetricCard 
          title="Power" 
          value={currentData.power} 
          unit="W" 
          icon={<BatteryIcon />} 
          colorClass="text-sky-600" 
        />
        <MetricCard 
          title="Temperature" 
          value={currentData.temperature} 
          unit="°C" 
          icon={<SunIcon />} 
          colorClass="text-orange-500" 
        />
        <MetricCard 
          title="Humidity" 
          value={currentData.humidity} 
          unit="%" 
          icon={<DropletsIcon />} 
          colorClass="text-blue-500" 
        />
      </div>

      {/* Charts Section */}
      <div className="border-t border-slate-200 pt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Performance Analytics</h2>
          <button 
            onClick={() => setCurrentView('analytics')}
            className="text-sm text-sky-600 font-medium hover:underline"
          >
            View Full Report
          </button>
        </div>
        <RealtimeCharts data={history} />
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'analytics' && <AnalyticsView history={history} />}
        {currentView === 'devices' && <DevicesView />}
        
        <div className="mt-12 text-center border-t border-slate-200 pt-8 pb-4">
          <p className="text-slate-400 text-sm">URJA SETU | Prototype v1.0 | Powered by Next.js & Supabase</p>
        </div>
      </main>
    </div>
  );
};

export default App;