const mongoose = require("mongoose");

const SalesForceInvoice = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const SalesForceInv = mongoose.model("SalesForceInv", SalesForceInvoice);

module.exports = SalesForceInv;
