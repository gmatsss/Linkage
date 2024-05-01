const express = require("express");
const router = express.Router();
const {
  handleIncomingCall,
  handleRecordingCompleted,
  handleVoicemail,
} = require("../controller/twilio");

router.post("/incoming", handleIncomingCall);
router.post("/recording-completed", handleRecordingCompleted);
router.post("/handlevoicemail", handleVoicemail);

module.exports = router;
