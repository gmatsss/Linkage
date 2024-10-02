function createInvoiceData(descs, quantities, amounts, customerValue) {
    descs = descs.split(',');
    quantities = quantities.split(',').map(Number);
    amounts = amounts.split(',').map(Number);

    const lineItems = descs.map((desc, index) => {
        return {
            DetailType: "SalesItemLineDetail",
            Amount: amounts[index],
            Description: desc,
            SalesItemLineDetail: {
                ServiceDate: inputData.serv,
                ItemRef: {
                    name: desc,
                    value: 13
                }
  Qty: item.quantity,
            }
        };
    });

    return {
        Line: lineItems,
        CustomerRef: {
            value: customerValue.toString()
        }
    };
}


const descs = inputData.desc;
const quantities = inputData.quantity;
const amounts = inputData.amount;
const customerValue = inputData.customer;

const jsonInvoiceData = createInvoiceData(descs, quantities, amounts, customerValue);

return jsonInvoiceData;
