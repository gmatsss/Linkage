const express = require("express");
const router = express.Router();
const {
  handleIncomingCall,
  handleRecordingCompleted,
} = require("../controller/twilio");

router.post("/incoming", handleIncomingCall);
router.post("/recording-completed", handleRecordingCompleted);

module.exports = router;
