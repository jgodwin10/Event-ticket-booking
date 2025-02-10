import EventService from "../services/events.services.js";
import logger from "../utils/logger.js";

export async function initializeEvent(req, res, next) {
	try {
		const event = await EventService.initializeEvent(req.body);
		logger.info(`Incoming request: ${req.method} ${req.url}`);
		logger.info(`Event request: ${JSON.stringify(req.body)}`);
		res.status(201).json(event);
	} catch (error) {
		next(error);
	}
}

export async function getEventStatus(req, res, next) {
	try {
		const event = await EventService.getEventStatus(req.params.eventId);
		if (!event) return res.status(404).json({ error: "Event not found" });
		logger.info(`Incoming request: ${req.method} ${req.url}`);
		res.json(event);
	} catch (error) {
		next(error);
	}
}
