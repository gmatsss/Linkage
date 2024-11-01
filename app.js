require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const callRoutes = require("./routes/twilio");
const callRouteslink = require("./routes/twiliolink");
const qobRoutes = require("./routes/qobRoutes");
const firefliesRoutes = require("./routes/fireflies");
const koalaRoutes = require("./routes/Koala");
const gmb = require("./routes/gmb");
// const zenqa = require("./routes/zenqa");
const openai = require("./routes/openai");

const connectDB = require("./db");

const app = express();

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/twilio", callRoutes);
app.use("/callRouteslink", callRouteslink);
app.use("/qobRoutes", qobRoutes);
app.use("/fireflies", firefliesRoutes);
app.use("/koala", koalaRoutes);
app.use("/gmb", gmb);
// app.use("/zenqa", zenqa);
app.use("/openai", openai);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Server setup
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
