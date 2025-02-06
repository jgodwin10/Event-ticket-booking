import db from "../config/db.js";

export default class Event {
	static async createEvent({ name, totalTickets }) {
		const [event] = await db("events")
			.insert({
				name,
				total_tickets: totalTickets,
				available_tickets: totalTickets,
			})
			.returning("*");
		return event;
	}

	static async getEventById(eventId) {
		return db("events").where({ id: eventId }).first();
	}

	static async updateAvailableTickets(eventId, count) {
		return db("events").where({ id: eventId }).update({ available_tickets: count });
	}
}
