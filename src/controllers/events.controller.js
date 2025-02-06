import EventService from "../services/events.services.js";

export async function initializeEvent(req, res) {
	try {
		const event = await EventService.initializeEvent(req.body);
		res.status(201).json(event);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function getEventStatus(req, res) {
	try {
		const event = await EventService.getEventStatus(req.params.eventId);
		if (!event) return res.status(404).json({ error: "Event not found" });
		res.json(event);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
