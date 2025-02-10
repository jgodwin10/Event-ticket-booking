import db from "../config/db.js";
import AppError from "../utils/Error.js";
import logger from "../utils/logger.js";
import { isValidEmail } from "../utils/validEmail.js";

export default class BookingService {
	static async bookTicket(eventId, userEmail) {
		if (!eventId || !userEmail) throw new AppError("All fields need to be filled", 400);

		if (!isValidEmail(userEmail)) throw new AppError("Invalid email format", 400);

		let retries = 3; // Retry mechanism for deadlocks

		while (retries > 0) {
			try {
				return await db.transaction(async (trx) => {
					// Check if the user already booked
					const existingBooking = await trx("bookings").where({ event_id: eventId, user_email: userEmail }).first();
					const existingEvent = await trx("events").where({ id: eventId }).first();

					if (!existingEvent) throw new AppError("No event found, check back later", 404);

					if (existingBooking) throw new AppError("You already booked this event", 409);

					// Lock the event row and get available tickets
					const event = await trx("events").where({ id: eventId }).select("available_tickets").forUpdate(); // Prevents concurrent modifications

					if (!event.length || event[0].available_tickets <= 0) {
						await trx("waiting_list").insert({ id: db.raw("UUID()"), event_id: eventId, user_email: userEmail });
						logger.info(`Booking successfull, User: ${userEmail} on Event: ${eventId} is added to waitlist`);
						return { message: "Event sold out, you're added to the waiting list" };
					}

					// Decrement available tickets
					await trx("events").where({ id: eventId }).decrement("available_tickets", 1);

					// Book the ticket
					await trx("bookings").insert({ id: db.raw("UUID()"), event_id: eventId, user_email: userEmail });

					return { message: "Ticket booked successfully" };
				});
			} catch (error) {
				if (error.code === "ER_LOCK_DEADLOCK" || error.code === "ER_LOCK_WAIT_TIMEOUT") {
					console.warn("Transaction conflict, retrying...");
					retries--;
				} else {
					throw error;
				}
			}
		}

		throw new AppError("Booking failed after multiple attempts", 429);
	}

	static async cancelBooking(eventId, userEmail) {
		if (!eventId || !userEmail) throw new AppError("All fields need to be filled", 400);

		if (!isValidEmail(userEmail)) throw new AppError("Invalid email format", 400);

		return await db.transaction(async (trx) => {
			const existingEvent = await trx("events").where({ id: eventId }).first();
			const booking = await trx("bookings").where({ event_id: eventId, user_email: userEmail }).first();

			if (!existingEvent) throw new AppError("No event found, check back later", 404);

			if (!booking) throw new AppError("You didn't book this event", 404);

			// Cancel the booking
			await trx("bookings").where({ event_id: eventId, user_email: userEmail }).del();

			// Check if anyone is on the waiting list
			const nextUser = await trx("waiting_list").where({ event_id: eventId }).orderBy("created_at", "asc").first();

			if (nextUser) {
				logger.info(`Cancellation processed - User: ${userEmail} canceled. Assigned to next waiting user: ${nextUser}`);
				// Book the ticket for the next user and remove from the waiting list
				await trx("bookings").insert({ id: db.raw("UUID()"), event_id: eventId, user_email: nextUser.user_email });
				await trx("waiting_list").where({ event_id: eventId, user_email: nextUser.user_email }).del();
			} else {
				logger.info(`Cancellation processed - User: ${userEmail} canceled. No users on waiting list.`);
				// Increment the available tickets if no one is in the queue
				await trx("events").where({ id: eventId }).increment("available_tickets", 1);
			}

			return { message: "Your booking has been cancelled successfully" };
		});
	}
}
