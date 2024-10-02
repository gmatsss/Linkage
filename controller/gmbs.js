const axios = require("axios");
const GmbPost = require("../model/GmbPost"); // Import your Mongoose model

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
    // Parse the allpost string into a JSON object if it's a string
    const allPostData =
      typeof req.body.allpost === "string"
        ? JSON.parse(req.body.allpost)
        : req.body.allpost;

    // Ensure localPosts exists before proceeding
    if (allPostData && allPostData.localPosts) {
      const formattedPosts = [];
      let newPostSaved = false; // Flag to track if a new post is saved

      // Iterate over each post
      for (const post of allPostData.localPosts) {
        const formattedPost = {
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
        };

        // Check if the post already exists in the database
        const existingPost = await GmbPost.findOne({ name: post.name });

        if (!existingPost) {
          // If post does not exist, save it to the database
          const newPost = new GmbPost(formattedPost);
          await newPost.save();
          console.log(`Post saved: ${post.name}`);
          formattedPosts.push({ ...formattedPost, status: "saved" });
          newPostSaved = true; // Set flag to true

          // Trigger Zapier webhook after saving the new post, only sending the saved post
          await axios.post(
            "https://hooks.zapier.com/hooks/catch/775472/2m6qaye/",
            {
              post: formattedPost, // Send the newly saved post data to Zapier
            }
          );
          console.log("Zapier webhook triggered for post:", post.name);
        } else {
          console.log(`Post already exists: ${post.name}`);
          formattedPosts.push({ ...formattedPost, status: "already exists" });
        }
      }

      if (!newPostSaved) {
        // If no new posts were saved, return a response indicating that all posts exist
        return res.status(200).json({
          success: true,
          message: "All posts already exist, no need to create.",
        });
      }

      // Return a successful response with the formatted data and statuses
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
