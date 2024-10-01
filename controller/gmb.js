// gmbController.js
const { google } = require("googleapis");
require("dotenv").config();

// Set up OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  "1078804589614-4rfmn9rovb8346s2g7ln2bgarlarb7g9.apps.googleusercontent.com", // Client ID
  "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", // Client Secret
  "http://3.80.93.16:8002/gmb/oauth2callback"
);

// This will store the refresh token
let storedRefreshToken = null;

// Function to start OAuth flow (send user to Google for authorization)
const getAuthUrl = (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline", // Ensure we get a refresh token
    scope: ["https://www.googleapis.com/auth/business.manage"], // Scope for GMB
  });
  res.redirect(authUrl);
};

// OAuth2 callback (Google redirects back with authorization code)
const handleOAuth2Callback = async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send("Authorization code not found");
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code); // Exchange code for tokens
    oAuth2Client.setCredentials(tokens);

    // Store the refresh token for future use
    storedRefreshToken = tokens.refresh_token;
    console.log("Refresh Token:", storedRefreshToken);

    res.status(200).send("Authorization successful, refresh token stored!");
  } catch (error) {
    console.error("Error during OAuth callback:", error);
    res.status(500).send("Failed to exchange authorization code for tokens.");
  }
};

// Function to check for new posts on Google My Business
const checkNewPosts = async (req, res) => {
  const locationId = process.env.LOCATION_ID;

  // Ensure we have a refresh token set
  if (!storedRefreshToken) {
    return res
      .status(400)
      .send("No refresh token stored. Please authenticate first.");
  }

  // Set credentials with stored refresh token
  oAuth2Client.setCredentials({ refresh_token: storedRefreshToken });

  try {
    const response = await myBusiness.accounts.locations.localPosts.list({
      parent: `accounts/${process.env.ACCOUNT_ID}/locations/${locationId}`,
    });

    const posts = response.data.localPosts || [];
    if (posts.length > 0) {
      res.status(200).json({
        message: "New posts found",
        posts: posts.map((post) => ({
          postId: post.name,
          summary: post.summary,
          createdTime: post.createTime,
        })),
      });
    } else {
      res.status(200).json({ message: "No new posts." });
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

// Export the functions
module.exports = {
  getAuthUrl,
  handleOAuth2Callback,
  checkNewPosts,
};
