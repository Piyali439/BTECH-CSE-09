const express = require("express");
const Url = require("../models/Url");
const generateCode = require("../utils/codeGenerator");

const router = express.Router();

// POST /api/shorten
router.post("/", async (req, res) => {
  const { longUrl, expireAt } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "longUrl is required" });
  }

  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.json(url);
    } else {
      const code = generateCode();
      const shortUrl = `${process.env.BASE_URL}/${code}`;

      url = new Url({ code, longUrl, shortUrl, expireAt });
      await url.save();

      res.json(url);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
