require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const requestIdMiddleware = require("./middleware/requestId");
const loggingMiddleware = require("./middleware/logging");
const { Log } = require("./middleware/logger");

const app = express();
connectDB();

app.use(express.json());
app.use(requestIdMiddleware);
app.use(loggingMiddleware);

// Example manual logging
app.get("/test", async (req, res) => {
  await Log("backend", "error", "test-route", "Simulated test error occurred!");
  res.status(500).json({ error: "Test error" });
});

// Routes
app.use("/api/shorten", require("./routes/shorten"));
app.use("/", require("./routes/redirect"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
