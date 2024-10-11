const mongoose = require("mongoose");

// Define the schema
const GmbPostSchemabcremit = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure that the post name is unique
  },
  time: {
    type: Date,
    default: Date.now, // Automatically set to current time
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  languageCode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  updateTime: {
    type: Date,
    required: true,
  },
  createTime: {
    type: Date,
    required: true,
  },
  searchUrl: {
    type: String,
    required: true,
  },
  callToAction: {
    type: mongoose.Schema.Types.Mixed, // This can be an object or null
    default: null,
  },
  media: {
    type: Array,
    default: [], // Default to an empty array
  },
  topicType: {
    type: String,
    required: true,
  },
});

// Create the model from the schema
const GmbPost = mongoose.model("GmbPostbcremit", GmbPostSchemabcremit);

module.exports = GmbPost;
