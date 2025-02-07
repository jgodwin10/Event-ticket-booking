// import db from "../config/db.js";

// export default class WaitingList {
// 	static async addToWaitingList(eventId, userEmail) {
// 		const [entryId] = await db("waiting_list").insert({ id: db.raw("UUID()"), event_id: eventId, user_email: userEmail });

// 		const newEvent = await db("waiting_list").where({ id: entryId }).first();
// 		console.log(newEvent);
// 		return newEvent;
// 	}

// 	static async getNextInLine(eventId) {
// 		return db("waiting_list").where({ event_id: eventId }).orderBy("created_at").first();
// 	}

// 	static async removeFromWaitingList(eventId, userEmail) {
// 		return db("waiting_list").where({ event_id: eventId, user_email: userEmail }).del();
// 	}
// }
