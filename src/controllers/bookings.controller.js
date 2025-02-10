import BookingService from "../services/bookings.service.js";
import logger from "../utils/logger.js";

export async function bookTicket(req, res, next) {
	try {
		const response = await BookingService.bookTicket(req.body.eventId, req.body.userEmail);
		logger.info(`Incoming request: ${req.method} ${req.url}`);
		logger.info(`User booking request: ${JSON.stringify(req.body)}`);
		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
}

export async function cancelBooking(req, res, next) {
	try {
		const response = await BookingService.cancelBooking(req.body.eventId, req.body.userEmail);
		logger.info(`Incoming request: ${req.method} ${req.url}`);
		logger.info(`User booking request: ${JSON.stringify(req.body)}`);
		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
}
