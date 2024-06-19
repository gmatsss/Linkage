const express = require("express");
const router = express.Router();
const { getTranscriptSummary } = require("../controller/fireflies");

router.post("/transcript", getTranscriptSummary);

module.exports = router;
