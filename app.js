require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const callRoutes = require("./routes/twilio");
const playRoutes = require("./routes/playai");
const qobRoutes = require("./routes/qobRoutes");

const app = express();

// Middleware for parsing application/json
app.use(bodyParser.json());
// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Mounting the Twilio routes
app.use("/twilio", callRoutes);
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
