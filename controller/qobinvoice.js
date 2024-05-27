const SalesForceInv = require("../model/SalesForceInvoice");

// Controller to check if an invoice exists
const checkInvoice = async (req, res) => {
  const { id, name } = req.query;

  try {
    const invoice = await SalesForceInv.findOne({ id, name });
    const currentDateTime = new Date().toISOString(); // Get the current date and time in ISO format

    if (invoice) {
      res.json({
        exist: true,
        id: invoice.id,
        name: invoice.name,
        message: "Opportunity invoice with this ID and name exists",
        dateTime: currentDateTime,
      });
    } else {
      res.json({ exist: false, dateTime: currentDateTime });
    }
  } catch (error) {
    console.error("Error checking invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const checkinvoicefields = async (req, res) => {
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

module.exports = { checkInvoice, checkinvoicefields, checkAndCreateInvoice };
