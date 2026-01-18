import express from "express";
import {
    saveSensorData,
    getAllSensorData,
    getSensorDataByDate,  
    renderMapPage,
} from "../controllers/sensorController.js";

const router = express.Router();

// 🌍 Trang chính (hiển thị bản đồ + dữ liệu)
router.get("/", renderMapPage);

// 🟣 API - Lấy toàn bộ dữ liệu
router.get("/api/sensordata", getAllSensorData);

// 🟢 API - Lưu dữ liệu mới
router.post("/api/sensordata", saveSensorData);

// 🟠 API - Lấy dữ liệu theo tọa độ và ngày
// Ví dụ: /api/sensordata/10.776/106.700/2025-10-30
router.get("/api/sensordata/:latitude/:longitude/:date", getSensorDataByDate);

export default router;
