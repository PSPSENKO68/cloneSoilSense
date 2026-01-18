import { useState } from 'react';
import { Plane, PlaneLanding, Home, AlertCircle, CheckCircle } from 'lucide-react';
import { droneApi } from '../../services/api';
import type { DroneCommand } from '../../types';

interface ControlPanelProps {
  isFlying: boolean;
  onCommandSent: () => void;
}

export const ControlPanel = ({ isFlying, onCommandSent }: ControlPanelProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const sendCommand = async (command: DroneCommand) => {
    setLoading(true);
    setMessage(null);

    try {
      const result = await droneApi.sendCommand(command);

      if (result.success) {
        setMessage({
          type: 'success',
          text: `Command "${command.action}" executed successfully`,
        });
        onCommandSent();
      } else {
        setMessage({
          type: 'error',
          text: 'Command failed',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Network error',
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Drone Controls</h3>

      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-green-900/50 border border-green-700 text-green-200'
              : 'bg-red-900/50 border border-red-700 text-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="text-sm">{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => sendCommand({ action: 'takeoff' })}
          disabled={loading || isFlying}
          className="flex flex-col items-center justify-center gap-3 p-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition duration-200 group"
        >
          <Plane className="w-8 h-8 group-disabled:opacity-50" />
          <span className="font-semibold">Take Off</span>
        </button>

        <button
          onClick={() => sendCommand({ action: 'land' })}
          disabled={loading || !isFlying}
          className="flex flex-col items-center justify-center gap-3 p-6 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition duration-200 group"
        >
          <PlaneLanding className="w-8 h-8 group-disabled:opacity-50" />
          <span className="font-semibold">Land</span>
        </button>

        <button
          onClick={() => sendCommand({ action: 'return_home' })}
          disabled={loading || !isFlying}
          className="flex flex-col items-center justify-center gap-3 p-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition duration-200 group"
        >
          <Home className="w-8 h-8 group-disabled:opacity-50" />
          <span className="font-semibold">Return Home</span>
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400">
          Status: <span className={isFlying ? 'text-green-400' : 'text-gray-300'}>
            {isFlying ? 'Drone is flying' : 'Drone is on ground'}
          </span>
        </p>
      </div>
    </div>
  );
};
