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

module.exports = {
  formatlineofitems,
};
