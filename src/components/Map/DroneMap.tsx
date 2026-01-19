'use client';

import { useEffect, useRef, useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import type { DroneStatus } from '../../types';

interface DroneMapProps {
  status: DroneStatus;
  simulationMode?: boolean;
  onWaypointCreated?: (wp: { id: string; lat: number; lng: number }) => void;
}

interface SensorLocation {
  latitude: number;
  longitude: number;
  records: Array<{
    temperature?: number;
    humidity?: number;
    conductivity?: number;
    timestamp: string;
  }>;
}

interface Waypoint {
  id: string;
  lat: number;
  lng: number;
}

export const DroneMap = ({ status, simulationMode = false, onWaypointCreated }: DroneMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [sensorData, setSensorData] = useState<SensorLocation[]>([]);
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [selectedWaypoint, setSelectedWaypoint] = useState<string | null>(null);
  const [centerLat, setCenterLat] = useState(10.7769);
  const [centerLng, setCenterLng] = useState(106.7009);
  const markersRef = useRef<Map<string, any>>(new Map());
  const waypointIdRef = useRef<number>(0);
  const routeRef = useRef<any>(null);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const L = (window as any).L;
    if (!L) {
      console.warn('Leaflet not loaded yet');
      return;
    }

    // Create map
    const map = L.map(mapContainer.current).setView([10.7769, 106.7009], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    // Track map center movement
    const handleMapMove = () => {
      const center = map.getCenter();
      setCenterLat(center.lat);
      setCenterLng(center.lng);
    };

    map.on('move', handleMapMove);

    // Click-to-add waypoint
    const handleMapClick = (e: any) => {
      const { lat, lng } = e.latlng;
      const id = `${Date.now()}-${waypointIdRef.current++}`;
      const newWp: Waypoint = { id, lat, lng };
      setWaypoints((prev) => [...prev, newWp]);
      if (onWaypointCreated) onWaypointCreated(newWp);
    };
    map.on('click', handleMapClick);

    // Keyboard: Enter to make waypoint at precise viewport center
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const size = map.getSize();
        const centerPx = (window as any).L.point(Math.floor(size.x / 2), Math.floor(size.y / 2));
        const centerLatLng = map.containerPointToLatLng(centerPx);
        const id = `${Date.now()}-${waypointIdRef.current++}`;
        const newWp = { id, lat: centerLatLng.lat, lng: centerLatLng.lng };
        setWaypoints((prev) => [...prev, newWp]);
        if (onWaypointCreated) onWaypointCreated(newWp);
      }
    };
    window.addEventListener('keydown', handleKeydown);

    // Fetch sensor data
    const fetchSensorData = async () => {
      try {
        const response = await fetch('/api/sensordata');
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    if (!simulationMode) {
      fetchSensorData();
      const interval = setInterval(fetchSensorData, 5000);
      return () => {
        clearInterval(interval);
        map.off('move', handleMapMove);
        map.off('click', handleMapClick);
        window.removeEventListener('keydown', handleKeydown);
      };
    }

    return () => {
      map.off('move', handleMapMove);
      map.off('click', handleMapClick);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [simulationMode]);

  // Update map markers when sensor data changes
  useEffect(() => {
    if (!mapRef.current) return;

    const L = (window as any).L;
    const map = mapRef.current;

    // Clear old sensor markers (non-waypoint, non-drone)
    const toDelete: string[] = [];
    markersRef.current.forEach((marker, key) => {
      if (!key.startsWith('waypoint-') && !key.startsWith('drone-')) {
        map.removeLayer(marker);
        toDelete.push(key);
      }
    });
    toDelete.forEach((k) => markersRef.current.delete(k));

    // Add sensor markers
    sensorData.forEach((location) => {
      const latest = location.records?.[location.records.length - 1];
      const conductivity = latest?.conductivity ?? 'N/A';

      const redIcon = L.divIcon({
        className: 'bg-red-500 border-2 border-white rounded-full w-4 h-4 shadow-[0_0_4px_rgba(0,0,0,0.35)]',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const marker = L.marker([location.latitude, location.longitude], {
        icon: redIcon,
      }).addTo(map);

      const popupContent = `
        <div class="p-2">
          <h3 class="font-semibold text-blue-600 mb-2">
            📍 ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}
          </h3>
          <table class="text-sm">
            <tr><td class="font-semibold">Temp:</td><td>${latest?.temperature?.toFixed(1)}°C</td></tr>
            <tr><td class="font-semibold">Humidity:</td><td>${latest?.humidity?.toFixed(1)}%</td></tr>
            <tr><td class="font-semibold">Conductivity:</td><td>${latest?.conductivity}</td></tr>
          </table>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.set(`${location.latitude}-${location.longitude}`, marker);
    });
  }, [sensorData]);

  // Update waypoint markers on map
  useEffect(() => {
    if (!mapRef.current) return;

    const L = (window as any).L;
    const map = mapRef.current;

    // Clear old waypoint markers
    const toDelete: string[] = [];
    markersRef.current.forEach((marker, key) => {
      if (key.startsWith('waypoint-')) {
        map.removeLayer(marker);
        toDelete.push(key);
      }
    });
    toDelete.forEach((k) => markersRef.current.delete(k));

    waypoints.forEach((wp, index) => {
      const number = index + 1;
      const waypointIcon = L.divIcon({
        className: `${
          selectedWaypoint === wp.id
            ? 'bg-yellow-400 border-2 border-yellow-600'
            : 'bg-purple-600 border-2 border-white'
        } rounded-full w-6 h-6 flex items-center justify-center text-white text-[10px] font-bold shadow-[0_2px_6px_rgba(0,0,0,0.35)]`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        html: `<div class="w-full h-full flex items-center justify-center">${number}</div>`,
      });

      const marker = L.marker([wp.lat, wp.lng], {
        icon: waypointIcon,
        draggable: true,
      }).addTo(map);

      marker.on('click', () => setSelectedWaypoint(wp.id));
      marker.on('dragend', (e: any) => {
        const newLat = e.target.getLatLng().lat;
        const newLng = e.target.getLatLng().lng;
        setWaypoints(
          waypoints.map((w) =>
            w.id === wp.id ? { ...w, lat: newLat, lng: newLng } : w
          )
        );
      });

      markersRef.current.set(`waypoint-${wp.id}`, marker);
    });

    // Draw/refresh route polyline connecting waypoints
    if (routeRef.current) {
      map.removeLayer(routeRef.current);
      routeRef.current = null;
    }
    if (waypoints.length >= 2) {
      const latlngs = waypoints.map((w) => [w.lat, w.lng]);
      const polyline = L.polyline(latlngs as any, {
        color: '#a78bfa', // purple-400
        weight: 3,
        opacity: 0.9,
        lineJoin: 'round',
      }).addTo(map);
      routeRef.current = polyline;
    }
  }, [waypoints, selectedWaypoint]);

  // Update drone position on map
  useEffect(() => {
    if (!mapRef.current || !status) return;

    const L = (window as any).L;
    const map = mapRef.current;

    const droneMarker = mapRef.current.droneMarker;
    const droneIcon = L.divIcon({
      className: 'bg-green-500 border-2 border-white rounded-full w-4 h-4 shadow-[0_0_4px_rgba(0,0,0,0.35)]',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    if (droneMarker) {
      map.removeLayer(droneMarker);
    }

    const newDroneMarker = L.marker([status.gps.lat, status.gps.lng], {
      icon: droneIcon,
      title: 'Drone',
    }).addTo(map);

    newDroneMarker.bindPopup(`
      <div class="p-2">
        <h3 class="font-semibold">🚁 Drone ${simulationMode ? '(SIM)' : ''}</h3>
        <p class="text-sm">Battery: ${status.battery.toFixed(1)}%</p>
        <p class="text-sm">Altitude: ${status.altitude.toFixed(1)}m</p>
      </div>
    `);

    mapRef.current.droneMarker = newDroneMarker;
  }, [status, simulationMode]);

  const removeWaypoint = (id: string) => {
    setWaypoints(waypoints.filter((wp) => wp.id !== id));
    if (selectedWaypoint === id) {
      setSelectedWaypoint(null);
    }
  };

  const makeWaypointAtCenter = () => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const size = map.getSize();
    const centerPx = (window as any).L.point(Math.floor(size.x / 2), Math.floor(size.y / 2));
    const centerLatLng = map.containerPointToLatLng(centerPx);
    const newWaypoint: Waypoint = {
      id: `${Date.now()}-${waypointIdRef.current++}`,
      lat: centerLatLng.lat,
      lng: centerLatLng.lng,
    };
    setWaypoints((prev) => [...prev, newWaypoint]);
    if (onWaypointCreated) onWaypointCreated(newWaypoint);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Map</h3>
      </div>

      <div
        ref={mapContainer}
        className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden flex-1 relative"
      >
        {/* Reticle crosshair lines */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 z-[9999]">
          <div className="h-[2px] bg-cyan-300/70 shadow-[0_0_6px_rgba(34,211,238,0.7)]"></div>
        </div>
        <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-[9999]">
          <div className="w-[2px] h-full bg-cyan-300/70 shadow-[0_0_6px_rgba(34,211,238,0.7)]"></div>
        </div>
        {/* Reticle circle + coords */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none">
          <div className="w-10 h-10 border-[2px] border-cyan-300/90 rounded-full flex items-center justify-center bg-cyan-300/10 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse">
            <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-6 whitespace-nowrap">
            <span className="text-[11px] font-mono text-cyan-200 bg-black/50 border border-cyan-400/30 rounded px-2 py-0.5 shadow-[0_0_6px_rgba(34,211,238,0.4)]">
              ({centerLat.toFixed(4)}, {centerLng.toFixed(4)})
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex gap-2">
          <button
            onClick={makeWaypointAtCenter}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition font-medium"
          >
            <Plus className="w-4 h-4" />
            Make Waypoint
          </button>
          <div className="text-sm text-gray-400">
            {waypoints.length} waypoint{waypoints.length !== 1 ? 's' : ''} set
          </div>
        </div>

        {waypoints.length > 0 && (
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700 max-h-32 overflow-y-auto">
            <p className="text-xs text-gray-400 mb-2">Waypoint List</p>
            {waypoints.map((wp, index) => (
              <div
                key={wp.id}
                className={`flex items-center justify-between p-2 rounded mb-1 transition ${
                  selectedWaypoint === wp.id
                    ? 'bg-yellow-600/30 border border-yellow-600/50'
                    : 'bg-purple-600/20 hover:bg-purple-600/30'
                }`}
              >
                <span className="text-xs text-gray-300 font-mono">
                  #{index + 1} — {wp.lng.toFixed(6)}, {wp.lat.toFixed(6)}
                </span>
                <button
                  onClick={() => removeWaypoint(wp.id)}
                  className="text-red-400 hover:text-red-300 transition p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
