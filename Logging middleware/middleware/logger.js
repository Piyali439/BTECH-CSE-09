require("dotenv").config();

async function Log(stack, level, pkg, message) {
  const logEvent = {
    timestamp: new Date().toISOString(),
    stack,
    level,
    package: pkg,
    message
  };

  try {
    await fetch(process.env.LOG_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logEvent),
    });
  } catch (error) {
    console.error("⚠️ Logging failed:", error.message);
  }
}

module.exports = { Log };
