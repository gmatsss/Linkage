const axios = require("axios");

exports.koalaArticles = async (req, res) => {
  const apiUrl = "https://koala.sh/api/articles/";
  const apiKey = "YOUR_API_KEY";

  try {
    const response = await axios.post(
      apiUrl,
      {
        extraTitlePrompt: "",
        targetKeyword: "can you eat watermelon seeds?",
        webhookUrl: "",
        gptVersion: "gpt-4o",
        articleType: "blog_post",
        language: "English",
        toneOfVoiceProfile: "Friendly",
        includeFaq: true,
        readabilityMode: "8th_grade",
        shouldCiteSources: true,
        seoOptimizationLevel: "ai_powered",
        includeKeyTakeaways: true,
        country: "USA",
        multimediaOption: "images",
        imageStyle: "photo",
        maxImages: 3,
        maxVideos: 3,
        imageSize: "medium",
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      success: true,
      articleId: response.data.articleId,
      message: "Article successfully created in Koala.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create article in Koala.",
      error: error.message,
    });
  }
};
