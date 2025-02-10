import env from "./src/config/env.js";

export default {
	development: {
		client: env.DB_CLIENT || "mysql2",
		connection: {
			host: env.DB_HOST || "127.0.0.1",
			user: env.DB_USER || "root",
			password: env.DB_PASSWORD || "",
			database: env.DB_NAME || "event_booking_db",
			charset: "utf8",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./src/database/migrations",
		},
		useNullAsDefault: true,
	},
};
