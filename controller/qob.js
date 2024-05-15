const SalesForceSalesOrder = require("../model/SalesForceSalesOrder");

async function formatlineofitems(req, res) {
  try {
    const { ItemId, UnitPrice, custID, qty } = req.body;
    const itemIds = ItemId.split(",").map((item) => item.trim()); // Split and trim item IDs
    const unitPrices = UnitPrice.split(",").map((price) =>
      parseFloat(price.trim())
    ); // Split, trim and convert to float

    // Build the line items array
    const lineItems = itemIds.map((itemId, index) => ({
      DetailType: "SalesItemLineDetail",
      Amount: unitPrices[index] * qty[index], // Calculate amount as UnitPrice * Qty
      SalesItemLineDetail: {
        ServiceDate: "2024-05-13", // will ask what is the date
        ItemRef: {
          value: itemId,
        },
        UnitPrice: unitPrices[index],
        Qty: qty[index],
      },
    }));

    // Construct the full response object
    const response = {
      Line: lineItems,
      CustomerRef: {
        value: custID,
      },
      TxnTaxDetail: {
        TotalTax: 0,
      },
      ApplyTaxAfterDiscount: false,
    };

    // Send the formatted JSON response
    res.json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("An error occurred processing your request.");
  }
}

const createSalesOrder = async (req, res) => {
  const { SalesOrderID: id, time } = req.body;

  try {
    // Check if a sales order with the given id already exists
    const existingOrder = await SalesForceSalesOrder.findOne({ id });

    if (existingOrder) {
      return res
        .status(400)
        .json({ message: "Sales order with this ID already exists" });
    }

    // Create a new sales order
    const newOrder = new SalesForceSalesOrder({
      id,
      time,
    });

    await newOrder.save();
    res.status(201).json({ message: "Sales order created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  formatlineofitems,
  createSalesOrder,
};
