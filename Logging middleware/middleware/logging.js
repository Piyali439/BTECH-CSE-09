const { Log } = require("./logger");

function loggingMiddleware(req, res, next) {
  const start = Date.now();

  res.on("finish", async () => {
    const duration = Date.now() - start;
    await Log(
      "backend",  // stack
      "info",     // level
      "http",     // package
      `[${req.requestId}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`
    );
  });

  next();
}

module.exports = loggingMiddleware;
