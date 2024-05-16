//Linkage
const express = require("express");
const router = express.Router();
const {
  handleIncomingCalllink,
  handleRecordingCompletedlink,
  handleKeylink,
  handleIncomingCallSales,
} = require("../controller/twilio_linkage");

router.post("/incominglink", handleIncomingCalllink);
router.post("/recording-completedlink", handleRecordingCompletedlink);
router.post("/handleKeylink", handleKeylink);
router.post("/handleIncomingCallSales", handleIncomingCallSales);

module.exports = router;
