import Event from "../models/event.model.js";

export default class EventService {
	static async initializeEvent({ name, totalTickets }) {
		if (!name || !totalTickets) throw new Error("All fields needs to be filled");
		return Event.createEvent({ name, totalTickets });
	}

	static async getEventStatus(eventId) {
		if (!eventId) throw new Error("The event ID can't be empty");
		return Event.getEventById(eventId);
	}
}
