export function up(knex) {
	return knex.schema.createTable("events", (table) => {
		table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
		table.string("name").notNullable();
		table.integer("total_tickets").notNullable();
		table.integer("available_tickets").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
	});
}

export function down(knex) {
	return knex.schema.dropTable("events");
}
