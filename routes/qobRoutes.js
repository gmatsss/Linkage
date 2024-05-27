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

router.get("/checkInvoice", QobInvoice.checkInvoice);
router.post("/checkinvoicefields", QobInvoice.checkinvoicefields);

module.exports = router;
