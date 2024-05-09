const express = require("express");
const router = express.Router();
const {
  handleIncomingCall,
  handleRecordingCompleted,
  handleKey,
} = require("../controller/twilio");

const {
  handleIncomingCalllink,
  handleRecordingCompletedlink,

  handleKeylink,
} = require("../controller/twilio_linkage");

router.post("/incoming", handleIncomingCall);
router.post("/recording-completed", handleRecordingCompleted);
router.post("/handleKey", handleKey);

router.post("/incominglink", handleIncomingCalllink);
router.post("/recording-completedlink", handleRecordingCompletedlink);
router.post("/handleKeylink", handleKeylink);

module.exports = router;
