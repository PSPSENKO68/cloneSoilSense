import { Battery, Gauge, Wifi, TrendingUp } from 'lucide-react';
import type { DroneStatus as DroneStatusType } from '../../types';

interface DroneStatusProps {
  status: DroneStatusType;
}

export const DroneStatus = ({ status }: DroneStatusProps) => {
  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-400';
    if (level > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConnectionColor = (connection: string) => {
    if (connection === 'connected') return 'text-green-400';
    if (connection === 'weak') return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConnectionText = (connection: string) => {
    if (connection === 'connected') return 'Connected';
    if (connection === 'weak') return 'Weak Signal';
    return 'Disconnected';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Battery</h3>
          <Battery className={`w-5 h-5 ${getBatteryColor(status.battery)}`} />
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-bold ${getBatteryColor(status.battery)}`}>
            {Math.round(status.battery)}
          </span>
          <span className="text-gray-400 text-sm">%</span>
        </div>
        <div className="mt-3 bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${status.battery > 50 ? 'bg-green-500' : status.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'} transition-all duration-500`}
            style={{ width: `${status.battery}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Altitude</h3>
          <TrendingUp className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-blue-400">
            {status.altitude.toFixed(1)}
          </span>
          <span className="text-gray-400 text-sm">m</span>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          {status.isFlying ? 'In Flight' : 'On Ground'}
        </p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Speed</h3>
          <Gauge className="w-5 h-5 text-purple-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-purple-400">
            {status.speed.toFixed(1)}
          </span>
          <span className="text-gray-400 text-sm">m/s</span>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          {status.speed > 0 ? 'Moving' : 'Stationary'}
        </p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Connection</h3>
          <Wifi className={`w-5 h-5 ${getConnectionColor(status.connection)}`} />
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-bold ${getConnectionColor(status.connection)}`}>
            {getConnectionText(status.connection)}
          </span>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          GPS: {status.gps.lat.toFixed(4)}, {status.gps.lng.toFixed(4)}
        </p>
      </div>
    </div>
  );
};
