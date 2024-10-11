const express = require("express");
const router = express.Router();
const { triggernewpost, latestpost } = require("../controller/gmbs");
const {
  triggernewpostbcremit,
  latestpostbcremit,
} = require("../controller/gmbsbcremit");

router.get("/triggernewpost", triggernewpost);
router.post("/latestpost", latestpost);

router.get("/triggernewpostbcremit", triggernewpostbcremit);
router.post("/latestpostbcremit", latestpostbcremit);

module.exports = router;
