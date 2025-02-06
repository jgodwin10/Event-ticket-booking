import env from "./src/config/env.js";

export default {
	client: env.DB_CLIENT || "pg",
	connection: {
		host: env.DB_HOST || "127.0.0.1",
		user: env.DB_USER || "root",
		password: env.DB_PASSWORD || "",
		database: env.DB_NAME || "event_booking",
		charset: "utf8",
	},
	migrations: {
		tableName: "knex_migrations",
		directory: "./src/database/migrations",
	},
	useNullAsDefault: true,
};
