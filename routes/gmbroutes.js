const express = require("express");
const router = express.Router();
const {
  // getAuthUrl,
  // handleOAuth2Callback,
  // checkNewPosts,
  triggernewpost,
  latestpost,
} = require("../controller/gmb");

// // Route to start the OAuth2 flow
// router.get("/auth", getAuthUrl);

// // Route to handle the OAuth2 callback (Google will redirect here)
// router.get("/oauth2callback", handleOAuth2Callback);

// // Route to check for new GMB posts
// router.get("/check-new-posts", checkNewPosts);

router.get("/triggernewpost", triggernewpost);
router.post("/latestpost", latestpost);

module.exports = router;
