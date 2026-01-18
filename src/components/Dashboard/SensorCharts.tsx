import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Thermometer, Droplets, Wind, Sun } from 'lucide-react';
import type { SensorData } from '../../types';

interface SensorChartsProps {
  data: SensorData[];
}

export const SensorCharts = ({ data }: SensorChartsProps) => {
  const latestData = data[data.length - 1] || {
    temperature: 0,
    soilMoisture: 0,
    humidity: 0,
    lightIntensity: 0,
  };

  const chartData = data.map((d) => ({
    time: new Date(d.timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    temperature: d.temperature,
    soilMoisture: d.soilMoisture,
    humidity: d.humidity,
    lightIntensity: d.lightIntensity,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Thermometer className="w-5 h-5 text-red-400" />
            <span className="text-sm text-gray-400">Temperature</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {latestData.temperature.toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm">°C</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-400">Soil Moisture</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {latestData.soilMoisture.toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm">%</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Wind className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-gray-400">Humidity</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {latestData.humidity.toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm">%</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Sun className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-400">Light</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {latestData.lightIntensity.toFixed(0)}
            </span>
            <span className="text-gray-400 text-sm">lux</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Real-time Sensor Data</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB',
              }}
            />
            <Legend wrapperStyle={{ color: '#9CA3AF' }} />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
              name="Temperature (°C)"
            />
            <Line
              type="monotone"
              dataKey="soilMoisture"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              name="Soil Moisture (%)"
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#06B6D4"
              strokeWidth={2}
              dot={false}
              name="Humidity (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
