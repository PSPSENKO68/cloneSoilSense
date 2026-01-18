export interface DroneStatus {
  battery: number;
  altitude: number;
  speed: number;
  connection: 'connected' | 'disconnected' | 'weak';
  gps: {
    lat: number;
    lng: number;
  };
  isFlying: boolean;
}

export interface SensorData {
  timestamp: number;
  temperature: number;
  soilMoisture: number;
  humidity: number;
  lightIntensity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface DroneCommand {
  action: 'takeoff' | 'land' | 'return_home' | 'move';
  direction?: 'forward' | 'backward' | 'left' | 'right' | 'up' | 'down';
  intensity?: number;
}
