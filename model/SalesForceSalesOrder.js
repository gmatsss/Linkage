const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const salesForceSalesOrderSchema = new mongoose.Schema({
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
});

const SalesForceSalesOrder = mongoose.model(
  "SalesForceSalesOrder",
  salesForceSalesOrderSchema
);

module.exports = SalesForceSalesOrder;
