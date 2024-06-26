//Linkage
const express = require("express");
const router = express.Router();
const {
  handleIncomingCalllink,
  handleRecordingCompletedlink,
  handleKeylink,
  handleIncomingCallSupport,
  holdcall,
  dequeueAndRedirect,
} = require("../controller/twilio_linkage");

router.post("/incominglink", handleIncomingCalllink);
router.post("/recording-completedlink", handleRecordingCompletedlink);
router.post("/handleKeylink", handleKeylink);

router.post("/handleIncomingCallSupport", handleIncomingCallSupport);
router.post("/holdcall", holdcall);
router.post("/dequeueAndRedirect", dequeueAndRedirect);

module.exports = router;
