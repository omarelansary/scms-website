import React, { useContext } from 'react';
import productsData from "../data/products-data";
import {ShopContext} from "../context/shop-context";


export const getOrdersFromLocalStorage = () => {
  const orders = localStorage.getItem('orders');
  if (orders) {
    return JSON.parse(orders);
  } else {
    return [];
  }
};

const removeOrderFromLocalStorage = (orderID) => {
  // Retrieve the orders
  let orders = getOrdersFromLocalStorage();

  // Filter out the order with the given ID
  orders = orders.filter(order => order.orderID !== orderID);

  // Save the updated orders back to local storage
  localStorage.setItem('orders', JSON.stringify(orders));
};


export const eachProductSales = () => {
  let Orders = getOrdersFromLocalStorage();
  const resultMap = new Map();

  Orders.forEach((order) => {
    const cartItems = order.orderItems.cartItems;

    Object.entries(cartItems).forEach(([key, value]) => {
      const currentValue = resultMap.get(key) || 0;
      resultMap.set(key, currentValue + value);
    });
  });

  const finalMap = Object.fromEntries(resultMap);
  const idToNameMap = new Map(
    productsData.map((product) => [product.id, product.name])
  );

  const keysArray = [];
  const valuesArray = [];

  for (const [key, value] of Object.entries(finalMap)) {
    const productName = idToNameMap.get(Number(key));
    if (productName && value !== 0) {
      keysArray.push(productName);
      valuesArray.push(value);
    }
  }

  return { keysArray, valuesArray };
};


const sumTotalOrders = (Orders) => {
  return Orders.reduce((total, order) => {
    return total + order.orderTotalAmount;
  }, 0);
};

const sumDayOrders = (Orders, days) => {
  let totalSales = new Array(days).fill(0);
  let dateSales=new Array(days);
  Orders.forEach((order) => {
    for (let i = 0; i < days; i++) {
      if (DaySales(order.orderID, i)) {
        totalSales[i] += order.orderTotalAmount;
      }
      const today = new Date();
      today.setDate(today.getDate() - i);

      let formattedDate;

      if (days <= 7) {
        formattedDate = today.toLocaleDateString('en-US', { weekday: 'short' });
      } else if (days > 28) {
        formattedDate = today.toLocaleDateString('en-US', { month: 'short'}); // e.g., "Aug 2024"
      } else {
        formattedDate = today.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }); // e.g., "Aug 19"
      }

      dateSales[i] = formattedDate;
    }
  });
  if (days == 2) {
    const percentageDifference =
      totalSales[1] == 0
        ? 100
        : Math.ceil(((totalSales[0] - totalSales[1]) / totalSales[1]) * 100);
    return [totalSales[0], percentageDifference];
  }
  return {dateSales,totalSales};
};

const DaySales = (ordertimestamp, dayDate) => {
  const timestampString = ordertimestamp.split("-")[0];
  const timestamp = parseInt(timestampString, 10);
  const dateToCheck = new Date(timestamp);
  const today = new Date();
  today.setDate(today.getDate() - dayDate); // Adjust today to get yesterday

  // Compare year, month, and day
  return (
    dateToCheck.getFullYear() === today.getFullYear() &&
    dateToCheck.getMonth() === today.getMonth() &&
    dateToCheck.getDate() === today.getDate()
  );
};

export const TodaySales = () => {
  const OrdersList = getOrdersFromLocalStorage();
  const dayStats = sumDayOrders(OrdersList,2);
  return [dayStats[0],dayStats[1]];
};

export const salesPerPeriod = (days) => {
  const OrdersList = getOrdersFromLocalStorage();
  const {dateSales,totalSales} = sumDayOrders(OrdersList,days);
  const dateSalesReversed=dateSales.slice().reverse()
  const totalSalesReversed=totalSales.slice().reverse()
  return {dateSalesReversed,totalSalesReversed} ;
}
