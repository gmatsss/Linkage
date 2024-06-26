const axios = require("axios");

exports.koalaArticles = async (req, res) => {
  const apiUrl = "https://koala.sh/api/articles/";
  const apiKey = process.env.KOALA_API_KEY;

  const {
    title,
    keywords,
    articleLength,
    toneOfVoice,
    articleType,
    maxImages,
    maxVideos,
    realTimeData,
    includeKeyTakeaways,
    includeFaq,
    readabilityMode,
  } = req.body;

  const extractedArticleLength = articleLength.split(" ")[0];

  try {
    const response = await axios.post(
      apiUrl,
      {
        extraTitlePrompt: title,
        targetKeyword: keywords,
        articleLength: extractedArticleLength,
        toneOfVoiceProfile: toneOfVoice,
        articleType: articleType,
        maxImages: maxImages,
        maxVideos: maxVideos,

        realTimeData: realTimeData || false,
        includeKeyTakeaways: includeKeyTakeaways || false,
        includeFaq: includeFaq || false,
        readabilityMode: readabilityMode ? "8th_grade" : "default",

        shouldCiteSources: true,
        webhookUrl: "https://hooks.zapier.com/hooks/catch/775472/2b9ia20/",
        gptVersion: "gpt-4o",
        language: "English",
        seoOptimizationLevel: "ai_powered",
        country: "USA",
        multimediaOption: "auto",
        imageStyle: "photo",
        imageSize: "medium",
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Koala API Response:", response);

    res.json({
      success: true,
      articleId: response.data.articleId,
      message:
        "Article in Progress, please wait for a while dont change any cells as the automations are working",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create article in Koala.",
      error: error.message,
    });
  }
};
