export function up(knex) {
	return knex.schema.createTable("events", (table) => {
		table.string("id", 36).primary();
		table.string("name", 255).notNullable();
		table.integer("total_tickets").notNullable();
		table.integer("available_tickets").notNullable().index(); // ✅ Index for fast availability checks
		table.timestamp("created_at").defaultTo(knex.fn.now());

		table.index("name"); // ✅ Index for searching events by name
	});
}

export function down(knex) {
	return knex.schema.dropTable("events");
}
