import Event from "../models/event.model.js";
import AppError from "../utils/Error.js";

export default class EventService {
	static async initializeEvent({ name, totalTickets }) {
		if (!name || !totalTickets) throw new AppError("All fields needs to be filled", 400);
		return Event.createEvent({ name, totalTickets });
	}

	static async getEventStatus(eventId) {
		if (!eventId) throw new AppError("The event ID can't be empty", 400);
		return Event.getEventById(eventId);
	}
}
