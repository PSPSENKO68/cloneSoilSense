# 🔧 Common Commands Reference

Quick lookup for frequently used commands.

---

## 🚀 Starting Development

### Automatic (Recommended)

**macOS/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Windows:**
```bash
start-dev.bat
```

### Manual (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd Soilsense
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## 📦 Installation

### Fresh Setup
```bash
# Install everything
npm install
cd Soilsense && npm install && cd ..

# Or individual commands
npm install                    # Frontend dependencies
cd Soilsense && npm install   # Backend dependencies
```

### Update Dependencies
```bash
npm update
cd Soilsense && npm update && cd ..
```

---

## 🛑 Stopping Servers

### Graceful Shutdown
```bash
# Press Ctrl+C in terminal windows
# Or use keyboard shortcut: Cmd+C (Mac) / Ctrl+C (Windows/Linux)
```

### Force Kill Processes

**macOS/Linux:**
```bash
# Kill process on port 3000 (backend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9

# Kill all Node processes
killall node
```

**Windows:**
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

## 🧹 Cleaning Up

### Clear Node Modules
```bash
# Frontend
rm -rf node_modules
npm install

# Backend
cd Soilsense
rm -rf node_modules
npm install
cd ..
```

### Clear Caches
```bash
# Vite cache
rm -rf .vite

# npm cache
npm cache clean --force

# System cache (macOS)
rm -rf ~/Library/Caches/npm
```

---

## 📊 Database Commands

### MongoDB Local

**Start MongoDB:**
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux with systemctl
sudo systemctl start mongod

# Windows (after installation)
net start MongoDB
```

**Access MongoDB Shell:**
```bash
mongosh
use soilsense
db.sensordatas.find()
db.sensordatas.deleteMany({})  # Clear all data
```

**Stop MongoDB:**
```bash
# macOS
brew services stop mongodb-community

# Linux
sudo systemctl stop mongod

# Windows
net stop MongoDB
```

### MongoDB Atlas (Cloud)

**Connection String:**
```
mongodb+srv://username:password@cluster.mongodb.net/soilsense?retryWrites=true&w=majority
```

**Add to .env:**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/soilsense
```

---

## 🔍 Debugging Commands

### Check Process Status

**macOS/Linux:**
```bash
# List running Node processes
ps aux | grep node

# Check if port is in use
lsof -i :3000  # Backend
lsof -i :5173  # Frontend

# View process details
lsof -i :3000 | head -1 && lsof -i :3000 | tail -1
```

**Windows:**
```bash
# List processes on port
netstat -ano | findstr :3000

# View running processes
tasklist | findstr node
```

### Network Debugging

```bash
# Test backend connectivity
curl http://localhost:3000/api/sensordata

# Test with headers
curl -H "Content-Type: application/json" http://localhost:3000/api/sensordata

# Watch API requests in real-time
curl -v http://localhost:3000/api/sensordata
```

### Clear Browser Cache
```bash
# Chrome DevTools
Cmd+Shift+Delete (Mac)
Ctrl+Shift+Delete (Windows/Linux)

# Or: Hard refresh
Cmd+Shift+R (Mac)
Ctrl+Shift+R (Windows/Linux)
F12 → Right-click refresh → Empty cache and hard refresh
```

---

## 📝 Development Commands

### Frontend Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Backend Development
```bash
# Start with auto-reload
cd Soilsense && npm start

# Run without auto-reload
node src/server.js

# Install new package
npm install package-name
```

### View Logs
```bash
# Frontend console
# Open browser DevTools: F12 or Cmd+Option+I

# Backend logs
# Visible in terminal running "npm start"

# Clear console
# Press Ctrl+L in terminal
```

---

## 🚀 Quick Test Commands

### Test Backend API

**Fetch all sensor data:**
```bash
curl http://localhost:3000/api/sensordata
```

**Save new sensor data:**
```bash
curl -X POST http://localhost:3000/api/sensordata \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 10.7769,
    "longitude": 106.7009,
    "temperature": 25.5,
    "humidity": 65,
    "conductivity": 1250
  }'
```

**Get sensor data by location:**
```bash
curl http://localhost:3000/api/sensordata/10.7769/106.7009/2024-01-18
```

### Test Frontend Access
```bash
# Test if frontend is running
curl http://localhost:5173

# Test API from frontend
curl http://localhost:3000/api/sensordata -H "Origin: http://localhost:5173"
```

---

## 🔄 Restart Procedures

### Restart Just Backend
```bash
# In Soilsense terminal: Ctrl+C
# Then: npm start
```

### Restart Just Frontend
```bash
# In main terminal: Ctrl+C
# Then: npm run dev
```

