import db from "../config/db.js";

export default class BookingService {
	static async bookTicket(eventId, userEmail) {
		if (!eventId || !userEmail) throw new Error("All fields need to be filled");

		let retries = 3; // Retry mechanism for deadlocks

		while (retries > 0) {
			try {
				return await db.transaction(async (trx) => {
					// Check if the user already booked
					const existingBooking = await trx("bookings").where({ event_id: eventId, user_email: userEmail }).first();
					const existingEvent = await trx("events").where({ id: eventId }).first();

					if (existingBooking) throw new Error("You already booked this event");
					if (!existingEvent) throw new Error("This event does not exist");

					// Lock the event row and get available tickets
					const event = await trx("events").where({ id: eventId }).select("available_tickets").forUpdate(); // Prevents concurrent modifications

					if (!event.length || event[0].available_tickets <= 0) {
						await trx("waiting_list").insert({ id: db.raw("UUID()"), event_id: eventId, user_email: userEmail });
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

		throw new Error("Booking failed after multiple attempts");
	}

	static async cancelBooking(eventId, userEmail) {
		if (!eventId || !userEmail) throw new Error("All fields need to be filled");

		return await db.transaction(async (trx) => {
			const booking = await trx("bookings").where({ event_id: eventId, user_email: userEmail }).first();

			if (!booking) throw new Error("You didn't book this event");

			// Cancel the booking
			await trx("bookings").where({ event_id: eventId, user_email: userEmail }).del();

			// Check if anyone is on the waiting list
			const nextUser = await trx("waiting_list").where({ event_id: eventId }).orderBy("created_at", "asc").first();

			if (nextUser) {
				// Book the ticket for the next user and remove from the waiting list
				await trx("bookings").insert({ id: db.raw("UUID()"), event_id: eventId, user_email: nextUser.user_email });
				await trx("waiting_list").where({ event_id: eventId, user_email: nextUser.user_email }).del();
			} else {
				// Increment the available tickets if no one is in the queue
				await trx("events").where({ id: eventId }).increment("available_tickets", 1);
			}

			return { message: "Your booking has been canceled successfully" };
		});
	}
}
