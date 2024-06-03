const SalesForceInv = require("../model/SalesForceInvoice");

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
    const invoice = await SalesForceInv.findOne({ id, name });
    const currentDateTime = new Date().toISOString(); // Get the current date and time in ISO format

    if (invoice) {
      res.json({
        exist: true,
        id: invoice.id,
        name: invoice.name,
        message:
          "Opportunity invoice with this ID and name already exists. Please refrain from updating the sync invoice",
        dateTime: currentDateTime,
      });
    } else {
      const newInvoice = new SalesForceInv({ id, name });
      await newInvoice.save();
      res.json({
        exist: false,
        message:
          "Opportunity invoice with this ID and name does not exist. Created new invoice.",
        id: newInvoice.id,
        name: newInvoice.name,
        dateTime: currentDateTime,
      });
    }
  } catch (error) {
    console.error("Error checking or creating invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    const { ItemId, UnitPrice, custID, qty, Classref } = req.body;
    const itemIds = ItemId.split(",").map((item) => item.trim()); // Split and trim item IDs
    const unitPrices = UnitPrice.split(",").map((price) =>
      parseFloat(price.trim())
    );

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

    const normalizedClassref = Classref.trim().toLowerCase();
    const classMatch = classes.find(
      (cls) => cls.Name.trim().toLowerCase() === normalizedClassref
    );
    const classRef = classMatch
      ? { name: Classref, value: classMatch.Id }
      : { name: Classref, value: null };

    const response = {
      Line: lineItems,
      CustomerRef: {
        value: custID,
      },
      ClassRef: classRef,
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

module.exports = {
  checkInvoice,
  checkinvoicefields,
  checkAndCreateInvoice,
  formatlineofitemsinvoice,
  resyncSalesforceInvoice,
};
