const { OAuthClient } = require("intuit-oauth");
const { oauthClient, getToken, saveToken } = require("../utils/oauthQBO");

exports.initiateAuth = (req, res) => {
  // Assuming the scopes are documented as strings like "com.intuit.quickbooks.accounting"
  const authUri = oauthClient.authorizeUri({
    scope: ["com.intuit.quickbooks.accounting", "openid"], // Update these scope strings as needed
    state: "intuit_csrf_token", // CSRF protection token
  });
  res.redirect(authUri);
};

exports.handleCallback = async (req, res) => {
  try {
    const token = await oauthClient.createToken(req.query);
    saveToken(token.getJson());
    res.send("Token obtained and saved successfully");
  } catch (err) {
    console.error("Error handling callback:", err);
    res.status(500).send("Error handling callback");
  }
};
