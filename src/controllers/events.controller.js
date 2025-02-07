import EventService from "../services/events.services.js";

export async function initializeEvent(req, res, next) {
	try {
		const event = await EventService.initializeEvent(req.body);
		res.status(201).json(event);
	} catch (error) {
		next(error);
	}
}

export async function getEventStatus(req, res, next) {
	try {
		const event = await EventService.getEventStatus(req.params.eventId);
		if (!event) return res.status(404).json({ error: "Event not found" });
		res.json(event);
	} catch (error) {
		next(error);
	}
}
