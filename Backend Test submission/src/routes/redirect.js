const express = require("express");
const Url = require("../models/Url");

const router = express.Router();

// GET /:code
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ code: req.params.code });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    if (url.expireAt && url.expireAt < new Date()) {
      return res.status(410).json({ error: "URL expired" });
    }

    url.clicks++;
    await url.save();

    return res.redirect(url.longUrl);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
