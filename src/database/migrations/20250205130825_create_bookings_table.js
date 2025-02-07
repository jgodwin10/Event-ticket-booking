export function up(knex) {
	return knex.schema.createTable("bookings", (table) => {
		table.string("id", 36).primary();
		table.string("event_id", 36).notNullable();
		table.string("user_email").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());

		// Foreign Key Constraint
		table.foreign("event_id").references("id").inTable("events").onDelete("CASCADE");

		// Unique Constraint for event and user email
		table.unique(["event_id", "user_email"]);

		// ✅ Indexes for faster queries
		table.index(["event_id", "user_email"]); // 🔹 Faster lookups for event-user bookings
		table.index("created_at"); // 🔹 Optimize filtering by date
	});
}

export function down(knex) {
	return knex.schema.dropTable("bookings");
}
