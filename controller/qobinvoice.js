const SalesForceInv = require("../model/SalesForceInvoice");

// Controller to check if an invoice exists
const checkInvoice = async (req, res) => {
  const { id, name } = req.query;

  try {
    const invoice = await SalesForceInv.findOne({ id, name });

    if (invoice) {
      res.json({ exist: true, id: invoice.id, name: invoice.name });
    } else {
      res.json({ exist: false, id, name });
    }
  } catch (error) {
    console.error("Error checking invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { checkInvoice };
