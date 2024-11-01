const express = require("express");
const router = express.Router();
const { chatWithOpenAI } = require("../controller/openai");

router.post("/emailanalyze", chatWithOpenAI);

module.exports = router;
