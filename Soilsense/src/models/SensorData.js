import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    timestamp: { type: Date }, // thời điểm đo thực tế từ DataHub
    conductivity: Number,
    humidity: Number,
    temperature: Number,
});

const sensorDataSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    records: [recordSchema],
});

sensorDataSchema.index({ latitude: 1, longitude: 1 }, { unique: true });

export default mongoose.model("SensorData", sensorDataSchema);
