export function up(knex) {
	return knex.schema.createTable("waiting_list", (table) => {
		table.string("id", 36).primary()
		table.string("event_id", 36).notNullable();
		table.string("user_email", 255).notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());

		// Foreign Key Constraint
		table.foreign("event_id").references("id").inTable("events").onDelete("CASCADE");
	});
}

export function down(knex) {
	return knex.schema.dropTable("waiting_list");
}
