const mongoose = require("mongoose");

// Define the schema
const GmbPostSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now, // Automatically set to current time
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

// Create the model from the schema
const GmbPost = mongoose.model("GmbPost", GmbPostSchema);

module.exports = GmbPost;
