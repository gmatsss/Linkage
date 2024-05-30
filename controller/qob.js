const SalesForceSalesOrder = require("../model/SalesForceSalesOrder");
const axios = require("axios");

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

const formatlineofitems = async (req, res) => {
  try {
    const { custID, Classref, docnumber, mongodb_id } = req.body;

    const salesOrder = await SalesForceSalesOrder.findById(mongodb_id);
    if (!salesOrder) {
      return res.status(404).json({
        success: false,
        message: "Sales order not found",
      });
    }

    const items = salesOrder.items;

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Map database items to lineItems
    const lineItems = items.map((item) => ({
      DetailType: "SalesItemLineDetail",
      Amount: item.ItemUnitprice * item.quantity, // Calculate amount as UnitPrice * Qty
      SalesItemLineDetail: {
        ServiceDate: today, // Set ServiceDate to today's date
        ItemRef: {
          value: item.itemIdqbo,
        },
        UnitPrice: item.ItemUnitprice,
        Qty: item.quantity,
      },
    }));

    // Normalize Classref and class names
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

    const incrementedDocNumber = (parseInt(docnumber, 10) + 1).toString();

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
      ClassRef: classRef,
      DocNumber: incrementedDocNumber,
    };

    res.json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("An error occurred processing your request.");
  }
};

const createSalesOrder = async (req, res) => {
  const { SalesOrderID: id, name } = req.body;

  try {
    // Check if a sales order with the given id already exists
    const existingOrder = await SalesForceSalesOrder.findOne({ id });
    const currentDateTime = new Date().toISOString();

    if (existingOrder) {
      return res.status(200).json({
        message: "Sales order with this ID already exists",
        IsSaved: true,
        dateTime: currentDateTime,
        id: existingOrder.id,
        name: existingOrder.name,
      });
    }

    // Create a new sales order
    const newOrder = new SalesForceSalesOrder({
      id,
      name,
      time: currentDateTime,
    });

    await newOrder.save();
    res.status(201).json({
      message: "Sales order created successfully",
      IsSaved: false,
    });
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
      { key: "CustomerPhone", label: "Phone1" },
      { key: "ShippingStreet", label: "Shipping Street" },
      { key: "ShippingCity", label: "Shipping City" },
      { key: "ShippingState", label: "Shipping State" },
      { key: "ShippingZip", label: "Shipping Zip" },
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

const getSalesOrderStatus = async (req, res) => {
  const { id, name } = req.query; // Using query parameters for the GET request

  try {
    // Check if a sales order with the given id and name exists
    const existingOrder = await SalesForceSalesOrder.findOne({ id, name });

    const currentDateTime = new Date().toISOString(); // Get the current date and time in ISO format

    if (existingOrder) {
      return res.status(200).json({
        message: "Sales order with this ID and name exists",
        exists: true,
        id: existingOrder.id,
        name: existingOrder.name,
        dateTime: currentDateTime, // Include the current date and time
      });
    }

    return res.status(200).json({
      message: "Sales order with this ID and name does not exist",
      exists: false,
      dateTime: currentDateTime, // Include the current date and time
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getCustomerQuery = async (req, res) => {
  try {
    const { customerName, customerEmail, QBIDDOCS } = req.body;

    let query;
    const expectedLength = 4;

    if (QBIDDOCS && QBIDDOCS.length === expectedLength) {
      query = `SELECT * FROM Customer WHERE Id = '${QBIDDOCS}'`;
    } else {
      query = `SELECT * FROM Customer WHERE DisplayName = '${customerName}' AND PrimaryEmailAddr = '${customerEmail}'`;
    }

    res.send(query);
  } catch (error) {
    console.error("Error generating query:", error);
    res.status(500).send("An error occurred generating the query.");
  }
};

const resyncSalesforce = async (req, res) => {
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

const saveItems = async (req, res) => {
  try {
    let { Sku, quantity } = req.body; // Expecting Sku and quantity arrays as strings

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
        message: "Invalid SKU or quantity data",
      });
    }

    // Map Sku and quantity arrays to items array
    const items = Sku.map((sku, index) => ({
      sku,
      quantity: quantity[index],
    }));

    // Create new sales order without providing an existing ID or name
    const salesOrder = new SalesForceSalesOrder({ items });

    // Save the sales order and capture the saved document
    const savedOrder = await salesOrder.save();

    res.status(200).json({
      success: true,
      message: "Sales order saved successfully",
      _id: savedOrder._id,
    });
  } catch (error) {
    console.error("Error saving sales order:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while saving the sales order",
    });
  }
};

const correctedline = async (req, res) => {
  try {
    const { mongodb_id, ItemId, Unitprice, QBOsku } = req.body; // Expecting these fields in the request body

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
      return res.status(200).json({
        success: false,
        message: "Invalid data",
      });
    }

    const salesOrder = await SalesForceSalesOrder.findById(mongodb_id);
    if (!salesOrder) {
      res.status(200).json({
        success: false,
        message: "Sales order Error",
      });
    }

    // Update items in the document
    salesOrder.items.forEach((item) => {
      const index = qboSkus.indexOf(item.sku);
      if (index !== -1) {
        item.itemIdqbo = itemIds[index];
        item.ItemUnitprice = unitPrices[index];
      }
    });

    // Save the updated document
    const updatedOrder = await salesOrder.save();

    res.status(200).json({
      success: true,
      message: "Sales order updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error updating sales order:", error);
    res.status(200).json({
      success: false,
      message: "Sales order Error",
    });
  }
};

module.exports = {
  formatlineofitems,
  createSalesOrder,
  checkopportunityfields,
  getSalesOrderStatus,
  getCustomerQuery,
  resyncSalesforce,
  saveItems,
  correctedline,
};
