'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '../components/Layout/Navbar';
import { DroneMap } from '../components/Map/DroneMap';
import type { DroneStatus as DroneStatusType, SensorData } from '../types';
import { Thermometer, Droplets, Wind, Sun } from 'lucide-react';

export const SimulationPage = () => {
  const [fakeDroneStatus, setFakeDroneStatus] = useState<DroneStatusType>({
    battery: 85,
    altitude: 50,
    speed: 0,
    connection: 'connected',
    gps: { lat: 10.7769 + Math.random() * 0.01, lng: 106.7009 + Math.random() * 0.01 },
    isFlying: false,
  });

  const [fakeSensorData] = useState<SensorData>({
    timestamp: Date.now(),
    temperature: 28.5,
    soilMoisture: 65,
    humidity: 65,
    lightIntensity: 800,
  });

  const [sensorHistory, setSensorHistory] = useState<SensorData[]>([fakeSensorData]);

  useEffect(() => {
    // Update fake drone status every second
    const interval = setInterval(() => {
      setFakeDroneStatus((prev) => ({
        ...prev,
        battery: Math.max(0, prev.battery - 0.05),
        altitude: prev.altitude + (Math.random() - 0.5) * 2,
        gps: {
          lat: prev.gps.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.gps.lng + (Math.random() - 0.5) * 0.001,
        },
      }));

      setSensorHistory((prev) => {
        const newData: SensorData = {
          timestamp: Date.now(),
          temperature: 27 + Math.random() * 3,
          soilMoisture: 60 + Math.random() * 20,
          humidity: 60 + Math.random() * 30,
          lightIntensity: 700 + Math.random() * 400,
        };
        return [...prev, newData].slice(-20);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const latestData = sensorHistory[sensorHistory.length - 1] || {
    timestamp: Date.now(),
    temperature: 0,
    soilMoisture: 0,
    humidity: 0,
    lightIntensity: 0,
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Simulation Mode</h2>
          <p className="text-sm text-blue-400 mt-1">Testing with simulated data</p>
        </div>

        <div className="flex gap-6 h-[calc(100vh-200px)]">
          {/* Left side - Map (2/3) */}
          <div className="flex-1 flex flex-col gap-4">
            <DroneMap status={fakeDroneStatus} simulationMode={true} />
          </div>

          {/* Right side - Sensor Info (1/3) */}
          <div className="w-1/3 flex flex-col gap-4 overflow-y-auto">
            {/* Mission Dashboard Card */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Drone Status (SIM)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Battery</span>
                  <span className="text-white font-mono font-semibold">
                    {fakeDroneStatus.battery.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.max(0, fakeDroneStatus.battery)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-400 text-sm">Altitude</span>
                  <span className="text-white font-mono font-semibold">
                    {fakeDroneStatus.altitude.toFixed(1)}m
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Speed</span>
                  <span className="text-white font-mono font-semibold">
                    {fakeDroneStatus.speed.toFixed(1)}m/s
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Status</span>
                  <span className="text-sm font-semibold px-2 py-1 rounded bg-blue-600/20 text-blue-400">
                    Simulating
                  </span>
                </div>
              </div>
            </div>

            {/* Sensor Data Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-4 h-4 text-red-400" />
                  <span className="text-xs text-gray-400">Temperature</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">
                    {latestData.temperature.toFixed(1)}
                  </span>
                  <span className="text-gray-400 text-xs">°C</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-400">Soil Moisture</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">
                    {latestData.soilMoisture.toFixed(1)}
                  </span>
                  <span className="text-gray-400 text-xs">%</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-gray-400">Humidity</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">
                    {latestData.humidity.toFixed(1)}
                  </span>
                  <span className="text-gray-400 text-xs">%</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-gray-400">Light</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">
                    {latestData.lightIntensity.toFixed(0)}
                  </span>
                  <span className="text-gray-400 text-xs">lux</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
