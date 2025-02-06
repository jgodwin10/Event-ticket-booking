import express from "express";
import { initializeEvent, getEventStatus } from "../controllers/events.controller.js";

const router = express.Router();

router.post("/initialize", initializeEvent);
router.get("/status/:eventId", getEventStatus);

export default router;
