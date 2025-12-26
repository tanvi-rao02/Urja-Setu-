import React from 'react';
import { ZapIcon, ActivityIcon } from './Icons';

const DevicesView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Connected Devices</h2>
        <p className="text-slate-500">Manage solar monitoring hardware nodes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-sky-100 rounded-xl text-sky-600">
                <ZapIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">ESP32 Gateway #01</h3>
                <p className="text-sm text-slate-500">Firmware v1.2.4</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Online
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 uppercase font-medium mb-1">IP Address</p>
              <p className="text-sm font-mono text-slate-700">192.168.1.42</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 uppercase font-medium mb-1">Connection</p>
              <p className="text-sm font-medium text-slate-700">WiFi 2.4GHz</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 uppercase font-medium mb-1">Signal Strength</p>
              <p className="text-sm font-medium text-slate-700">-65 dBm (Good)</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 uppercase font-medium mb-1">Uptime</p>
              <p className="text-sm font-medium text-slate-700">3d 12h 45m</p>
            </div>
          </div>

          <div className="flex gap-3">
             <button className="flex-1 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
               View Logs
             </button>
             <button className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-sm shadow-sky-200">
               Configure
             </button>
          </div>
        </div>

         {/* Add Device Placeholder */}
         <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-sky-300 hover:bg-sky-50 transition-all cursor-pointer group h-full min-h-[300px]">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-sky-600 transition-colors mb-4">
               <ActivityIcon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Add New Device</h3>
            <p className="text-sm text-slate-500 max-w-xs">Connect a new solar inverter or sensor node to the dashboard</p>
         </div>
      </div>
    </div>
  );
};

export default DevicesView;