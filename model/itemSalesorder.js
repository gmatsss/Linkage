// models/Item.js
const mongoose = require("mongoose");

const itemSchemaSalesorder = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const ItemSalesOrder = mongoose.model("ItemSalesOrder", itemSchemaSalesorder);

module.exports = ItemSalesOrder;
