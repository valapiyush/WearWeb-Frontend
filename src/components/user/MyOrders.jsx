import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../assets/styles/cart.css";
import { FaBoxOpen } from "react-icons/fa";
import Navbar from "./Navbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user_id = localStorage.getItem("id");

  // Function to merge orders with the same order ID
  const mergeOrders = (orders) => {
    const orderMap = {};

    orders.forEach(order => {
      if (!orderMap[order._id]) {
        orderMap[order._id] = { ...order, products: [] };
      }
      orderMap[order._id].products.push(...order.products);
    });

    return Object.values(orderMap);
  };

  // Fetch orders from the API and merge them
  useEffect(() => {
    axios
      .get(`/orders/users/${user_id}`)
      .then((res) => {
        const flatOrders = res.data.data;
        const mergedOrders = mergeOrders(flatOrders);
        setOrders(mergedOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, [user_id]);

  if (loading) return <p>Loading orders...</p>;

  if (!orders.length)
    return <p style={{ textAlign: "center" }}>You haven&apos;t placed any orders yet.</p>;

  return (
    <div className="shopping-cart">
      <Navbar/>
      <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>My Orders</h2>

      <div className="cart-items">
        <div className="cart-header">
          <span colSpan="2">PRODUCT</span>
          <span>MARK</span>
          <span>QTY</span>
          <span>PRICE</span>
          <span>ORDER DETAILS</span>
        </div>

        {orders.map((order, i) => (
          <div key={order._id}>
            <h3>Order ID: {order._id}</h3>
            {order.products.map((item, j) => (
              <div className="cart-item" key={`${i}-${j}`}>
                <div className="item-image-container">
                  <img
                    src={item.product_id?.product_image_urls?.[0] || "/placeholder.jpg"}
                    alt={item.product_id?.product_name}
                    className="item-image"
                  />
                </div>
                <div className="item-details">
                  <h3 className="item-title">{item.product_id?.product_name}</h3>
                  <p className="item-subtitle">{item.product_id?.description}</p>
                </div>
                <div className="quantity-selector">
                  <span className="quantity">{item.quantity}</span>
                </div>
                <div className="item-price">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </div>
                <div className="item-price">
                  <Link to={`/orders/${order._id}`} className="checkout-btn">
                    <FaBoxOpen /> View Order
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
