const axios = require("axios");
const GmbPost = require("../model/GmbPostbcremit");
const cron = require("node-cron");

const triggernewpostbcremit = async (req, res) => {
  try {
    const response = await axios.post(
      "https://hooks.zapier.com/hooks/catch/775472/21ollff/",
      {
        summary: "Getpostbcremit",
      }
    );
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const latestpostbcremit = async (req, res) => {
  try {
    const allPostData =
      typeof req.body.allpost === "string"
        ? JSON.parse(req.body.allpost)
        : req.body.allpost;

    if (allPostData && allPostData.localPosts) {
      const formattedPosts = [];
      let newPostSaved = false;

      for (const post of allPostData.localPosts) {
        const formattedPost = {
          name: post.name,
          languageCode: post.languageCode,
          summary: post.summary,
          state: post.state,
          updateTime: post.updateTime,
          createTime: post.createTime,
          searchUrl: post.searchUrl,
          callToAction: post.callToAction || null,
          media: post.media || [],
          topicType: post.topicType,
        };

        const existingPost = await GmbPost.findOne({ name: post.name });

        if (!existingPost) {
          const newPost = new GmbPost(formattedPost);
          await newPost.save();
          console.log(`Post saved: ${post.name}`);
          formattedPosts.push({ ...formattedPost, status: "saved" });
          newPostSaved = true;

          await axios.post(
            "https://hooks.zapier.com/hooks/catch/775472/21ollld/",
            {
              post: formattedPost,
            }
          );
          console.log("Zapier webhook triggered for post:", post.name);
        } else {
          console.log(`Post already exists: ${post.name}`);
          formattedPosts.push({ ...formattedPost, status: "already exists" });
        }
      }

      if (!newPostSaved) {
        return res.status(200).json({
          success: true,
          message: "All posts already exist, no need to create.",
        });
      }

      res.status(200).json({
        success: true,
        data: formattedPosts,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "localPosts is missing or invalid.",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

cron.schedule("0 * * * *", async () => {
  try {
    console.log("Cron job started: Triggering new post check...");
    await triggernewpost(
      { body: {} },
      {
        status: (code) => ({
          json: (data) => console.log(`Response: ${code}`, data),
        }),
      }
    );
    console.log("Cron job completed: New post check triggered.");
  } catch (error) {
    console.error("Error running the cron job:", error.message);
  }
});

// cron.schedule("* * * * *", async () => {
//   // This will run every minute
//   try {
//     console.log("Cron job started: Triggering new post check...");

//     // Call the triggernewpost function with mock request and response objects
//     await triggernewpost(
//       { body: {} }, // Simulate req object
//       {
//         status: (code) => ({
//           json: (data) => console.log(`Response: ${code}`, data),
//         }),
//       }
//     );

//     console.log("Cron job completed: New post check triggered.");
//   } catch (error) {
//     console.error("Error running the cron job:", error.message);
//   }
// });

module.exports = {
  triggernewpostbcremit,
  latestpostbcremit,
};
