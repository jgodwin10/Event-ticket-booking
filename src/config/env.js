import dotenv from "dotenv";

dotenv.config();

const env = {
	NODE_ENV: process.env.NODE_ENV || "development",
	PORT: process.env.PORT || 5000,

	// Database Configuration
	DB_HOST: process.env.DB_HOST || "localhost",
	DB_PORT: process.env.DB_PORT || 5432, // Change to 3306 for MySQL
	DB_USER: process.env.DB_USER || "postgres",
	DB_PASSWORD: process.env.DB_PASSWORD || "password",
	DB_NAME: process.env.DB_NAME || "event_booking_db",

	// JWT Secret
	JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",

	// Rate Limit
	RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000, // 15 mins
	RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100, // 100 requests per window

	// Logging
	LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

export default env;
