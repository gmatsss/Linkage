const express = require("express");
const router = express.Router();
const {
  handleIncomingCall,
  handleRecordingCompleted,
  handleVoicemail,
  handleKey,
} = require("../controller/twilio");

router.post("/incoming", handleIncomingCall);
router.post("/recording-completed", handleRecordingCompleted);
router.post("/handleKey", handleKey);

module.exports = router;
