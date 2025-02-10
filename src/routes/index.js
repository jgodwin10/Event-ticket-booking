import express from "express";
import dotenv from "dotenv";
import eventRoutes from "./events.routes.js";
import bookingRoutes from "./bookings.routes.js";
import limiter from "../utils/rateLimit.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(limiter);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

export default app;
