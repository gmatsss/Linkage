const SalesForceInv = require("../model/SalesForceInvoice");
const axios = require("axios");

const checkInvoice = async (req, res) => {
  const { id, name } = req.query; // Using query parameters for the GET request

  try {
    const invoice = await SalesForceInv.findOne({ id, name });
    const currentDateTime = new Date().toISOString(); // Get the current date and time in ISO format

    if (invoice) {
      if (invoice.saved === true) {
        return res.status(200).json({
          message: "Opportunity invoice with this ID and name exists",
          exists: true,
          id: invoice.id,
          name: invoice.name,
          dateTime: currentDateTime,
        });
      } else {
        return res.status(200).json({
          message:
            "Opportunity invoice with this ID and name exist but not sync",
          exists: false,
          dateTime: currentDateTime,
        });
      }
    }

    return res.status(200).json({
      message: "Opportunity invoice with this ID and name does not exist",
      exists: false,
      dateTime: currentDateTime,
    });
  } catch (error) {
    console.error("Error checking invoice:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkinvoicefields = async (req, res) => {
  try {
    const fieldsToCheck = [
      { key: "PriceBook", label: "Price Book" },
      { key: "CloseDate", label: "Close Date" },
      { key: "CustomerPhone", label: "Phone1" },
      { key: "ShippingStreet", label: "Shipping Street" },
      { key: "ShippingCity", label: "Shipping City" },
      { key: "ShippingState", label: "Shipping State" },
      { key: "ShippingZip", label: "Shipping Zip" },
      { key: "ShippingCountry", label: "Shipping Country" },
      { key: "BillingStreet", label: "Billing Street" },
      { key: "BillingCity", label: "Billing City" },
      { key: "BillingState", label: "Billing State" },
      { key: "BillingZip", label: "Billing Zip" },
      { key: "BillingCountry", label: "Billing Country" },
      { key: "ClassField", label: "Class Field" },
      { key: "PO_Number", label: "PO Number" },
      { key: "Terms", label: "Terms" },
      { key: "Rep", label: "Rep" },
      { key: "membership_status", label: "Membership Status" },
      { key: "customer_email", label: "Customer Email" },
      { key: "SKU", label: "SKU" },
    ];
    const currentDateTime = new Date().toISOString();

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
        dateTime: currentDateTime,
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

const checkAndCreateInvoice = async (req, res) => {
  const { id, name } = req.body;

  try {
    const currentDateTime = new Date().toISOString();

    // Check if the order exists
    const existingOrder = await SalesForceInv.findOne({ id, name });

    if (!existingOrder) {
      return res.status(404).json({
        message: "Invoice not found",
        Exist: false,
        dateTime: currentDateTime,
      });
    }

    if (existingOrder.saved) {
      // Order already exists and is saved, return relevant information
      return res.status(200).json({
        message: "Invoice already updated and saved",
        IsSaved: true,
        id: existingOrder.id,
        name: existingOrder.name,
        dateTime: currentDateTime,
        Exist: true,
      });
    }

    // If order exists but isn't saved, update it
    const updatedOrder = await SalesForceInv.findOneAndUpdate(
      { id, name }, // Criteria to find the document
      { $set: { saved: true, time: currentDateTime } }, // Set saved to true and update the time
      { new: true } // Return the updated document
    );

    return res.status(200).json({
      message: "Invoice updated and marked as saved",
      IsSaved: updatedOrder.saved,
      id: updatedOrder.id,
      name: updatedOrder.name,
      dateTime: currentDateTime,
      Exist: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const classes = [
  {
    Name: "0",
    Id: "3300000000001044461",
  },
  {
    Name: "23-01-Lexington",
    Id: "3300000000000865457",
  },
  {
    Name: "23-02-(((Live))) Stream",
    Id: "3300000000000865458",
  },
  {
    Name: "23-02-Lexington",
    Id: "3300000000000881778",
  },
  {
    Name: "23-03-Chicago",
    Id: "3300000000000881805",
  },
  {
    Name: "23-03-Lexington",
    Id: "3300000000000881806",
  },
  {
    Name: "23-04-Lexington",
    Id: "3300000000000881807",
  },
  {
    Name: "23-04-SLC",
    Id: "3300000000000881808",
  },
  {
    Name: "23-05-(((Live))) Stream",
    Id: "3300000000000881809",
  },
  {
    Name: "23-05-Lexington",
    Id: "3300000000000881811",
  },
  {
    Name: "23-06-Lexington",
    Id: "3300000000000881812",
  },
  {
    Name: "23-07-Lexington",
    Id: "3300000000000881813",
  },
  {
    Name: "23-08-Lexington",
    Id: "3300000000000881814",
  },
  {
    Name: "23-08-Memphis",
    Id: "3300000000000881815",
  },
  {
    Name: "23-09-Lexington",
    Id: "3300000000000881816",
  },
  {
    Name: "23-10-(((Live))) Stream",
    Id: "3300000000000881817",
  },
  {
    Name: "23-10-Costa Mesa",
    Id: "3300000000000881818",
  },
  {
    Name: "23-10-Lexington",
    Id: "3300000000000881819",
  },
  {
    Name: "23-10-SLC",
    Id: "3300000000000881820",
  },
  {
    Name: "23-11-Lexington",
    Id: "3300000000000881821",
  },
  {
    Name: "23-11-SLC",
    Id: "3300000000000881822",
  },
  {
    Name: "24-01-Lexington",
    Id: "3300000000000877204",
  },
  {
    Name: "24-01-SLC",
    Id: "3300000000000870394",
  },
  {
    Name: "24-02-(((Live))) Stream",
    Id: "3300000000000876509",
  },
  {
    Name: "24-02-Lexington",
    Id: "3300000000000881823",
  },
  {
    Name: "24-03-Ft. Lauderdale",
    Id: "3300000000000881824",
  },
  {
    Name: "24-03-Lexington",
    Id: "3300000000000877733",
  },
  {
    Name: "24-04-Lexington",
    Id: "3300000000000877734",
  },
  {
    Name: "24-04-SLC",
    Id: "3300000000000881825",
  },
  {
    Name: "24-05-(((Live))) Stream",
    Id: "3300000000000876510",
  },
  {
    Name: "24-05-Lexington",
    Id: "3300000000000877735",
  },
  {
    Name: "24-06-Lexington",
    Id: "3300000000000877736",
  },
  {
    Name: "24-06-SLC",
    Id: "3300000000001000688",
  },
  {
    Name: "24-07-Lexington",
    Id: "3300000000000877737",
  },
  {
    Name: "24-07-WAGD",
    Id: "3300000000001116808",
  },
  {
    Name: "24-08-Atlanta",
    Id: "3300000000000881826",
  },
  {
    Name: "24-08-Lexington",
    Id: "3300000000000877738",
  },
  {
    Name: "24-09-Lexington",
    Id: "3300000000000881833",
  },
  {
    Name: "24-09-SLC",
    Id: "3300000000000881834",
  },
  {
    Name: "24-10-(((Live))) Stream",
    Id: "3300000000000876512",
  },
  {
    Name: "24-10-Denver",
    Id: "3300000000000881837",
  },
  {
    Name: "24-10-Lexington",
    Id: "3300000000000881838",
  },
  {
    Name: "24-10-SLC",
    Id: "3300000000000881839",
  },
  {
    Name: "24-11-Lexington",
    Id: "3300000000000881840",
  },
  {
    Name: "25-02-(((Live))) Stream",
    Id: "3300000000001110582",
  },
  {
    Name: "Courses",
    Id: "3300000000000908256",
  },
  {
    Name: "DOCS",
    Id: "3300000000000870672",
  },
  {
    Name: "DOCS/Ramp",
    Id: "3300000000001110581",
  },
  {
    Name: "Equipment",
    Id: "3300000000000870388",
  },
  {
    Name: "In-Office ACLS",
    Id: "3300000000000911777",
    ParentRef: {
      value: "3300000000000908256",
    },
  },
  {
    Name: "In-Office Training",
    Id: "3300000000000877049",
    ParentRef: {
      value: "3300000000000908256",
    },
  },
  {
    Name: "Intercompany",
    Id: "3300000000000959468",
  },
  {
    Name: "Membership",
    Id: "3300000000000870494",
  },
  {
    Name: "Misc Courses",
    Id: "3300000000000872423",
    ParentRef: {
      value: "3300000000000908256",
    },
  },
  {
    Name: "NPP Renewal",
    Id: "3300000000000881843",
  },
  {
    Name: "Online",
    Id: "3300000000000908257",
    ParentRef: {
      value: "3300000000000908256",
    },
  },
  {
    Name: "RAMP",
    Id: "3300000000000877290",
  },
  {
    Name: "Sponsorship",
    Id: "3300000000000881844",
  },
  {
    Name: "Strategic Dentistry",
    Id: "3300000000000959469",
    ParentRef: {
      value: "3300000000000959468",
    },
  },
  {
    Name: "TBD",
    Id: "503750",
    ParentRef: {
      value: "3300000000000908256",
    },
  },
  {
    Name: "Web Clip Renewal",
    Id: "3300000000000881845",
  },
];

const formatlineofitemsinvoice = async (req, res) => {
  try {
    const { custID, Classref, docnumber, mongodb_id, Closed_date } = req.body;

    const salesOrder = await SalesForceInv.findById(mongodb_id);
    if (!salesOrder) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const items = salesOrder.items;
    const closedDate = Closed_date;

    // Filter out items without itemIdqbo or ItemUnitprice
    const validItems = items.filter(
      (item) => item.itemIdqbo && item.ItemUnitprice
    );

    // Map database items to lineItems
    const lineItems = validItems.map((item) => ({
      DetailType: "SalesItemLineDetail",
      Amount: item.ItemUnitprice * item.quantity, // Calculate amount as UnitPrice * Qty
      SalesItemLineDetail: {
        ServiceDate: closedDate || new Date().toISOString().split("T")[0], // Use Closed_date, or today's date if not available
        ItemRef: {
          value: item.itemIdqbo,
        },
        UnitPrice: item.ItemUnitprice,
        Qty: item.quantity,
      },
    }));

    const normalizedClassref = Classref.trim().toLowerCase();
    const classMatch = classes.find(
      (cls) => cls.Name.trim().toLowerCase() === normalizedClassref
    );
    const classRef = classMatch
      ? { name: Classref, value: classMatch.Id }
      : { name: Classref, value: null };

    if (!classMatch) {
      return res.json({
        success: false,
        className: Classref,
        message: "No class field available on QBO",
      });
    }

    const incrementedDocNumber = Number(docnumber) + 1;

    const response = {
      Line: lineItems,
      CustomerRef: {
        value: custID,
      },
      TxnTaxDetail: {
        TotalTax: 0,
      },
      ApplyTaxAfterDiscount: false,
      ClassRef: classRef,
      DocNumber: incrementedDocNumber.toString(),
    };

    res.json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("An error occurred processing your request.");
  }
};

const resyncSalesforceInvoice = async (req, res) => {
  try {
    const opportunityId = req.query.opportunityId;

    // Send POST request to Zapier webhook
    const response = await axios.post(
      "https://hooks.zapier.com/hooks/catch/775472/3vm62gm/",
      { opportunityId }
    );

    if (response.status === 200) {
      // If POST request is successful, send an alert and close the tab
      res.send(`
        <script>
          alert('Request Sync Sent Please Check the logs.');
          window.close();
        </script>
      `);
    } else {
      res.send(`
        <script>
          alert('Re-sync failed.');
        </script>
      `);
    }
  } catch (error) {
    console.error(error);
    res.send(`
      <script>
        alert('An error occurred.');
      </script>
    `);
  }
};

const saveItemsInvoice = async (req, res) => {
  try {
    let { Sku, quantity, id, name } = req.body;

    // Convert strings to arrays
    if (typeof Sku === "string") {
      Sku = Sku.split(",").map((sku) => sku.trim().replace(/['"]+/g, ""));
    }

    if (typeof quantity === "string") {
      quantity = quantity.split(",").map((qty) => parseInt(qty.trim(), 10));
    }

    // Validate input
    if (
      !Array.isArray(Sku) ||
      !Array.isArray(quantity) ||
      Sku.length !== quantity.length
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid SKU or quantity data. Ensure both are arrays of the same length.",
      });
    }

    // Map Sku and quantity arrays to items array
    const items = Sku.map((sku, index) => ({
      sku,
      quantity: quantity[index],
    }));

    // Check if a Invoice with the same id already exists
    const existingOrder = await SalesForceInv.findOne({ id });
    if (existingOrder) {
      // Check for SKUs that need to be removed
      const existingSkus = existingOrder.items.map((item) => item.sku);
      const skusToRemove = existingSkus.filter((sku) => !Sku.includes(sku));

      // Remove items from existing order that are not present in the new SKU list
      if (skusToRemove.length > 0) {
        existingOrder.items = existingOrder.items.filter(
          (item) => !skusToRemove.includes(item.sku)
        );
        await existingOrder.save();
      }

      // Update order with new or existing items
      Sku.forEach((sku, index) => {
        const itemIndex = existingOrder.items.findIndex(
          (item) => item.sku === sku
        );
        if (itemIndex !== -1) {
          existingOrder.items[itemIndex].quantity = quantity[index]; // Update quantity
        } else {
          existingOrder.items.push({ sku, quantity: quantity[index] }); // Add new item
        }
      });

      await existingOrder.save();
      return res.status(200).json({
        success: true,
        message: "Invoice updated successfully",
        _id: existingOrder._id,
      });
    }

    // If no existing order, create a new one
    const salesOrder = new SalesForceInv({
      id,
      name,
      items,
      saved: false,
    });

    const savedOrder = await salesOrder.save();
    res.status(200).json({
      success: true,
      message: "Invoice saved successfully",
      _id: savedOrder._id,
    });
  } catch (error) {
    console.error("Error saving Invoice:", error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while saving the Invoice. Check server logs for more details.",
    });
  }
};

const correctedlineInvoice = async (req, res) => {
  try {
    const { mongodb_id, ItemId, Unitprice, QBOsku } = req.body;

    const itemIds = ItemId.split(",").map((id) => id.trim());
    const unitPrices = Unitprice.split(",").map((price) =>
      parseFloat(price.trim())
    );
    const qboSkus = QBOsku.split(",").map((sku) => sku.trim());

    // Validate input
    if (
      !mongodb_id ||
      !Array.isArray(itemIds) ||
      !Array.isArray(unitPrices) ||
      !Array.isArray(qboSkus) ||
      itemIds.length !== unitPrices.length ||
      itemIds.length !== qboSkus.length
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }

    const salesOrder = await SalesForceInv.findById(mongodb_id);
    if (!salesOrder) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    // Collect SKUs that do not match any in the database
    const unmatchedSkus = [];

    salesOrder.items.forEach((item) => {
      const index = qboSkus.indexOf(item.sku);
      if (index !== -1) {
        item.itemIdqbo = itemIds[index];
        item.ItemUnitprice = unitPrices[index];
      } else {
        unmatchedSkus.push(item.sku);
      }
    });

    // Check if there are unmatched SKUs
    if (unmatchedSkus.length > 0) {
      return res.status(404).json({
        success: false,
        message: "Some products are not available on QBO",
        unmatchedSkus,
      });
    }

    // Save the updated document
    const updatedOrder = await salesOrder.save();
    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error updating Invoice:", error);
    res.status(500).json({
      success: false,
      message: "Error updating Invoice",
    });
  }
};

module.exports = {
  checkInvoice,
  checkinvoicefields,
  checkAndCreateInvoice,
  formatlineofitemsinvoice,
  resyncSalesforceInvoice,
  saveItemsInvoice,
  correctedlineInvoice,
};
