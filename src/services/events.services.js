import Event from "../models/event.model.js";

export default class EventService {
	static async initializeEvent({ name, totalTickets }) {
		return Event.createEvent({ name, totalTickets });
	}

	static async getEventStatus(eventId) {
		return Event.getEventById(eventId);
	}
}
