const express = require("express");
const router = express.Router();
const authController = require("../controller/authQBO");

router.get("/callback", authController.handleCallback);
// Route to initiate OAuth flow
router.get("/auth", authController.initiateAuth);

module.exports = router;
