export function up(knex) {
	return knex.schema.createTable("bookings", (table) => {
		table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
		table.uuid("event_id").notNullable();
		table.string("user_email").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        
        table.foreign("event_id").references("id").inTable("events").onDelete("CASCADE").deferrable("deferred");

		table.unique(["event_id", "user_email"]);
	});
}

export function down(knex) {
	return knex.schema.dropTable("bookings");
}
