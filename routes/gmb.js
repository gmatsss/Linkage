const express = require("express");
const router = express.Router();
const { triggernewpost, latestpost } = require("../controller/gmbs");

router.post("/latestpost", latestpost);
router.get("/triggernewpost", triggernewpost);

module.exports = router;
