const axios = require("axios");
const { getToken, oauthClient } = require("../utils/oauth");

const createOrUpdateItem = async (itemName, itemPrice, token, companyID) => {
  try {
    // Search for the item
    let response = await axios.get(
      `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyID}/query?query=select * from Item where Name='${itemName}'`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          Accept: "application/json",
        },
      }
    );

    let item = response.data.QueryResponse.Item;
    if (item && item.length > 0) {
      // Item exists, update the price if necessary
      item = item[0];
      if (item.UnitPrice !== itemPrice) {
        item.UnitPrice = itemPrice;
        response = await axios.post(
          `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyID}/item`,
          { ...item, sparse: true },
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        item = response.data.Item;
      }
    } else {
      // Item does not exist, create a new item
      response = await axios.post(
        `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyID}/item`,
        {
          Name: itemName,
          UnitPrice: itemPrice,
          Type: "Service",
          IncomeAccountRef: {
            value: "1", // Update with your actual income account ID
            name: "Sales of Product Income",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      item = response.data.Item;
    }
    return item;
  } catch (error) {
    console.error("Error creating or updating item:", error);
    throw error;
  }
};

exports.createInvoice = async (req, res) => {
  const { clientEmail, estimateAmount, clientName, itemName } = req.body;

  try {
    const token = await getToken();
    const companyID = oauthClient.getToken().realmId;

    const item = await createOrUpdateItem(
      itemName,
      estimateAmount,
      token,
      companyID
    );

    const invoiceData = {
      Line: [
        {
          Amount: estimateAmount,
          DetailType: "SalesItemLineDetail",
          SalesItemLineDetail: {
            ItemRef: {
              value: item.Id,
              name: item.Name,
            },
          },
        },
      ],
      CustomerRef: {
        value: "1", // This should be a valid customer ID in your QBO account
      },
      BillEmail: {
        Address: clientEmail,
      },
    };

    const response = await axios.post(
      `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyID}/invoice`,
      invoiceData,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).send("Invoice created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating invoice");
  }
};
