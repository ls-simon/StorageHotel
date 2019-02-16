export const makeOrderBodyFromData = (orderLines, address) =>{
    
    let orderLinesToSend = [];     
    let orderToSend = {...address};
    
    orderLines.forEach((orderLine) => {

        orderLinesToSend.push({
            productHexId: orderLine.hexId,
            quantity: parseInt(orderLine.amount, 10)
        });
    });

    orderToSend.date = Date.parse(new Date());

    orderToSend.orderLines = orderLinesToSend;
    orderToSend.zipCode = orderToSend.zip;
    orderToSend.title = "Order to " + orderToSend.city;
    
    return orderToSend;   
}

