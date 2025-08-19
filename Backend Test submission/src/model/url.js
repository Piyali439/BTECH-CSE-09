const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date } // Optional expiration
});

module.exports = mongoose.model("Url", urlSchema);
