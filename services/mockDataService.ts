import { SensorData, SystemStatus } from '../types';

// Constants to simulate realistic solar data
const BASE_VOLTAGE = 12.5;
const BASE_CURRENT = 2.0;
const BASE_TEMP = 35;
const BASE_HUMIDITY = 45;

let lastData: SensorData | null = null;

export const generateSensorData = (): SensorData => {
  const now = Date.now();
  
  // Add some random fluctuation
  const voltageFluctuation = (Math.random() - 0.5) * 1.5; // +/- 0.75V
  const currentFluctuation = (Math.random() - 0.5) * 0.5; // +/- 0.25A
  
  let voltage = BASE_VOLTAGE + voltageFluctuation;
  let current = Math.max(0, BASE_CURRENT + currentFluctuation); // No negative current
  
  // Simulate cloud cover occasionally dropping values significantly
  if (Math.random() > 0.9) {
    voltage *= 0.8;
    current *= 0.6;
  }

  const power = voltage * current;
  
  // Determine status based on thresholds
  let status = SystemStatus.NORMAL;
  if (voltage < 10.5) {
    status = SystemStatus.LOW_POWER;
  }
  if (voltage < 9.0) {
    status = SystemStatus.CRITICAL;
  }

  // Temp and Humidity change slowly
  const temperature = lastData 
    ? lastData.temperature + (Math.random() - 0.5) * 0.2
    : BASE_TEMP;
    
  const humidity = lastData 
    ? lastData.humidity + (Math.random() - 0.5) * 0.5
    : BASE_HUMIDITY;

  const newData: SensorData = {
    id: crypto.randomUUID(),
    voltage: parseFloat(voltage.toFixed(2)),
    current: parseFloat(current.toFixed(2)),
    power: parseFloat(power.toFixed(2)),
    temperature: parseFloat(temperature.toFixed(1)),
    humidity: parseFloat(Math.max(0, Math.min(100, humidity)).toFixed(1)),
    status,
    timestamp: now,
  };

  lastData = newData;
  return newData;
};

// Simulation of Supabase Realtime subscription
export const subscribeToSensorData = (callback: (data: SensorData) => void) => {
  const intervalId = setInterval(() => {
    const data = generateSensorData();
    callback(data);
  }, 2000); // Update every 2 seconds as per PRD

  return () => clearInterval(intervalId);
};
