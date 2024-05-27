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
        message: "Sales order with this ID and name exists",
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

module.exports = { checkInvoice };
