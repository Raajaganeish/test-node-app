const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views/shop.html"));
});

// Note above request will match for exact "/" since method is GET - POST - PUT -DELETE

// if we use router.use() - it will be handled for all

module.exports = router;
