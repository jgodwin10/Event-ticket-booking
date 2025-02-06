import db from "../config/db.js";

export default class Booking {
	static async bookTicket(eventId, userEmail) {
		console.log(eventId);

		const [booking] = await db("bookings").insert({ event_id: eventId, user_email: userEmail }).returning("*")

		console.log(booking);
		return booking;
	}

	static async getBooking(eventId, userEmail) {
		return db("bookings").where({ event_id: eventId, user_email: userEmail }).first();
	}

	static async cancelBooking(eventId, userEmail) {
		return db("bookings").where({ event_id: eventId, user_email: userEmail }).del();
	}
}
