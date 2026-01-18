import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import app from "./app.js";
import { connectDatahubWS } from "./config/datahub.js"; 

dotenv.config();
connectDB();
connectDatahubWS(); // 🔥 Tự động kết nối WS và ghi DB

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
