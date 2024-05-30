const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  sku: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

const salesForceSalesOrderSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  items: [itemSchema], // Adding items array to the schema
});

const SalesForceSalesOrder = mongoose.model(
  "SalesForceSalesOrder",
  salesForceSalesOrderSchema
);

module.exports = SalesForceSalesOrder;
