import db from "../config/db.js";

export default class Event {
	static async createEvent({ name, totalTickets }) {
		const [eventId] = await db("events").insert({
			id: db.raw("UUID()"),
			name,
			total_tickets: totalTickets,
			available_tickets: totalTickets,
		});

		// Fetch the inserted record separately
		const newEvent = await db("events").where({ id: eventId }).first();

		return newEvent;
	}

	static async getEventById(eventId) {
		return db("events").where({ id: eventId }).first();
	}

	static async updateAvailableTickets(eventId, count) {
		console.log(count);
		(await db("events").where({ id: eventId }).decrement("available_tickets", count)).toString();
		console.log("updatedEvent");

		return;
	}
}
