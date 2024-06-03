const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  sku: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  itemIdqbo: {
    type: String,
  },
  ItemUnitprice: {
    type: Number,
  },
});

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
  items: [itemSchema], // Adding items array to the schema

  saved: Boolean,
});

const SalesForceInv = mongoose.model("SalesForceInv", SalesForceInvoice);

module.exports = SalesForceInv;
