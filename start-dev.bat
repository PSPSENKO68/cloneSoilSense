@echo off
REM SoilSense Drone Dashboard - Windows Startup Script

echo.
echo ===================================================
echo   SoilSense Drone Dashboard - Development Server
echo ===================================================
echo.

echo [1/2] Starting SoilSense Backend (Port 3000)...
echo.

cd Soilsense
start "SoilSense Backend" cmd /k npm start
cd ..

echo [2/2] Starting Frontend (Port 5173)...
echo.

timeout /t 3 /nobreak

start "Drone Dashboard Frontend" cmd /k npm run dev

echo.
echo ===================================================
echo   Servers Starting...
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:3000
echo ===================================================
echo.
echo Close these windows to stop the servers.
echo.

pause
