'use client';

import { Plane, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isRealtime = location.pathname === '/dashboard' || location.pathname === '/';
  const isSimulation = location.pathname === '/simulation';

  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Drone Control System</h1>
              <p className="text-xs text-gray-400">Environmental Monitoring</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => navigate('/dashboard')}
                className={`px-4 py-2 text-sm font-medium transition ${
                  isRealtime
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Real time
              </button>
              <button
                onClick={() => navigate('/simulation')}
                className={`px-4 py-2 text-sm font-medium transition ${
                  isSimulation
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Simulation
              </button>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-white">{user?.name || user?.email}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
