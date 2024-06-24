const express = require("express");
const router = express.Router();
const { koalaArticles } = require("../controller/Koala");

router.get("/indeed", koalaArticles);

module.exports = router;
