import request from "supertest";
import app from "../routes/index.js";
import db from "../config/db.js";

describe("Event Ticket Booking System API Tests", () => {
	let eventId;

	beforeAll(async () => {
		await db.migrate.latest(); // Run migrations
	});

	afterAll(async () => {
		await db.destroy(); // Close database connection after tests
	});

	test("POST /initialize - should initialize a new event", async () => {
		const response = await request(app).post("/api/events/initialize").send({
			name: "Tech Conference",
			totalTickets: 5,
		});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");
		eventId = response.body.id;
	});

	test("POST /book - should allow a user to book a ticket", async () => {
		const response = await request(app).post("/api/bookings/book").send({
			eventId: eventId,
			userEmail: "test@example.com",
		});

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Ticket booked successfully");
	});

	test("POST /book - should add user to waiting list if event is sold out, handling of concurrency/race condition", async () => {
		await request(app).post("/api/bookings/book").send({ eventId: eventId, userEmail: "user1@example.com" });
		await request(app).post("/api/bookings/book").send({ eventId: eventId, userEmail: "user2@example.com" });
		await request(app).post("/api/bookings/book").send({ eventId: eventId, userEmail: "user3@example.com" });
		await request(app).post("/api/bookings/book").send({ eventId: eventId, userEmail: "user4@example.com" });
		await request(app).post("/api/bookings/book").send({ eventId: eventId, userEmail: "user5@example.com" });

		const response = await request(app).post("/api/bookings/book").send({ eventId: eventId, userEmail: "user6@example.com" });
		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Event sold out, you're added to the waiting list");
	});

	test("POST /cancel - should cancel booking and reassign ticket from waiting list", async () => {
		const response = await request(app).post("/api/bookings/cancel").send({
			eventId: eventId,
			userEmail: "test@example.com",
		});

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Your booking has been cancelled successfully");
	});

	test("GET /status/:eventId - should return current event status", async () => {
		const response = await request(app).get(`/api/events/status/${eventId}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("available_tickets");
	});
});
