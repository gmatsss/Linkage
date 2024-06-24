const axios = require("axios");

exports.koalaArticles = async (req, res) => {
  const apiUrl = "https://koala.sh/api/articles/";
  const apiKey = "4c2d075a-b36e-4d45-8198-59b4fe55ae98";

  const { title, keywords, articleLength, toneOfVoice, articleType } = req.body;
  try {
    const response = await axios.post(
      apiUrl,
      {
        extraTitlePrompt: title,
        targetKeyword: keywords,
        articleLength: articleLength,
        toneOfVoiceProfile: toneOfVoice,
        articleType: articleType,
        webhookUrl: "https://hooks.zapier.com/hooks/catch/775472/2b9ia20/",
        gptVersion: "gpt-4o",
        language: "English",
        includeFaq: true,
        shouldCiteSources: true,
        seoOptimizationLevel: "ai_powered",
        includeKeyTakeaways: true,
        country: "USA",
        multimediaOption: "auto",
        imageStyle: "photo",
        maxImages: 3,
        maxVideos: 3,
        imageSize: "medium",
        realTimeData: true,
        shouldCiteSources: true,
        readabilityMode: "8th_grade",
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
