import WebSocket from "ws";
import { getAccessToken } from "../controllers/authController.js";
import SensorData from "../models/SensorData.js";

const BASE_URL = "wss://portal-datahub-24vn-ews.education.wise-paas.com/v1/RealData/ws";
const NODE_ID = "ab52c7dd-e9e7-4c96-9290-277521359e0c";
const DEVICE_ID = "01";
const TAGS = ["Latitude", "Longitude", "humidity", "conductivity", "temperature"]; // giữ đúng chữ hoa như DataHub

export async function connectDatahubWS() {
  try {
    const token = await getAccessToken();
    console.log("✅ Token mới lấy thành công:", token.slice(0, 20) + "...");

    const ws = new WebSocket(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    ws.on("open", () => {
      console.log("📡 WebSocket connected to Datahub");

      const subscribeMsg = {
        topic: "/realdata/raw/req",
        message: TAGS.map(tag => ({ nodeId: NODE_ID, deviceId: DEVICE_ID, tagName: tag })),
      };

      ws.send(JSON.stringify(subscribeMsg));
      console.log("📨 Đã gửi lệnh Subscribe tới Datahub:", subscribeMsg);
    });

    ws.on("message", async (msg) => {
      let dataArray;
      try {
        const parsed = JSON.parse(msg.toString());
        console.log("📥 Raw message from DataHub:", parsed);
        dataArray = parsed.message;
      } catch (err) {
        console.error("❌ Không parse được JSON:", err.message);
        return;
      }

      if (!Array.isArray(dataArray) || !dataArray.length) return;

      const recordMap = {};
      for (const item of dataArray) {
        const { tagName, value, ts } = item;
        if (!ts) continue;
        const timestamp = new Date(ts).toISOString();
        if (!recordMap[timestamp]) recordMap[timestamp] = {};
        recordMap[timestamp][tagName.toLowerCase()] = value;
      }

      // Xử lý từng record theo timestamp
      for (const [timestamp, record] of Object.entries(recordMap)) {
        if (record.latitude == null || record.longitude == null) continue;

        const latitude = parseFloat(record.latitude);
        const longitude = parseFloat(record.longitude);

        // Cập nhật document có cùng tọa độ (1 document / 1 vị trí)
        const updatedDoc = await SensorData.findOneAndUpdate(
          { latitude, longitude },
          {
            $push: {
              records: {
                timestamp: new Date(timestamp),
                humidity: record.humidity ?? null,
                conductivity: record.conductivity ?? null,
                temperature: record.temperature ?? null,
              },
            },
          },
          { upsert: true, new: true }
        );

        console.log(`✅ Lưu dữ liệu real-time:
        Latitude: ${latitude}, Longitude: ${longitude},
        Humidity: ${record.humidity}, Conductivity: ${record.conductivity}, Temperature: ${record.temperature},
        Timestamp: ${timestamp}`);
      }
    });

    ws.on("close", () => {
      console.warn("⚠️ WebSocket bị ngắt, đang thử kết nối lại...");
      setTimeout(connectDatahubWS, 10000);
    });

    ws.on("error", (err) => {
      console.error("❌ Lỗi WebSocket:", err.message);
    });

  } catch (err) {
    console.error("❌ Lỗi kết nối Datahub:", err.message);
    setTimeout(connectDatahubWS, 10000);
  }
}
