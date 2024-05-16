require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const callRoutes = require("./routes/twilio");
const callRouteslink = require("./routes/twiliolink");
const qobRoutes = require("./routes/qobRoutes");
const connectDB = require("./db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware for parsing application/json
app.use(bodyParser.json());
// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Mounting the Twilio routes
app.use("/twilio", callRoutes);
app.use("/callRouteslink", callRouteslink);
app.use("/qobRoutes", qobRoutes);

// Simple route for root to check if server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Server setup
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
