const moment = require("moment-timezone");
const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const nodemailer = require("nodemailer");

exports.handleIncomingCall = (req, res) => {
  const timezone = "America/Chicago";
  const currentTime = moment().tz(timezone);
  const startTime = moment().tz(timezone).hour(8).minute(0).second(0);
  const endTime = moment().tz(timezone).hour(17).minute(0).second(0);
  const response = new VoiceResponse();

  if (currentTime.isBetween(startTime, endTime)) {
    console.log("Handling call normally.");
    const dial = response.dial({
      action: "/handlevoicemail", // URL to handle the next steps after dial
      method: "POST",
      timeout: 20, // seconds to wait for the call to be answered
    });

    dial.number(
      "https://services.leadconnectorhq.com/phone-system/voice-call/inbound"
    );
  } else {
    console.log("Handling call normally.");
    const dial = response.dial({
      action: "/handlevoicemail", // URL to handle the next steps after dial
      method: "POST",
      timeout: 20, // seconds to wait for the call to be answered
    });

    dial.number(
      "https://services.leadconnectorhq.com/phone-system/voice-call/inbound"
    );
    // console.log("Directing to voicemail due to outside business hours.");
    // response.say(
    //   "Directing to voicemail due to outside business hours. Please leave a message after the beep."
    // );
    // response.record({
    //   maxLength: 30,
    //   playBeep: true,
    //   finishOnKey: "hangup",
    //   recordingStatusCallback: `/twilio/recording-completed?callerNumber=${encodeURIComponent(
    //     req.body.From
    //   )}`,

    //   recordingStatusCallbackMethod: "POST",
    // });
  }

  res.type("text/xml");
  res.send(response.toString());
};

exports.handleRecordingCompleted = async (req, res) => {
  const recordingUrl = req.body.RecordingUrl;
  const callerNumber = req.query.callerNumber || req.body.From;

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
    html: `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
            .header { color: #444; font-size: 22px; font-weight: bold; }
            .info { font-size: 18px; margin-top: 20px; }
            .info b { color: #555; }
            .link { margin-top: 20px; }
            .link a { background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="header">New Voicemail Notification</div>
          <p class="info">
            <b>From:</b> ${callerNumber}<br>
            <b>Time:</b> ${moment().format("LLLL")}<br>
          </p>
          <p class="info">Please listen to the voicemail by clicking on the link below:</p>
          <div class="link">
            <a href="${recordingUrl}" target="_blank">Listen to Voicemail</a>
          </div>
        </body>
      </html>
    `,
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

exports.handleVoicemail = (req, res) => {
  response.say(
    "No one is available to take your call. Please leave a message after the beep."
  );

  response.record({
    maxLength: 30,
    playBeep: true,
    finishOnKey: "hangup",
    recordingStatusCallback: `/twilio/recording-completed?callerNumber=${encodeURIComponent(
      req.body.From
    )}`,

    recordingStatusCallbackMethod: "POST",
  });

  res.type("text/xml");
  res.send(response.toString());
};
