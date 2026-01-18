import SensorData from "../models/SensorData.js";

// 🟢 POST - Lưu dữ liệu cảm biến (theo tọa độ, timestamp)
export const saveSensorData = async (req, res) => {
    try {
        const { latitude, longitude, humidity, conductivity, temperature } = req.body;

        if (latitude == null || longitude == null) {
            return res.status(400).json({ error: "Thiếu thông tin tọa độ" });
        }

        // Lấy thời điểm hiện tại
        const timestamp = new Date();

        // Tìm document có cùng tọa độ
        let sensorDoc = await SensorData.findOne({ latitude, longitude });

        if (!sensorDoc) {
            // Nếu chưa có => tạo mới
            sensorDoc = new SensorData({
                latitude,
                longitude,
                records: [{ timestamp, humidity, conductivity, temperature }],
            });
        } else {
            // Nếu đã có => thêm bản ghi mới vào records
            sensorDoc.records.push({ timestamp, humidity, conductivity, temperature });
        }

        await sensorDoc.save();
        res.status(201).json({ message: "✅ Lưu dữ liệu thành công", data: sensorDoc });
    } catch (error) {
        console.error("❌ Lỗi khi lưu dữ liệu:", error);
        res.status(500).json({ error: "Lỗi khi lưu dữ liệu cảm biến" });
    }
};

// 🟣 GET - Lấy toàn bộ dữ liệu (mọi tọa độ)
export const getAllSensorData = async (req, res) => {
    try {
        const data = await SensorData.find();
        res.json(data);
    } catch (error) {
        console.error("❌ Lỗi khi tải dữ liệu:", error);
        res.status(500).json({ error: "Lỗi khi tải dữ liệu" });
    }
};

export const getSensorDataByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const start = new Date(date);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);

        const data = await SensorData.find({
            "records.timestamp": { $gte: start, $lt: end }
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🟠 GET - Lấy dữ liệu theo tọa độ (lọc theo ngày nếu có query)
export const getSensorDataByLocation = async (req, res) => {
    try {
        const { latitude, longitude } = req.params;
        const { date } = req.query; // ví dụ ?date=2025-11-04

        const sensorDoc = await SensorData.findOne({ latitude, longitude });
        if (!sensorDoc) {
            return res.status(404).json({ message: "❌ Không có dữ liệu cho tọa độ này" });
        }

        // Nếu có query ?date=YYYY-MM-DD thì lọc records trong ngày đó
        let filteredRecords = sensorDoc.records;
        if (date) {
            filteredRecords = sensorDoc.records.filter(r => {
                const recordDate = new Date(r.timestamp).toISOString().split("T")[0];
                return recordDate === date;
            });
        }

        res.status(200).json({
            latitude,
            longitude,
            records: filteredRecords,
        });
    } catch (error) {
        console.error("❌ Lỗi khi truy vấn dữ liệu:", error);
        res.status(500).json({ error: "Lỗi khi truy vấn dữ liệu" });
    }
};

// 🌍 RENDER - Trang bản đồ hiển thị dữ liệu đầy đủ (để map hiển thị tất cả marker)
export const renderMapPage = async (req, res) => {
    try {
        // Lấy toàn bộ document trong MongoDB (mỗi document là 1 tọa độ)
        const allData = await SensorData.find();

        // Gửi thẳng allData sang file EJS
        res.render("index", { data: allData });
    } catch (error) {
        console.error("❌ Lỗi khi render bản đồ:", error);
        res.render("error", { message: "Không thể tải bản đồ", error });
    }
};
