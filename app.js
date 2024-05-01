require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const callRoutes = require("./routes/twilio");

const app = express();
app.use(bodyParser.json());
app.use("/twilio", callRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
