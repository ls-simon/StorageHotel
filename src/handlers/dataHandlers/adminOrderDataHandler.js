import {makeDateString} from './../../handlers/utils.js';
import {makeOrderAddressData} from "../dataHandlers.js";

export function makeAllOrdersData(data) {
    
    var orders = [];

    if (orders) {

        data.forEach((order) => {
            orders.push(makeOrderObject(order));
        });
    }
    return orders;
}

export function makeOrderObject(order) {

    let orderObject = {};
    
    orderObject.ownerHexId = order.owner.userHexId;
    orderObject.ownerType = order.owner.userType;
    orderObject.owner = order.owner.nickName;
    orderObject.orderId = order.orderId;
    orderObject.date = makeDateString(order.date);
    orderObject.hexId = order.hexId;
    orderObject.address = makeOrderAddressData(order);
    orderObject.orderLines = order.orderLines.map((orderLine) => {
        return {
            productName: orderLine.product.productName,
            quantity: orderLine.product.quantity,
            amount: orderLine.quantity,
            productId: orderLine.product.productId,
            hexId: orderLine.product.hexId
        }
    })
    return orderObject;
}