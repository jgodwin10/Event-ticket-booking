// import db from "../config/db.js";

// export default class Booking {
// 	static async bookTicket(eventId, userEmail) {
// 		console.log(eventId);

// 		const [bookingId] = await db("bookings").insert({
// 			id: db.raw("UUID()"),
// 			event_id: eventId,
// 			user_email: userEmail,
// 		});

// 		// const [booking] = await db("bookings").insert({ event_id: eventId, user_email: userEmail }).returning("*");

// 		const newEvent = await db("bookings").where({ id: bookingId }).first();
// 		return newEvent;
// 	}

// 	static async getBooking(eventId, userEmail) {
// 		return db("bookings").where({ event_id: eventId, user_email: userEmail }).first();
// 	}

// 	static async cancelBooking(eventId, userEmail) {
// 		return db("bookings").where({ event_id: eventId, user_email: userEmail }).del();
// 	}
// }
