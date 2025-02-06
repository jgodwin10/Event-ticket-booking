import app from "./routes/index.js";
import env from "./config/env.js";

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
