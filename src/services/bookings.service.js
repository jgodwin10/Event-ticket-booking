import db from "../config/db.js";
import Booking from "../models/booking.model.js";
import Event from "../models/event.model.js";
import WaitingList from "../models/waitingList.model.js";

export default class BookingService {
	static async bookTicket(eventId, userEmail) {
		return db.transaction(async (trx) => {
			const event = await trx("events").where({ id: eventId }).first().forUpdate();

			console.log(event, "id om");

			if (!event) throw new Error("No Event found, check back later");

			if (event.available_tickets > 0) {
				await Booking.bookTicket(event.id, userEmail);
				console.log("Event available");
				await Event.updateAvailableTickets(event.id, event.available_tickets - 1);
				return { message: "Ticket is booked successfully" };
			} else {
				console.log("Event not available");
				await WaitingList.addToWaitingList(event.id, userEmail);
				return { message: "Event sold out, you're added to waiting list" };
			}
		});
	}

	static async cancelBooking(eventId, userEmail) {
		return db.transaction(async (trx) => {
			const booking = await trx("bookings").where({ event_id: eventId, user_email: userEmail }).first();

			if (!booking) throw new Error("It seems like you didn't Book this Event");

			await Booking.cancelBooking(eventId, userEmail);

			const nextUser = await WaitingList.getNextInLine(eventId);
			if (nextUser) {
				await Booking.bookTicket(eventId, nextUser.user_email);
				await WaitingList.removeFromWaitingList(eventId, nextUser.user_email);
			} else {
				const event = await trx("events").where({ id: eventId }).first();
				await Event.updateAvailableTickets(eventId, event.available_tickets + 1);
			}

			return { message: "Your Booking is cancelled successfully" };
		});
	}
}
