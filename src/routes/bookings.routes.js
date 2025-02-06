import express from "express";
import { bookTicket, cancelBooking } from "../controllers/bookings.controller.js";

const router = express.Router();

router.post("/book", bookTicket);
router.post("/cancel", cancelBooking);

export default router;
