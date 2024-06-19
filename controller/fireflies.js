const axios = require("axios");
require("dotenv").config();

exports.getTranscriptSummary = async (req, res) => {
  const api_key = process.env.FIREFLIES_API_KEY;
  const transcriptId = req.body.transcriptId;

  const url = "https://api.fireflies.ai/graphql";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${api_key}`,
  };

  const data = {
    query: `query Transcript($transcriptId: String!) {
            transcript(id: $transcriptId) {
                summary {
                    action_items
                    keywords
                    outline
                    overview
                    shorthand_bullet
                }
            }
        }`,
    variables: { transcriptId: transcriptId },
  };

  axios
    .post(url, data, { headers: headers })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
};
