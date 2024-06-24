const express = require("express");
const router = express.Router();
const { koalaArticles } = require("../controller/Koala");

router.post("/createarticel", koalaArticles);

module.exports = router;
