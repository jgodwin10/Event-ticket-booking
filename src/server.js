import app from "./routes/index.js";
import env from "./config/env.js";
import { ErrorMiddleware } from "./middlewares/error.middleware.js";

const PORT = env.PORT || 5000;

app.use(ErrorMiddleware);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
