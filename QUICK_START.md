# ⚡ Quick Start - 3 Steps to Launch

## Step 1️⃣: Install Dependencies
```bash
# Main frontend
npm install

# Backend (SoilSense)
cd Soilsense && npm install && cd ..
```

## Step 2️⃣: Start Servers

### macOS/Linux
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Windows
```bash
start-dev.bat
```

### Manual (Any OS)
**Terminal 1:**
```bash
cd Soilsense
npm start
# Backend ready on http://localhost:3000
```

**Terminal 2:**
```bash
npm run dev
# Frontend ready on http://localhost:5173
```

## Step 3️⃣: Access Dashboard
Open browser: **http://localhost:5173**

---

## 🎮 How to Use

### 1. Login
- Any email/password works (mock auth)
- Example: test@test.com / password123

### 2. Dashboard Features
- **Map**: Shows sensors as red dots, drone as green dot
- **Add Waypoints**: Click anywhere on map
- **Manage Waypoints**: Drag them around, click list to highlight
- **Control Drone**: Use Takeoff/Land/Return Home buttons
- **Monitor Status**: Watch battery, altitude, speed in real-time

### 3. Sensor Data
- Displayed in popups when you click sensor markers
- Shows: Temperature, Humidity, Conductivity, Timestamp
- Charts update automatically

---

## 🔧 Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Dashboard | http://localhost:5173 | Main UI |
| Backend API | http://localhost:3000/api | Sensor data |
| API Endpoints | `/api/sensordata` | GET/POST sensor data |

---

## 📊 Map Controls

| Action | Result |
|--------|--------|
| 🖱️ Click map | Add waypoint |
| 🖱️ Drag waypoint | Move waypoint |
| 🖱️ Click marker | View sensor data |
| 🔴 Red marker | Sensor location |
| 🟢 Green marker | Drone position |
| 🟣 Purple marker | Waypoint |

---

## ❌ Troubleshooting 30-Second Fixes

### "Cannot connect to API"
```bash
# Check backend is running
ps aux | grep node
# Should see "npm start" in Soilsense folder
```

### "Map is blank"
1. Check browser DevTools (F12)
2. Look for red errors in Console
3. Check Leaflet CDN loaded in Network tab

### "No sensor data on map"
1. Backend running? Check port 3000
2. MongoDB running? Check Atlas or local
3. Data in database? Backend has sensor records?

### "Ports already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

---

## 📝 What's Running Where

```
Your Laptop
├── Frontend (React/Vite)
│   ├── Port: 5173
│   ├── Folder: /
│   └── Start: npm run dev
│
├── Backend (Express)
│   ├── Port: 3000
│   ├── Folder: /Soilsense
│   └── Start: npm start
│
└── Database (MongoDB)
    ├── Port: 27017 (local) or Atlas (cloud)
    └── Data: Sensor readings
```

---

## 💡 Pro Tips

1. **Monitor logs**: Keep both terminals visible to see real-time logs
2. **Use DevTools**: Press F12 in browser for debugging
3. **Refresh map**: Press F5 if waypoints disappear
4. **Check API**: Open http://localhost:3000/api/sensordata in new tab
5. **Mock vs Real**: Edit `USE_MOCK` in `/src/services/api.ts`

---

## 🚀 You're Ready!

Your SoilSense Drone Dashboard is now running with:
- ✅ Real-time sensor mapping
- ✅ Interactive waypoints
- ✅ Drone control panel
- ✅ Modern responsive UI
- ✅ Live data streams

**Next**: Open http://localhost:5173 and start controlling! 🎉

---

## 📚 For More Info

- Full setup guide: See `INTEGRATION_GUIDE.md`
- Integration details: See `INTEGRATION_SUMMARY.md`
- Map component: `/src/components/Map/DroneMap.tsx`
- API services: `/src/services/api.ts`
