import React from 'react';
import RealtimeCharts from './RealtimeCharts';
import { SensorData } from '../types';

interface AnalyticsViewProps {
  history: SensorData[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ history }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Analytics</h2>
          <p className="text-slate-500">Historical performance data and trends</p>
        </div>
        <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg p-2 focus:ring-2 focus:ring-sky-500 outline-none cursor-pointer">
          <option>Last 1 Hour</option>
          <option>Last 24 Hours</option>
          <option>Last 7 Days</option>
          <option>Custom Range</option>
        </select>
      </div>

      <RealtimeCharts data={history} />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Recent Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Voltage (V)</th>
                <th className="px-6 py-3">Current (A)</th>
                <th className="px-6 py-3">Power (W)</th>
              </tr>
            </thead>
            <tbody>
              {history.slice().reverse().slice(0, 10).map((log) => (
                <tr key={log.id} className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.status === 'NORMAL' ? 'bg-emerald-100 text-emerald-700' :
                      log.status === 'LOW_POWER' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {log.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">{log.voltage}</td>
                  <td className="px-6 py-4">{log.current}</td>
                  <td className="px-6 py-4">{log.power}</td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-slate-400">
                    No logs available yet...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;