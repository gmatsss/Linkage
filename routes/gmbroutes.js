const express = require("express");
const router = express.Router();
const { triggernewpost, latestpost } = require("../controller/gmb");

router.get("/triggernewpost", triggernewpost);
router.post("/latestpost", latestpost);

module.exports = router;
