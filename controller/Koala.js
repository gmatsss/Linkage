const axios = require("axios");

exports.koalaArticles = async (req, res) => {
  const apiUrl = "https://koala.sh/api/articles/";
  const apiKey = process.env.KOALA_API_KEY;

  const {
    title,
    keywords,
    articleLength,
    toneOfVoice,
    maxImages,
    maxVideos,
    realTimeData,
    includeKeyTakeaways,
    includeFaq,
    readabilityMode,
    // articleType
    // youTubeVideoUrl,
    // articleUrl,
    // rewriteAllSourceData,
  } = req.body;

  const extractedArticleLength = articleLength.split(" ")[0];

  // Build the request body with common parameters
  let requestBody = {
    extraTitlePrompt: title,
    targetKeyword: keywords,
    articleLength: extractedArticleLength,
    toneOfVoiceProfile: toneOfVoice,
    articleType: "blog_post",
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
  };

  // Add specific parameters based on the articleType
  // if (articleType === "youtube_video") {
  //   requestBody.youTubeVideoUrl = youTubeVideoUrl;
  //   requestBody.rewriteAllSourceData = rewriteAllSourceData;
  // } else if (articleType === "rewrite_blog_post") {
  //   requestBody.articleUrl = articleUrl;
  //   requestBody.rewriteAllSourceData = rewriteAllSourceData;
  // }

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Koala API Response:", response.data);

    res.json({
      success: true,
      articleId: response.data.articleId,
      message:
        "Article in Progress, please wait for a while. Don't change any cells as the automations are working.",
    });
  } catch (error) {
    // Log the error
    console.error("Koala API Error:", error.message);
    if (error.response) {
      console.error("Koala API Error Response:", error.response.data);
    }
    res.status(200).json({
      success: false,
      message: "Failed to create article in Koala.",
      error: error.message,
    });
  }
};
