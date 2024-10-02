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
    // Log the incoming data (req.body)
    console.log(req.body);

    // Assuming the req.body is the data you showed earlier, parse and return it in a formatted response
    const formattedPosts = req.body.localPosts.map((post) => ({
      name: post.name,
      languageCode: post.languageCode,
      summary: post.summary,
      state: post.state,
      updateTime: post.updateTime,
      createTime: post.createTime,
      searchUrl: post.searchUrl,
      callToAction: post.callToAction || null, // If exists, include it, else null
      media: post.media || [], // If media exists, include it, else an empty array
      topicType: post.topicType,
    }));

    // Return the formatted response with a status of 200
    res.status(200).json({
      success: true,
      data: formattedPosts,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  triggernewpost,
  latestpost,
};
