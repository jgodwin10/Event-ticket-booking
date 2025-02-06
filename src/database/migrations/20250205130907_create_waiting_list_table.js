export function up(knex) {
	return knex.schema.createTable("waiting_list", (table) => {
		table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
		table.uuid("event_id").references("id").inTable("events").onDelete("CASCADE");
		table.string("user_email").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
	});
}

export function down(knex) {
	return knex.schema.dropTable("waiting_list");
}
