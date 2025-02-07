import knex from "knex";
import { Model } from "objection";
import env from "./env.js";

const db = knex({
	client: "mysql", // the database used
	connection: {
		host: env.DB_HOST,
		port: env.DB_PORT,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		database: env.DB_NAME,
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		tableName: "knex_migrations",
		directory: "./src/database/migrations",
	},
});

// Model.knex(db);

export default db;
