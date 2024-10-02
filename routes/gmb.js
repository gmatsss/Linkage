const express = require("express");
const router = express.Router();
<<<<<<< HEAD
<<<<<<< HEAD
const {
  getAuthUrl,
  handleOAuth2Callback,
  checkNewPosts,
} = require("../controller/gmb");

// Route to start the OAuth2 flow
router.get("/auth", getAuthUrl);

// Route to handle the OAuth2 callback (Google will redirect here)
router.get("/oauth2callback", handleOAuth2Callback);

// Route to check for new GMB posts
router.get("/check-new-posts", checkNewPosts);
=======
const { triggernewpost, latestpost } = require("../controller/gmb");
=======
const { triggernewpost, latestpost } = require("../controller/gmbs");
>>>>>>> 9c1b6acbcca09a845af1091a87ce25f1b1589500

router.get("/triggernewpost", triggernewpost);
router.post("/latestpost", latestpost);
>>>>>>> 13081a6b82b96cad53c440f2406f2a2216f4e6eb

module.exports = router;
