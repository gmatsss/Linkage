const axios = require("axios");

exports.chatWithOpenAI = async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const url = "https://api.openai.com/v1/chat/completions";

    const data = {
      model: "gpt-4-0613",
      messages: [
        {
          role: "system",
          content: `You are an assistant trained to analyze email responses and classify them into specific categories. Your job is to categorize the email content into one of the following types:
            
  - 'negative': if the email indicates disinterest or rejection.
  - 'outOfOffice': if the email is an out-of-office response (considered a negative response).
  - 'personnelChange': if the email mentions a change in personnel (considered a negative response).
  - 'officeClosure': if the email states office closure (considered a negative response).
  - 'autoReply': if the email is an automated response or generated by a bot (considered a negative response).
  - 'negativeKeyword': if the email includes one of the following keywords: 'BEANS', 'Pumpkin', 'Snowflake', 'Unicorn', 'Banana', 'Poof', 'Noodles', 'Rocket', 'Penguin', 'Hush', 'Zap', 'Toast' (considered a negative response).
    
  Respond with a JSON object containing:
  - 'category': the identified category (one of 'negative', 'outOfOffice', 'personnelChange', 'officeClosure', 'autoReply', 'negativeKeyword', or 'none' if no match).
  - 'isNegative': 'true' if the category is negative, 'false' if it's positive or neutral.
  - 'reason': a brief explanation of why the email was categorized as such.
  
  Only respond with this JSON object and nothing else.`,
        },
        { role: "user", content: req.body.message },
      ],
      temperature: 0.3,
    };

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const assistantReply = response.data.choices[0].message.content;

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(assistantReply);
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Assistant response could not be parsed as JSON.",
      });
    }

    res.json({
      success: true,
      category: parsedResponse.category || "none",
      isNegative: parsedResponse.isNegative || false,
      reason: parsedResponse.reason || "No explanation provided.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response ? error.response.data : error.message,
    });
  }
};
