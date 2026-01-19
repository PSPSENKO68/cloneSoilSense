import type { AuthResponse, DroneStatus, SensorData, DroneCommand } from '../types';

const API_BASE = '/api';
const SOILSENSE_API = 'http://localhost:3000/api'; // SoilSense backend URL
let USE_MOCK = true;
export const setUseMock = (value: boolean) => { USE_MOCK = value; };
export const getUseMock = () => USE_MOCK;

let mockDroneStatus: DroneStatus = {
  battery: 85,
  altitude: 0,
  speed: 0,
  connection: 'connected',
  gps: { lat: 10.7769, lng: 106.7009 }, // Default to Vietnam coordinates
  isFlying: false,
};

const generateMockSensorData = (): SensorData => ({
  timestamp: Date.now(),
  temperature: 22 + Math.random() * 8,
  soilMoisture: 45 + Math.random() * 20,
  humidity: 50 + Math.random() * 30,
  lightIntensity: 300 + Math.random() * 400,
});

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (email && password) {
        return {
          success: true,
          user: { id: '1', email, name: 'Drone Operator' },
          token: 'mock-jwt-token',
        };
      }
      return { success: false, error: 'Invalid credentials' };
    }

    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async logout(): Promise<void> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return;
    }
    await fetch(`${API_BASE}/auth/logout`, { method: 'POST' });
  },
};

export const droneApi = {
  async getStatus(): Promise<DroneStatus> {
    if (USE_MOCK) {
      if (mockDroneStatus.isFlying) {
        mockDroneStatus.battery = Math.max(0, mockDroneStatus.battery - 0.1);
        mockDroneStatus.altitude += (Math.random() - 0.5) * 2;
        mockDroneStatus.speed = 5 + Math.random() * 10;
        mockDroneStatus.gps.lat += (Math.random() - 0.5) * 0.0001;
        mockDroneStatus.gps.lng += (Math.random() - 0.5) * 0.0001;
      }
      return { ...mockDroneStatus };
    }

    const response = await fetch(`${API_BASE}/drone/status`);
    return response.json();
  },

  async sendCommand(command: DroneCommand | { action: 'goto'; lat: number; lng: number }): Promise<{ success: boolean }>{
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));

      if (command.action === 'takeoff') {
        mockDroneStatus.isFlying = true;
        mockDroneStatus.altitude = 10;
        mockDroneStatus.speed = 0;
      } else if (command.action === 'land') {
        mockDroneStatus.isFlying = false;
        mockDroneStatus.altitude = 0;
        mockDroneStatus.speed = 0;
      } else if (command.action === 'return_home') {
        mockDroneStatus.gps = { lat: 10.7769, lng: 106.7009 };
      } else if (command.action === 'goto') {
        // In mock, jump the GPS to requested waypoint, set isFlying
        mockDroneStatus.isFlying = true;
        mockDroneStatus.gps = { lat: command.lat, lng: command.lng };
        mockDroneStatus.speed = 5;
      }

      return { success: true };
    }

    const response = await fetch(`${API_BASE}/drone/command`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(command),
    });
    return response.json();
  },
};

export const sensorApi = {
  async getData(): Promise<SensorData> {
    if (USE_MOCK) {
      return generateMockSensorData();
    }

    const response = await fetch(`${API_BASE}/sensor`);
    return response.json();
  },

  async getAllSensorData() {
    try {
      const response = await fetch(`${SOILSENSE_API}/sensordata`);
      if (!response.ok) throw new Error('Failed to fetch sensor data');
      return response.json();
    } catch (error) {
      console.warn('SoilSense API unavailable, using mock data:', error);
      return [];
    }
  },

  async saveSensorData(latitude: number, longitude: number, data: any) {
    try {
      const response = await fetch(`${SOILSENSE_API}/sensordata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude, ...data }),
      });
      return response.json();
    } catch (error) {
      console.error('Error saving sensor data:', error);
      throw error;
    }
  },
};
