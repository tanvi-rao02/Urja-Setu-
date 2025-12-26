import React from 'react';

export enum SystemStatus {
  NORMAL = 'NORMAL',
  LOW_POWER = 'LOW_POWER',
  CRITICAL = 'CRITICAL'
}

export interface SensorData {
  id: string;
  voltage: number;     // Volts (V)
  current: number;     // Amperes (A)
  power: number;       // Watts (W)
  temperature: number; // Celsius (°C)
  humidity: number;    // Percent (%)
  status: SystemStatus;
  timestamp: number;   // Unix timestamp
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  colorClass: string;
}