import React from 'react';
import { MetricCardProps } from '../types';

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon, colorClass }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">{title}</h3>
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
          {React.cloneElement(icon as React.ReactElement, { className: `w-5 h-5 ${colorClass}` })}
        </div>
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-slate-800">{value}</span>
        <span className="ml-1.5 text-slate-400 font-medium">{unit}</span>
      </div>
    </div>
  );
};

export default MetricCard;
