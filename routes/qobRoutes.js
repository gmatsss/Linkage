const express = require("express");
const router = express.Router();
const authqob = require("../controller/qob"); // Make sure the path is correct

// Use the authorization middleware on routes that require authentication
// router.get("/auth", authqob.authorize);
// router.get("/callback", authqob.callback);
// router.get("/oauthredirect", authqob.handleOAuthRedirect);
router.post("/formatlineofitems", authqob.formatlineofitems);

module.exports = router;
