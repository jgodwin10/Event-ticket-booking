import express from "express";
import dotenv from "dotenv";
import eventRoutes from "./events.routes.js";
import bookingRoutes from "./bookings.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

export default app;
