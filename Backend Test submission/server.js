require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
//const requestIdMiddleware = require("./middleware/requestId");
const loggingMiddleware = require("./middleware/logging");

const app = express();
connectDB();

app.use(express.json());
//app.use(requestIdMiddleware);
app.use(loggingMiddleware);

// Routes
app.use("/api/shorten", require("./src/routes/shorten"));
app.use("/", require("./src/routes/redirect"));

const Url = require("./src/model/url");
const codeGenerator = require("./src/utils/codeGenerator");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
