const { oauthClient } = require("../utils/oauthQBO");
const { saveToken } = require("../utils/oauthQBO");

exports.handleCallback = async (req, res) => {
  try {
    const token = await oauthClient.createToken(req.url);
    saveToken(token.getJson());
    res.send("Token obtained and saved successfully");
  } catch (err) {
    console.error("Error handling callback:", err);
    res.status(500).send("Error handling callback");
  }
};
