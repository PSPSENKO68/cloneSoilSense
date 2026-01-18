# SoilSense + Drone Dashboard Integration Guide

## Project Structure

This project combines two systems:
- **React/Vite Frontend**: Drone control dashboard with modern UI/UX
- **Express Backend (SoilSense)**: Real-time sensor data and mapping API

## Features

✅ **Live Interactive Map** - Leaflet-based mapping with:
  - Real-time drone position tracking
  - Sensor location markers with live data
  - Click-to-set drone waypoints (draggable)
  - Visual sensor readings (temperature, humidity, conductivity)

✅ **Drone Control Panel** - Takeoff, land, return home commands
✅ **Joystick Control** - Real-time drone movement control
✅ **Sensor Dashboard** - Real-time sensor data charts
✅ **Status Monitoring** - Battery, altitude, speed, connection status

## Setup Instructions

### 1. Install Dependencies

**Frontend (React/Vite):**
```bash
npm install
```

**Backend (SoilSense):**
```bash
cd Soilsense
npm install
```

### 2. Environment Configuration

**Frontend (.env or env.local):**
```
VITE_API_BASE=http://localhost:3000
```

**Backend (Soilsense/.env):**
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/soilsense
```

### 3. Running Both Servers

**Option A: Separate Terminals (Recommended for Development)**

Terminal 1 - Start SoilSense Backend:
```bash
cd Soilsense
npm start
# Server runs on http://localhost:3000
```

Terminal 2 - Start Frontend Dev Server:
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

**Option B: Using Concurrently (Optional)**

Install concurrently:
```bash
npm install --save-dev concurrently
```

Update main package.json scripts:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "vite",
    "dev:backend": "cd Soilsense && npm start"
  }
}
```

Run both servers:
```bash
npm run dev
```

## API Integration

### SoilSense Backend Endpoints

All endpoints are prefixed with `http://localhost:3000/api`

- **GET /sensordata** - Get all sensor data with locations
- **POST /sensordata** - Save new sensor data
- **GET /sensordata/:latitude/:longitude/:date** - Get data by location and date

### Frontend API Usage

The frontend automatically fetches sensor data every 5 seconds:

```typescript
// In /src/components/Map/DroneMap.tsx
const response = await fetch('http://localhost:3000/api/sensordata');
const sensorData = await response.json();
```

## Features Implementation

### 1. Live Sensor Map
- Displays all sensor locations as red markers
- Shows latest sensor readings (temperature, humidity, conductivity)
- Click markers to view detailed data tables

### 2. Waypoint System
- Click on map to add drone waypoints (purple markers)
- Drag waypoints to adjust positions
- Click waypoint list to highlight on map
- Remove individual waypoints or clear all

### 3. Drone Tracking
- Green marker shows real-time drone position
- Battery, altitude, and speed display
- Distance calculation from home base
- Status indicator (flying/landed)

### 4. Sensor Data Visualization
- Real-time temperature charts
- Humidity trends
- Soil conductivity readings
- Timestamp tracking

## Database

SoilSense uses MongoDB for data persistence.

**Collection: sensordata**
```javascript
{
  latitude: Number,
  longitude: Number,
  records: [
    {
      temperature: Number,
      humidity: Number,
      conductivity: Number,
      timestamp: Date
    }
  ]
}
```

### MongoDB Setup

**Local MongoDB:**
```bash
# Install MongoDB
# macOS with Homebrew:
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB:
brew services start mongodb-community
```

**MongoDB Atlas (Cloud):**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster and database
3. Get connection string
4. Add to .env: `MONGODB_URI=<your-connection-string>`

## Troubleshooting

### Issue: "CORS errors" or "Cannot fetch from SoilSense"
**Solution**: Ensure SoilSense backend is running on port 3000

### Issue: "Map not displaying"
**Solution**: Check browser console for Leaflet loading errors. Ensure internet for CDN resources.

### Issue: "No sensor data on map"
**Solution**: 
1. Verify MongoDB is running
2. Check SoilSense backend has sensor data saved
3. Use browser DevTools Network tab to debug API calls

### Issue: "Cannot connect to MongoDB"
**Solution**: 
1. Ensure MongoDB service is running (`brew services list`)
2. Check MONGODB_URI in .env is correct
3. For Atlas, verify IP whitelist includes your machine

## Development Tips

### Mock Data Toggle
To use mock data instead of real API:
- Edit `/src/services/api.ts`
- Set `USE_MOCK = true` to disable real API calls

### Live Reload
- Frontend automatically reloads on file changes (Vite HMR)
- Backend requires manual restart or use Nodemon (already configured)

### Network Inspector
- Open browser DevTools → Network tab
- Filter requests to see API calls to SoilSense backend
- Check response data to debug issues

## Production Deployment

### Build Frontend
```bash
npm run build
# Output: dist/
```

### Deploy Options
1. **Vercel** - Frontend only, connect to SoilSense API
2. **Heroku** - Deploy SoilSense backend separately
3. **Docker** - Containerize both services
4. **AWS/Azure** - Full stack deployment

### Environment Variables for Production
Set in deployment platform:
```
VITE_API_BASE=https://api.soilsense.com (your production SoilSense URL)
MONGODB_URI=<production-mongodb-uri>
```

## File Structure

```
Root/
├── src/
│   ├── components/
│   │   ├── Map/
│   │   │   └── DroneMap.tsx (✨ INTEGRATED with Leaflet)
│   │   ├── Dashboard/
│   │   └── Controls/
│   ├── services/
│   │   └── api.ts (✨ UPDATED with SoilSense endpoints)
│   └── types/
├── Soilsense/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── sensorController.js (sensor data endpoints)
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── INTEGRATION_GUIDE.md (this file)
└── index.html (✨ UPDATED with Leaflet CDN)
```

## Next Steps

1. **Start both servers** (see Running Both Servers section)
2. **Access the dashboard** at http://localhost:5173
3. **Login** with any email/password (mock auth)
4. **Test the map** by clicking to add waypoints
5. **Monitor real sensor data** as it streams from SoilSense backend

Enjoy! 🚁🌍