### Complete Restart (Both Servers)
```bash
# Kill both
# Ctrl+C in all terminals

# Or automatic on macOS/Linux:
killall node

# Then restart using startup script
./start-dev.sh  # macOS/Linux
# or
start-dev.bat   # Windows
```

---

## 📦 Dependency Management

### Check Outdated Packages
```bash
npm outdated
cd Soilsense && npm outdated && cd ..
```

### Update All Packages
```bash
npm update
cd Soilsense && npm update && cd ..
```

### Install Specific Version
```bash
npm install package@version
```

### Uninstall Package
```bash
npm uninstall package-name
```

---

## 🌐 Network Debugging

### Check All Ports
```bash
# macOS/Linux
lsof -i -P -n | grep LISTEN

# Windows
netstat -ano
```

### Port Conflicts
```bash
# If port 3000 is in use, change in Soilsense/.env:
PORT=3001

# If port 5173 is in use, Vite will use next available port
npm run dev
```

### Test Network Connectivity
```bash
# Ping server
ping localhost:3000

# DNS resolution
nslookup localhost

# Full trace
tracert localhost  # Windows
traceroute localhost  # macOS/Linux
```

---

## 💾 Backup Commands

### Backup Database
```bash
# Export MongoDB collection
mongodump --db soilsense --out ./backup

# Export to JSON
mongoexport --db soilsense --collection sensordatas --out sensordatas.json
```

### Restore Database
```bash
# Restore from mongodump
mongorestore --db soilsense ./backup/soilsense

# Import from JSON
mongoimport --db soilsense --collection sensordatas sensordatas.json
```

### Backup Project
```bash
# Create full backup
tar -czf soilsense-backup.tar.gz .

# On Windows, use 7-Zip or built-in compression
```

---

## 🔐 Environment Setup

### Create .env File
```bash
# In Soilsense folder
echo "PORT=3000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/soilsense" >> .env
```

### View Environment Variables
```bash
# macOS/Linux
cat Soilsense/.env

# Windows
type Soilsense\.env
```

### Set Environment Variable (Temporary)
```bash
# macOS/Linux
export PORT=3000
export MONGODB_URI=mongodb://localhost:27017/soilsense

# Windows (cmd)
set PORT=3000
set MONGODB_URI=mongodb://localhost:27017/soilsense
```

---

## 📊 Performance Monitoring

### Monitor CPU/Memory
```bash
# macOS/Linux (live stats)
top -p $(lsof -t -i :3000)

# Windows (Task Manager)
taskmgr.exe

# Node-specific monitoring
npm install -g clinic
clinic doctor -- node Soilsense/src/server.js
```

### Profile Application
```bash
# Enable Node profiler
node --prof Soilsense/src/server.js
node --prof-process isolate-*.log > profile.txt

# Memory snapshot
node --heap-prof Soilsense/src/server.js
```

---

## 🐛 Error Recovery

### Fix "Port Already in Use"
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F
```

### Fix "Module Not Found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# In Soilsense folder too
cd Soilsense
rm -rf node_modules package-lock.json
npm install
cd ..
```

### Fix CORS Errors
```bash
# Verify CORS is enabled in Soilsense/src/app.js
# Restart backend server
# Clear browser cache (Cmd/Ctrl+Shift+Delete)
# Hard refresh (Cmd/Ctrl+Shift+R)
```

### Fix Map Not Loading
```bash
# Check console (F12)
# Verify Leaflet CSS/JS loaded in Network tab
# Clear browser cache
# Check internet connection (for CDN)
# Restart frontend: Ctrl+C, npm run dev
```

---

## 📚 Useful Links

```
Frontend: http://localhost:5173
Backend:  http://localhost:3000
API:      http://localhost:3000/api/sensordata
```

---

## 🆘 Quick Help

```bash
# Forgot how to start?
cat QUICK_START.md

# Need setup help?
cat INTEGRATION_GUIDE.md

# Need architecture details?
cat ARCHITECTURE.md

# See this commands list
cat COMMANDS.md
```

---

**✨ Most used commands:**

| Task | Command |
|------|---------|
| Start all | `./start-dev.sh` or `start-dev.bat` |
| Stop all | `Ctrl+C` in all terminals |
| Restart backend | `Ctrl+C`, `cd Soilsense && npm start` |
| Restart frontend | `Ctrl+C`, `npm run dev` |
| Kill stuck process | `lsof -ti:3000 \| xargs kill -9` |
| Check API | `curl http://localhost:3000/api/sensordata` |
| View logs | `F12` in browser or check terminal |
| Access MongoDB | `mongosh`, `use soilsense` |

Happy coding! 🚀
