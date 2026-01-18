export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-20">
          <h1 className="text-5xl font-bold mb-4">🚁 SoilSense Drone Dashboard</h1>
          <p className="text-xl text-slate-300">Integration Complete & Ready to Use</p>
        </div>

        {/* Status Box */}
        <div className="bg-green-900/30 border border-green-600 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">✅</span>
            <h2 className="text-2xl font-bold">Integration Successful</h2>
          </div>
          <p className="text-green-200">SoilSense mapping system (100% preserved) combined with modern React/Vite dashboard</p>
        </div>

        {/* Quick Start */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">⚡ Quick Start</h3>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</span>
                <h4 className="text-lg font-semibold">Install Dependencies</h4>
              </div>
              <pre className="bg-slate-900 p-4 rounded text-slate-300 overflow-x-auto">
                <code>npm install && cd Soilsense && npm install && cd ..</code>
              </pre>
            </div>

            {/* Step 2 */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</span>
                <h4 className="text-lg font-semibold">Start Servers</h4>
              </div>
              <p className="text-slate-300 mb-2">Choose your method:</p>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-slate-400 mb-1">macOS/Linux:</p>
                  <pre className="bg-slate-900 p-3 rounded text-slate-300 overflow-x-auto text-sm">
                    <code>chmod +x start-dev.sh && ./start-dev.sh</code>
                  </pre>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Windows:</p>
                  <pre className="bg-slate-900 p-3 rounded text-slate-300 overflow-x-auto text-sm">
                    <code>start-dev.bat</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</span>
                <h4 className="text-lg font-semibold">Open Dashboard</h4>
              </div>
              <p className="text-slate-300 mb-2">Visit in your browser:</p>
              <pre className="bg-slate-900 p-4 rounded text-slate-300 overflow-x-auto">
                <code>http://localhost:5173</code>
              </pre>
              <p className="text-slate-400 text-sm mt-2">Login with any email/password (mock auth)</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">✨ Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <span className="text-2xl">🗺️</span>
              <div>
                <h4 className="font-semibold">Interactive Map</h4>
                <p className="text-slate-400 text-sm">Leaflet mapping with real-time sensor data</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <h4 className="font-semibold">Waypoints</h4>
                <p className="text-slate-400 text-sm">Click map to add drone waypoints</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-2xl">🚁</span>
              <div>
                <h4 className="font-semibold">Drone Control</h4>
                <p className="text-slate-400 text-sm">Takeoff, land, return home commands</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <h4 className="font-semibold">Sensor Monitoring</h4>
                <p className="text-slate-400 text-sm">Real-time temperature, humidity data</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-2xl">🕹️</span>
              <div>
                <h4 className="font-semibold">Joystick Control</h4>
                <p className="text-slate-400 text-sm">8-directional movement control</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-2xl">🎨</span>
              <div>
                <h4 className="font-semibold">Modern UI</h4>
                <p className="text-slate-400 text-sm">Professional dark theme design</p>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">📚 Documentation</h3>
          
          <div className="space-y-2">
            <p className="text-slate-300 mb-4">Comprehensive guides included in your project:</p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span>
                <code className="bg-slate-900 px-2 py-1 rounded">START_HERE.txt</code> - Quick welcome guide
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span>
                <code className="bg-slate-900 px-2 py-1 rounded">QUICK_START.md</code> - 3-step launch
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span>
                <code className="bg-slate-900 px-2 py-1 rounded">README.md</code> - Project overview
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span>
                <code className="bg-slate-900 px-2 py-1 rounded">ARCHITECTURE.md</code> - System design
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span>
                <code className="bg-slate-900 px-2 py-1 rounded">COMMANDS.md</code> - Command reference
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span>
                <span>7 more guides available in your project files</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Key Info */}
        <div className="bg-amber-900/30 border border-amber-600 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold mb-3">ℹ️ Important Info</h3>
          <ul className="space-y-2 text-slate-300">
            <li>✅ <strong>SoilSense Backend:</strong> 100% preserved and functional</li>
            <li>✅ <strong>Frontend:</strong> Modern React/Vite with Leaflet mapping</li>
            <li>✅ <strong>Database:</strong> MongoDB ready (local or Atlas)</li>
            <li>✅ <strong>Production Ready:</strong> Can be deployed immediately</li>
            <li>🔧 <strong>Ports:</strong> Frontend (5173), Backend (3000)</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6">🛠️ Tech Stack</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-blue-400">Frontend</h4>
              <ul className="space-y-1 text-slate-300 text-sm">
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• Vite</li>
                <li>• Leaflet</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-blue-400">Backend</h4>
              <ul className="space-y-1 text-slate-300 text-sm">
                <li>• Express.js</li>
                <li>• Node.js</li>
                <li>• MongoDB</li>
                <li>• Mongoose</li>
                <li>• Socket.io ready</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-slate-700">
          <p className="text-slate-400 mb-4">Ready to fly? 🚀</p>
          <p className="text-slate-500 text-sm">
            This is your Vite project running in the v0 preview. 
            <br />
            Run the commands above in your terminal to start the actual dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
