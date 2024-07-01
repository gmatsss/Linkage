const { OAuthClient } = require("intuit-oauth");
const { oauthClient, getToken, saveToken } = require("../utils/oauthQBO");

exports.initiateAuth = (req, res) => {
  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
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
