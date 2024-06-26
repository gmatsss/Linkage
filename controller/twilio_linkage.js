const moment = require("moment-timezone");
const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const nodemailer = require("nodemailer");

exports.handleIncomingCalllink = (req, res) => {
  const callSid = req.body.CallSid;

  const timezone = "America/Chicago";
  const currentTime = moment().tz(timezone);
  const startTime = moment().tz(timezone).hour(8).minute(0).second(0);
  const endTime = moment().tz(timezone).hour(17).minute(0).second(0);
  const response = new VoiceResponse();
  let callsHandled = {};

  if (currentTime.isBetween(startTime, endTime)) {
    // Check if the call has been handled already
    if (callsHandled[callSid]) {
      console.log("Call already handled:", callSid);
      const response = new VoiceResponse();
      response.hangup();
      res.type("text/xml");
      res.send(response.toString());
      return;
    }

    console.log("Handling call within business hours.");
    response.say(
      "Thank you for calling. Please hold while we connect you to Pat Murphy."
    );
    response.pause({ length: 25 });

    response.say(
      "No one is available to take your call. Please leave a message after the beep."
    );

    response.record({
      maxLength: 30, // Maximum recording duration in seconds.
      playBeep: true,
      finishOnKey: "#", // Use '#' or another suitable key to end recording early.
      recordingStatusCallback: `/twilio/recording-completed?callerNumber=${encodeURIComponent(
        req.body.From
      )}`,
      recordingStatusCallbackMethod: "POST",
    });

    // Explicitly hang up after the record command.
    response.hangup();

    // Mark this call as handled.
    callsHandled[callSid] = true;
  } else {
    console.log("Directing to voicemail due to outside business hours.");
    response.say(
      "Directing to voicemail due to outside business hours. Please leave a message after the beep."
    );
    response.record({
      maxLength: 30,
      playBeep: true,
      finishOnKey: "hangup",
      recordingStatusCallback: `/twilio/recording-completedlink?callerNumber=${encodeURIComponent(
        req.body.From
      )}`,
      recordingStatusCallbackMethod: "POST",
    });
  }

  res.type("text/xml");
  res.send(response.toString());
};

exports.handleRecordingCompletedlink = async (req, res) => {
  const recordingUrl = req.body.RecordingUrl;
  const callerNumber = req.query.callerNumber || req.body.From;

  const smsBody = `New voicemail from: ${callerNumber}\nListen to the recording: ${recordingUrl}`;

  try {
    const smsResponse = await client.messages.create({
      body: smsBody,
      to: "+18706170452",
      from: "+16292228993", //support own by twilio numbers
    });
    console.log("SMS successfully sent", smsResponse.sid);
  } catch (error) {
    console.log("Failed to send SMS", error);
    res.status(500).send("Failed to send SMS: " + error.message);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "mail.linkage.ph",
    secure: true,
    auth: {
      user: "gabriel.maturan@linkage.ph",
      pass: "Linkage2023",
    },
  });

  const mailOptions = {
    //need there email provider
    from: '"Linkage" <gabriel.maturan@linkage.ph>',
    to: "gabriel.maturan@linkage.ph, hpmurphy@icloud.com", //, hpmurphy@icloud.com

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

exports.handleKeylink = (req, res) => {
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

// exports.handleIncomingCallSupport = (req, res) => {
//   const response = new VoiceResponse();

//   response.say("Thank you for calling. Please hold while we connect you.");
//   response.pause({ length: 25 });

//   const dial = response.dial();
//   dial.number("+18704104327");

//   res.type("text/xml");
//   res.send(response.toString());
// };

exports.handleIncomingCallSupport = (req, res) => {
  const response = new VoiceResponse();

  response.say("Thank you for calling. Please hold while we connect you.");

  // Enqueue the call into a task queue
  response.enqueue(
    {
      waitUrl: "http://3.80.93.16:8002/callRouteslink/holdcall", // URL to play hold music/message or silence
    },
    "supportQueue"
  );

  res.type("text/xml");
  res.send(response.toString());

  // After 25 seconds, dequeue and redirect the call if not answered
  setTimeout(async () => {
    const callSid = req.body.CallSid;

    try {
      await client.calls(callSid).update({
        url: "http://3.80.93.16:8002/callRouteslink/dequeueAndRedirect",
        method: "POST",
      });
    } catch (error) {
      console.error("Error redirecting call:", error);
    }
  }, 25000);
};

exports.holdcall = (req, res) => {
  const response = new VoiceResponse();

  // Play hold music or keep the caller in silence
  response.say("Please wait while we connect you.");
  response.pause({ length: 25 });

  res.type("text/xml");
  res.send(response.toString());
};

exports.dequeueAndRedirect = (req, res) => {
  const response = new VoiceResponse();

  const dial = response.dial();
  dial.number("+18704104327");

  res.type("text/xml");
  res.send(response.toString());
};
