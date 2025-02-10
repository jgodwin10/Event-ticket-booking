import logger from "../utils/logger.js";

export const ErrorMiddleware = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	logger.error(`Error: ${err.message}`);
	res.status(statusCode).json({
		error: err.message,
	});
};
