const express = require("express");
const router = express.Router();
const { handleIncomingCall } = require("../controller/twilio");

router.post("/incoming", handleIncomingCall);

module.exports = router;
