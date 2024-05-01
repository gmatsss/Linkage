const moment = require("moment-timezone");
const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const nodemailer = require("nodemailer");

exports.handleIncomingCall = (req, res) => {
  // Set the timezone to Central Time (Arkadelphia, AR)
  const timezone = "America/Chicago";
  const currentTime = moment().tz(timezone);
  const startTime = moment().tz(timezone).hour(8).minute(0).second(0);
  const endTime = moment().tz(timezone).hour(17).minute(0).second(0);

  const response = new VoiceResponse();

  if (currentTime.isBetween(startTime, endTime)) {
    console.log("Handling call normally.");

    const dial = response.dial({ timeout: 20 });
    dial.number({
      url: "https://services.leadconnectorhq.com/phone-system/voice-call/inbound",
    });
    response.say(
      "No one is available to take your call. Please leave a message after the beep."
    );
    response.record({
      maxLength: 30,
      playBeep: true,
      finishOnKey: "hangup",
      recordingStatusCallback: "/twilio/recording-completed",
      recordingStatusCallbackMethod: "POST",
    });
  } else {
    console.log("Directing to voicemail due to outside business hours.");
    response.say("Please leave a message 30 seconds voicemail after the beep.");
    response.record({
      maxLength: 30,
      playBeep: true,
      finishOnKey: "hangup",
      recordingStatusCallback: "/twilio/recording-completed",
      recordingStatusCallbackMethod: "POST",
    });
  }

  res.type("text/xml");
  res.send(response.toString());
};

exports.handleRecordingCompleted = async (req, res) => {
  console.log(req.body);
  const recordingUrl = req.body.RecordingUrl;
  const callerNumber = req.body.From; // This retrieves the caller's phone number from the request

  const transporter = nodemailer.createTransport({
    host: "mail.linkage.ph",
    secure: true,
    auth: {
      user: "gabriel.maturan@linkage.ph",
      pass: "Linkage2023",
    },
  });

  const mailOptions = {
    from: '"Linkage" <gabriel.maturan@linkage.ph>',
    to: "gabriel.maturan@linkage.ph, gmaturan60@gmail.com",
    subject: "New Voicemail Received",
    text: `You have a new voicemail from ${callerNumber}: ${recordingUrl}`,
    html: `<b>You have a new voicemail from ${callerNumber}:</b> <a href="${recordingUrl}">${recordingUrl}</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email: " + error.message);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
};
