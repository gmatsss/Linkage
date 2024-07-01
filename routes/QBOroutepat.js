const express = require("express");
const router = express.Router();
const authController = require("../controller/authQBO");

router.get("/callback", authController.handleCallback);

module.exports = router;
