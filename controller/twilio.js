const moment = require("moment-timezone");
const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.handleIncomingCall = (req, res) => {
  // Set the timezone to Central Time (Arkadelphia, AR)
  const timezone = "America/Chicago";
  const currentTime = moment().tz(timezone);
  const startTime = moment().tz(timezone).hour(8).minute(0).second(0);
  const endTime = moment().tz(timezone).hour(17).minute(0).second(0);

  const response = new VoiceResponse(); // Ensure response is defined here

  if (currentTime.isBetween(startTime, endTime)) {
    console.log("Handling call normally.");
    response.redirect(
      {
        method: "POST",
      },
      "https://services.leadconnectorhq.com/phone-system/voice-call/inbound"
    );
  } else {
    console.log("Directing to voicemail due to outside business hours.");
    response.say("Please leave a message after the beep.");
    response.record({ maxLength: 30 });
  }

  res.type("text/xml");
  res.send(response.toString());
};
