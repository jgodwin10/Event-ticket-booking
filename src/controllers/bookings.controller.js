import BookingService from "../services/bookings.service.js";

export async function bookTicket(req, res) {
	try {
		const response = await BookingService.bookTicket(req.body.eventId, req.body.userEmail);
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function cancelBooking(req, res) {
	try {
		const response = await BookingService.cancelBooking(req.body.eventId, req.body.userEmail);
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
