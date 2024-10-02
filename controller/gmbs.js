const axios = require("axios");

const triggernewpost = async (req, res) => {
  try {
    const response = await axios.post(
      "https://hooks.zapier.com/hooks/catch/775472/2m34udu/",
      {
        summary: "Getpost",
      }
    );

    // Responding with success
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    // Handling errors
    res.status(500).json({ success: false, message: error.message });
  }
};

const latestpost = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    // Handling errors
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  triggernewpost,
  latestpost,
};
