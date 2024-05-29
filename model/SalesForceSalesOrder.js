const mongoose = require("mongoose");

const SalesForceSalesOrderSchema = new mongoose.Schema({
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

const SalesForceSalesOrder = mongoose.model(
  "SalesForceSalesOrder",
  SalesForceSalesOrderSchema
);

module.exports = SalesForceSalesOrder;
