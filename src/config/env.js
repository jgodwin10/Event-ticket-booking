import dotenv from "dotenv";

dotenv.config();

const env = {
	NODE_ENV: process.env.NODE_ENV || "development",
	PORT: process.env.PORT || 5000,

	// Database Configuration
	DB_HOST: process.env.DB_HOST || "localhost",
	DB_PORT: process.env.DB_PORT || 3306, // MySQL PORT
	DB_CLIENT: process.env.DB_CLIENT || "mysql2", // MySQL PORT
	DB_USER: process.env.DB_USER || "root",
	DB_PASSWORD: process.env.DB_PASSWORD || "password",
	DB_NAME: process.env.DB_NAME || "event_booking_db",
};

export default env;
