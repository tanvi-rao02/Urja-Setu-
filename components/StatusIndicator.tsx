import React from 'react';
import { SystemStatus } from '../types';
import { CheckCircleIcon, AlertTriangleIcon } from './Icons';

interface StatusIndicatorProps {
  status: SystemStatus;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  let statusConfig;

  switch (status) {
    case SystemStatus.NORMAL:
      statusConfig = {
        label: 'System Optimal',
        subLabel: 'All parameters within range',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        icon: <CheckCircleIcon className="w-6 h-6 text-emerald-600" />,
        dot: 'bg-emerald-500'
      };
      break;
    case SystemStatus.LOW_POWER:
      statusConfig = {
        label: 'Low Power',
        subLabel: 'Voltage below threshold',
        color: 'bg-amber-50 text-amber-700 border-amber-100',
        icon: <AlertTriangleIcon className="w-6 h-6 text-amber-600" />,
        dot: 'bg-amber-500'
      };
      break;
    case SystemStatus.CRITICAL:
      statusConfig = {
        label: 'Critical Alert',
        subLabel: 'Immediate attention required',
        color: 'bg-red-50 text-red-700 border-red-100 animate-pulse',
        icon: <AlertTriangleIcon className="w-6 h-6 text-red-600" />,
        dot: 'bg-red-500'
      };
      break;
  }

  return (
    <div className={`rounded-xl border p-4 ${statusConfig.color} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
      <div className="flex items-center gap-4">
        <div className="p-2 bg-white rounded-full shadow-sm shrink-0">
          {statusConfig.icon}
        </div>
        <div>
          <h3 className="font-bold text-lg leading-tight">{statusConfig.label}</h3>
          <p className="text-sm opacity-90">{statusConfig.subLabel}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 self-start sm:self-center ml-14 sm:ml-0">
        <div className={`w-3 h-3 rounded-full ${statusConfig.dot}`}></div>
        <span className="text-sm font-semibold uppercase tracking-wide">Live</span>
      </div>
    </div>
  );
};

export default StatusIndicator;
