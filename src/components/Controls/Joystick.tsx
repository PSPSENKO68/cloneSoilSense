import { useState, useRef, useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, MoveVertical } from 'lucide-react';
import { droneApi } from '../../services/api';

interface JoystickProps {
  disabled: boolean;
}

export const Joystick = ({ disabled }: JoystickProps) => {
  const [activeDirection, setActiveDirection] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleDirectionPress = (direction: 'forward' | 'backward' | 'left' | 'right' | 'up' | 'down') => {
    if (disabled) return;

    setActiveDirection(direction);
    droneApi.sendCommand({ action: 'move', direction, intensity: 0.5 });

    intervalRef.current = setInterval(() => {
      droneApi.sendCommand({ action: 'move', direction, intensity: 0.5 });
    }, 500);
  };

  const handleDirectionRelease = () => {
    setActiveDirection(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const buttonClass = (direction: string) =>
    `p-4 rounded-xl transition-all duration-200 ${
      disabled
        ? 'bg-gray-700 cursor-not-allowed opacity-50'
        : activeDirection === direction
          ? 'bg-blue-600 shadow-lg shadow-blue-500/50 scale-95'
          : 'bg-gray-700 hover:bg-gray-600 active:scale-95'
    }`;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Manual Control</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-400 mb-3">Horizontal Movement</p>
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            <div></div>
            <button
              onMouseDown={() => handleDirectionPress('forward')}
              onMouseUp={handleDirectionRelease}
              onMouseLeave={handleDirectionRelease}
              onTouchStart={() => handleDirectionPress('forward')}
              onTouchEnd={handleDirectionRelease}
              className={buttonClass('forward')}
              disabled={disabled}
            >
              <ArrowUp className="w-6 h-6 text-white mx-auto" />
            </button>
            <div></div>

            <button
              onMouseDown={() => handleDirectionPress('left')}
              onMouseUp={handleDirectionRelease}
              onMouseLeave={handleDirectionRelease}
              onTouchStart={() => handleDirectionPress('left')}
              onTouchEnd={handleDirectionRelease}
              className={buttonClass('left')}
              disabled={disabled}
            >
              <ArrowLeft className="w-6 h-6 text-white mx-auto" />
            </button>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-900 border-2 border-gray-700"></div>
            </div>
            <button
              onMouseDown={() => handleDirectionPress('right')}
              onMouseUp={handleDirectionRelease}
              onMouseLeave={handleDirectionRelease}
              onTouchStart={() => handleDirectionPress('right')}
              onTouchEnd={handleDirectionRelease}
              className={buttonClass('right')}
              disabled={disabled}
            >
              <ArrowRight className="w-6 h-6 text-white mx-auto" />
            </button>

            <div></div>
            <button
              onMouseDown={() => handleDirectionPress('backward')}
              onMouseUp={handleDirectionRelease}
              onMouseLeave={handleDirectionRelease}
              onTouchStart={() => handleDirectionPress('backward')}
              onTouchEnd={handleDirectionRelease}
              className={buttonClass('backward')}
              disabled={disabled}
            >
              <ArrowDown className="w-6 h-6 text-white mx-auto" />
            </button>
            <div></div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-3">Altitude Control</p>
          <div className="flex flex-col gap-4 max-w-xs mx-auto">
            <button
              onMouseDown={() => handleDirectionPress('up')}
              onMouseUp={handleDirectionRelease}
              onMouseLeave={handleDirectionRelease}
              onTouchStart={() => handleDirectionPress('up')}
              onTouchEnd={handleDirectionRelease}
              className={`${buttonClass('up')} flex items-center justify-center gap-2 py-6`}
              disabled={disabled}
            >
              <MoveVertical className="w-6 h-6 text-white" />
              <span className="text-white font-medium">Ascend</span>
            </button>

            <button
              onMouseDown={() => handleDirectionPress('down')}
              onMouseUp={handleDirectionRelease}
              onMouseLeave={handleDirectionRelease}
              onTouchStart={() => handleDirectionPress('down')}
              onTouchEnd={handleDirectionRelease}
              className={`${buttonClass('down')} flex items-center justify-center gap-2 py-6`}
              disabled={disabled}
            >
              <MoveVertical className="w-6 h-6 text-white rotate-180" />
              <span className="text-white font-medium">Descend</span>
            </button>
          </div>
        </div>
      </div>

      {disabled && (
        <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg">
          <p className="text-sm text-yellow-200 text-center">
            Drone must be flying to use manual controls
          </p>
        </div>
      )}
    </div>
  );
};
