import React, { useState } from "react";
import "../assets/styles/cart.css";
import image1 from "../images/image1.png";
import { FaTrashAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export const Cart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Product Name",
      mark: "Product Mark",
      price: 1599,
      quantity: 1,
    },
    {
      id: 2,
      name: "Product Name",
      mark: "Product Mark",
      price: 1699,
      quantity: 1,
    },
    {
      id: 3,
      name: "Product Name",
      mark: "Product Mark",
      price: 1799,
      quantity: 1,
    },
    {
      id: 4,
      name: "Product Name",
      mark: "Product Mark",
      price: 1899,
      quantity: 1,
    },
  ]);

  const [shippingFee] = useState(50); // Set shipping fee
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingFee;

  const handleQuantity = (product, value) => {
    const newCart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: Math.max(1, item.quantity + value) }
        : item
    );
    setCart(newCart);
  };
  const handleCheckout = () => {
    alert("Checkout triggered");
  };

  const handleDelete = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  return (
    <div className="shopping-cart">
      <div className="cart-items">
        <div className="cart-header">
          <span>PRODUCT</span>
          <span>MARK</span>
          <span>QTY</span>
          <span>PRICE</span>
          <span>ACTION</span>
        </div>
        {cart.map((product) => (
          <div className="cart-item" key={product.id}>
            <div className="item-image-container">
              <img src={image1} alt="product-image" className="item-image" />
            </div>
            <div className="item-details">
              <h3 className="item-title">{product.name}</h3>
              <p className="item-subtitle">{product.mark}</p>
            </div>
            <div className="quantity-selector">
              <span
                className="quantity-btn"
                onClick={() => handleQuantity(product, -1)}
              >
                -
              </span>
              <span className="quantity">{product.quantity}</span>
              <span
                className="quantity-btn"
                onClick={() => handleQuantity(product, 1)}
              >
                +
              </span>
            </div>
            <div className="item-price">
              <span className="item-price">
                ₹{product.price * product.quantity}
              </span>
            </div>
            <div className="delete-btn" onClick={() => handleDelete(product)}>
              <FaTrashAlt size={20} color="red" />
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <div className="summary-header">
            <FaCartShopping /> &nbsp;&nbsp;Purchase Summary
          </div>
          <div className="summary-content">
            <div className="summary-item">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-item">
              <span>Shipping fee</span>
              <span>₹{shippingFee}</span>
            </div>
            <div className="summary-item">
              <span>Coupon</span>
              <span>No</span>
            </div>
            <div className="summary-item summary-total">
              <span>TOTAL</span>
              <span>₹{total}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
