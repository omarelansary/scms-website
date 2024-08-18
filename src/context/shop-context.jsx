import { createContext, useEffect, useState } from "react";
import { productsData } from "@/data";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < productsData.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = productsData.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const generateUniqueOrderID = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const placeOrder = (name,email,address) => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {

        let itemInfo = productsData.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    var order={
      "orderID": generateUniqueOrderID(),
      "orderStatus": "ordered",
      "orderTotalAmount": totalAmount,
      "ordererName": name,
      "ordererAddress": address,
      "ordererEmail": email,
      "orderItems": {cartItems},
    }

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  };

  const getOrdersFromLocalStorage = () => {
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

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const getCartItemsCount = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0);
  };

  const checkout = (name,email,address) => {
    placeOrder(name,email,address);
    //removeOrderFromLocalStorage("1723811914884-6369")
    setCartItems(getDefaultCart());
    console.error(getOrdersFromLocalStorage())
  };

  const contextValue = {
    cartItems,
    addToCart,
    getOrdersFromLocalStorage,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    getCartItemsCount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
