const OAuthClient = require("intuit-oauth");
const fs = require("fs");
const path = require("path");

const oauthClient = new OAuthClient({
  clientId: "ABoNbiEsX5FYK8xBfDLA17GF7wlimcikcUs3wMloCkZL82Sw",
  clientSecret: "eR9knrECwTpxcO1V1n7QjFWnD4j4ehRK8mvYK8c",
  environment: "production",
  redirectUri: "http://3.80.93.16:8002/QBO/callback",
});

// Function to load the token from a file
const loadToken = () => {
  try {
    const tokenData = fs.readFileSync(path.join(__dirname, "token.json"));
    return JSON.parse(tokenData);
  } catch (error) {
    console.error("Error loading token:", error);
    return null;
  }
};

// Function to save the token to a file
const saveToken = (token) => {
  try {
    fs.writeFileSync(path.join(__dirname, "token.json"), JSON.stringify(token));
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// Function to get a valid token
const getToken = async () => {
  let token = loadToken();
  if (token) {
    oauthClient.token.setToken(token);
  }

  if (!token || oauthClient.isAccessTokenExpired()) {
    try {
      token = await oauthClient.refresh();
      saveToken(token.getJson());
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  }
  return oauthClient.getToken().getToken();
};

module.exports = {
  oauthClient,
  getToken,
};
