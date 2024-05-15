const SalesForceSalesOrder = require("../model/SalesForceSalesOrder");

// async function formatlineofitems(req, res) {
//   try {
//     const { ItemId, UnitPrice, custID, qty } = req.body;
//     const itemIds = ItemId.split(",").map((item) => item.trim()); // Split and trim item IDs
//     const unitPrices = UnitPrice.split(",").map((price) =>
//       parseFloat(price.trim())
//     ); // Split, trim and convert to float

//     // Build the line items array
//     const lineItems = itemIds.map((itemId, index) => ({
//       DetailType: "SalesItemLineDetail",
//       Amount: unitPrices[index] * qty[index], // Calculate amount as UnitPrice * Qty
//       SalesItemLineDetail: {
//         ServiceDate: "2024-05-13", // will ask what is the date
//         ItemRef: {
//           value: itemId,
//         },
//         UnitPrice: unitPrices[index],
//         Qty: qty[index],
//       },
//     }));

//     // Construct the full response object
//     const response = {
//       Line: lineItems,
//       CustomerRef: {
//         value: custID,
//       },
//       TxnTaxDetail: {
//         TotalTax: 0,
//       },
//       ApplyTaxAfterDiscount: false,
//     };

//     // Send the formatted JSON response
//     res.json(response);
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.status(500).send("An error occurred processing your request.");
//   }
// }

async function formatlineofitems(req, res) {
  try {
    const {
      ItemId,
      UnitPrice,
      custID,
      qty,
      PONumber,
      BillEmail,
      ShipAddr,
      BillAddr,
      TxnDate,
      ExpirationDate,
      ShipMethod,
      ClassRef,
      LocationRef,
      PrivateNote,
    } = req.body;

    const itemIds = ItemId.split(",").map((item) => item.trim()); // Split and trim item IDs
    const unitPrices = UnitPrice.split(",").map((price) =>
      parseFloat(price.trim())
    ); // Split, trim and convert to float
    const quantities = qty
      .split(",")
      .map((quantity) => parseFloat(quantity.trim())); // Split, trim and convert to float

    // Build the line items array
    const lineItems = itemIds.map((itemId, index) => ({
      DetailType: "SalesItemLineDetail",
      Amount: unitPrices[index] * quantities[index], // Calculate amount as UnitPrice * Qty
      SalesItemLineDetail: {
        ServiceDate: "2024-05-13", // will ask what is the date
        ItemRef: {
          value: itemId,
        },
        UnitPrice: unitPrices[index],
        Qty: quantities[index],
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
      // Hardcoded data for additional fields
      CustomField: [
        {
          DefinitionId: "1",
          Name: "PO Number",
          Type: "StringType",
          StringValue: PONumber || "PO12345", // Hardcoded value as fallback
        },
      ],
      BillEmail: {
        Address: BillEmail || "defaultemail@example.com", // Hardcoded value as fallback
      },
      ShipAddr: {
        City: ShipAddr?.City || "Default City",
        Line1: ShipAddr?.Line1 || "123 Default St",
        PostalCode: ShipAddr?.PostalCode || "12345",
        CountrySubDivisionCode: ShipAddr?.CountrySubDivisionCode || "XX",
      },
      BillAddr: {
        City: BillAddr?.City || "Default City",
        Line1: BillAddr?.Line1 || "123 Default St",
        PostalCode: BillAddr?.PostalCode || "12345",
        CountrySubDivisionCode: BillAddr?.CountrySubDivisionCode || "XX",
      },
      TxnDate: TxnDate || "2024-05-15", // Hardcoded date as fallback
      ExpirationDate: ExpirationDate || "2024-06-15", // Hardcoded expiration date as fallback
      ShipMethodRef: {
        value: ShipMethod || "FedEx", // Hardcoded value as fallback
      },
      ClassRef: {
        value: ClassRef || "20000000000000000000", // Hardcoded value as fallback
      },
      LocationRef: {
        value: LocationRef || "123 Default Location", // Hardcoded value as fallback
      },
      PrivateNote: PrivateNote || "Default internal memo", // Hardcoded note as fallback
    };

    // Send the formatted JSON response
    res.json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("An error occurred processing your request.");
  }
}

const createSalesOrder = async (req, res) => {
  const { SalesOrderID: id, name, time } = req.body;

  try {
    // Check if a sales order with the given id already exists
    const existingOrder = await SalesForceSalesOrder.findOne({ id });

    if (existingOrder) {
      return res.status(200).json({
        message: "Sales order with this ID already exists",
        IsSaved: true,
      });
    }

    // Create a new sales order
    const newOrder = new SalesForceSalesOrder({
      id,
      name,
      time,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Sales order created successfully", IsSaved: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const checkopportunityfields = async (req, res) => {
  try {
    // Define the fields to check and their human-readable labels
    const fieldsToCheck = [
      { key: "PriceBook", label: "Price Book" },
      { key: "CloseDate", label: "Close Date" },
      { key: "CustomerPhone", label: "Customer Phone" },
      { key: "ShippingStreet", label: "Shipping Street" },
      { key: "ShippingCity", label: "Shipping City" },
      { key: "ShippingState", label: "Shipping State" },
      { key: "ShippingZip", label: "Shipping Zip" },
      { key: "ClassField", label: "Class Field" },
      { key: "PO_Number", label: "PO Number" },
      { key: "Terms", label: "Terms" },
      { key: "Rep", label: "Rep" },
    ];

    // Check if all required fields have values
    const missingFields = fieldsToCheck.filter((field) => !req.body[field.key]);

    if (missingFields.length > 0) {
      const missingFieldsLabels = missingFields.map((field) => field.label);
      const message = `Missing required fields: ${missingFieldsLabels.join(
        ", "
      )}`;

      return res.status(200).json({
        success: false,
        message: message,
        missingFields: missingFieldsLabels,
      });
    }

    return res.status(200).json({
      success: true,
      message: "All required fields are present",
    });
  } catch (error) {
    console.error("Error checking opportunity fields:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getSalesOrderStatus = async (req, res) => {
  const { id, name } = req.query; // Using query parameters for the GET request

  try {
    // Check if a sales order with the given id and name exists
    const existingOrder = await SalesForceSalesOrder.findOne({ id, name });

    if (existingOrder) {
      return res.status(200).json({
        message: "Sales order with this ID and name exists",
        exists: true,
        id: existingOrder.id,
        name: existingOrder.name,
      });
    }

    return res.status(200).json({
      message: "Sales order with this ID and name does not exist",
      exists: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  formatlineofitems,
  createSalesOrder,
  checkopportunityfields,
  getSalesOrderStatus,
};
