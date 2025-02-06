import db from "../config/db.js";

export default class WaitingList {
	static async addToWaitingList(eventId, userEmail) {
		const [entry] = await db("waiting_list").insert({ event_id: eventId, user_email: userEmail }).returning("*");
		console.log(entry);
		return entry;
	}

	static async getNextInLine(eventId) {
		return db("waiting_list").where({ event_id: eventId }).orderBy("created_at").first();
	}

	static async removeFromWaitingList(eventId, userEmail) {
		return db("waiting_list").where({ event_id: eventId, user_email: userEmail }).del();
	}
}
