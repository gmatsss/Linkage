const moment = require("moment-timezone");
const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;

const apiKeySid = process.env.TWILIO_ACCOUNT_SIDBCUSE;
const apiKeySecret = process.env.TWILIO_AUTH_TOKENBCUSE;
const accountSid = process.env.TWILIO_ACCOUNT_SIDBC;

const client = twilio(apiKeySid, apiKeySecret, { accountSid: accountSid });
const nodemailer = require("nodemailer");

exports.handleIncomingCall = (req, res) => {
  const timezone = "America/Chicago";
  const currentTime = moment().tz(timezone);
  const startTime = moment().tz(timezone).hour(8).minute(0).second(0);
  const endTime = moment().tz(timezone).hour(17).minute(0).second(0);
  const response = new VoiceResponse();

  if (currentTime.isBetween(startTime, endTime)) {
    console.log("Handling call within business hours.");
    response.say(
      "Thank you for calling. Please hold while we connect you to Pat Murphy."
    );
    response.pause({ length: 20 });

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
  } else {
    console.log("Directing to voicemail due to outside business hours.");
    response.say(
      "Directing to voicemail due to outside business hours. Please leave a message after the beep."
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
  }

  res.type("text/xml");
  res.send(response.toString());
};

exports.handleRecordingCompleted = async (req, res) => {
  const recordingUrl = req.body.RecordingUrl;
  const callerNumber = req.query.callerNumber || req.body.From;

  // const smsBody = `New voicemail from: ${callerNumber}\nListen to the recording: ${recordingUrl}`;

  // try {
  //   const smsResponse = await client.messages.create({
  //     body: smsBody,
  //     to: "+18706170452",
  //     from: "+16292228993", //support own by twilio numbers
  //   });
  //   console.log("SMS successfully sent", smsResponse.sid);
  // } catch (error) {
  //   console.log("Failed to send SMS", error);
  //   res.status(500).send("Failed to send SMS: " + error.message);
  //   return;
  // }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587, // Common port for SMTP
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    //need there email provider
    from: '"GHL Voicemail" <test.bcremit@gmail.com>',
    to: "roggie@bcremit.app", //, hpmurphy@icloud.com

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
      next(req, res, callerNumber, recordingUrl);
    }
  });
};

exports.handleKey = (req, res) => {
  const pressedKey = req.body.Digits;
  const response = new VoiceResponse();

  if (pressedKey === "1") {
    response.redirect(
      {
        method: "POST",
      },
      "https://services.leadconnectorhq.com/phone-system/voice-call/inbound"
    );
  } else if (pressedKey === "2") {
    response.say("Please leave your message after the beep.");
    response.record({
      maxLength: 30,
      playBeep: true,
      finishOnKey: "hangup",
      recordingStatusCallback: `/twilio/recording-completed?callerNumber=${encodeURIComponent(
        req.body.From
      )}`,
      recordingStatusCallbackMethod: "POST",
    });
  } else {
    response.say("Invalid option. The call will now end.");
    response.hangup();
  }

  res.type("text/xml");
  res.send(response.toString());
};

function next(req, res, callerNumber, recordingUrl) {
  const postData = {
    msg: "New Voice mail received",
    contact: callerNumber,
    link: recordingUrl,
  };

  fetch(
    "https://services.leadconnectorhq.com/hooks/62kZ0CQqMotRWvdIjMZS/webhook-trigger/5009a2df-28e7-4d92-9629-a76e7fa300f7",
    {
      method: "POST",
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Webhook POST successful:", data);
      res.status(200).send("Email and webhook notification sent successfully");
    })
    .catch((error) => {
      console.error("Error in sending webhook POST:", error);
      res
        .status(500)
        .send("Email sent but webhook POST failed: " + error.message);
    });
}
