const express = require("express");
const router = express.Router();
const QobSalesorder = require("../controller/qob");
const QobInvoice = require("../controller/qobinvoice");

//sales order
router.post("/getCustomerQuery", QobSalesorder.getCustomerQuery);
router.get("/getSalesOrderStatus", QobSalesorder.getSalesOrderStatus);
router.post("/formatlineofitems", QobSalesorder.formatlineofitems);
router.post("/createOrder", QobSalesorder.createSalesOrder);
router.post("/checkopportunityfields", QobSalesorder.checkopportunityfields);
router.get("/resyncSalesforce", QobSalesorder.resyncSalesforce);
router.post("/saveItems", QobSalesorder.saveItems);
router.post("/correctedline", QobSalesorder.correctedline);

router.get("/checkInvoice", QobInvoice.checkInvoice);
router.post("/checkinvoicefields", QobInvoice.checkinvoicefields);
router.post("/checkAndCreateInvoice", QobInvoice.checkAndCreateInvoice);
router.post("/formatlineofitemsinvoice", QobInvoice.formatlineofitemsinvoice);

module.exports = router;
