const express = require("express");
const router = express.Router();
const { koalaArticles } = require("../controller/Koala");

router.get("/createarticel", koalaArticles);

module.exports = router;
