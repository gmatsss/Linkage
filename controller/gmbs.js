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

    // Parse the allpost string into a JSON object if it's a string
    const allPostData =
      typeof req.body.allpost === "string"
        ? JSON.parse(req.body.allpost)
        : req.body.allpost;

    // Ensure localPosts exists before proceeding
    if (allPostData && allPostData.localPosts) {
      // Format the localPosts data
      const formattedPosts = allPostData.localPosts.map((post) => ({
        name: post.name,
        languageCode: post.languageCode,
        summary: post.summary,
        state: post.state,
        updateTime: post.updateTime,
        createTime: post.createTime,
        searchUrl: post.searchUrl,
        callToAction: post.callToAction || null, // Handle if callToAction is missing
        media: post.media || [], // Handle if media is missing
        topicType: post.topicType,
      }));

      // Return a successful response with the formatted data
      res.status(200).json({
        success: true,
        data: formattedPosts,
      });
    } else {
      // If localPosts doesn't exist, return an appropriate error response
      res.status(400).json({
        success: false,
        message: "localPosts is missing or invalid.",
      });
    }
  } catch (error) {
    // Handle errors
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  triggernewpost,
  latestpost,
};
