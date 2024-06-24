const mongoose = require("mongoose");

const accessTokenSchema = new mongoose.Schema({
  accessToken: String,
  expiresIn: Number,
  tokenType: String,
  scope: String,
  obtainedAt: { type: Date, default: Date.now },
});

const AccessToken = mongoose.model("AccessToken", accessTokenSchema);

module.exports = AccessToken;
