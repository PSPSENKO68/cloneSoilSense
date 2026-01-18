#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting SoilSense Drone Dashboard${NC}"
echo ""

# Check if ports are in use
check_port() {
  if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    return 0
  else
    return 1
  fi
}

# Start SoilSense Backend
if check_port 3000; then
  echo -e "${BLUE}⚠️  Port 3000 is already in use. Skipping backend startup.${NC}"
else
  echo -e "${GREEN}📡 Starting SoilSense Backend on port 3000...${NC}"
  cd Soilsense
  npm start &
  BACKEND_PID=$!
  cd ..
  sleep 3
fi

# Start Frontend
if check_port 5173; then
  echo -e "${BLUE}⚠️  Port 5173 is already in use. Skipping frontend startup.${NC}"
else
  echo -e "${GREEN}🎨 Starting Frontend on port 5173...${NC}"
  npm run dev &
  FRONTEND_PID=$!
fi

echo ""
echo -e "${GREEN}✅ Servers started!${NC}"
echo -e "${BLUE}📍 Frontend: http://localhost:5173${NC}"
echo -e "${BLUE}📍 Backend: http://localhost:3000${NC}"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Keep script running and handle cleanup
trap 'kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit' SIGINT

wait
