const express = require("express");
const router = express.Router();
const { triggernewpost, latestpost } = require("../controller/gmbs");

router.get("/triggernewpost", triggernewpost);
router.post("/latestpost", latestpost);

module.exports = router;
