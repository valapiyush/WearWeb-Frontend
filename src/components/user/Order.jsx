import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "../../assets/styles/cart.css";
import { FaFileInvoice, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Order = () => {
  const { width, height } = useWindowSize(); // for confetti size
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/orders/${orderId}`)
      .then((res) => {
        console.log(res.data.data)
        setOrder(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch order:", err);
        setLoading(false);
      });
  }, [orderId]);

  const downloadInvoice = () => {
    window.open(`/invoice/${orderId}`, "_blank");
  };
  

  if (loading) return <p>Loading order details...</p>;

  if (!order) return <p>Order not found.</p>;

  const subtotal = order.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = order.shipping_fee || 50;
  const total = subtotal + shippingFee;

  return (
    <div className="shopping-cart">
      {/* 🎉 Confetti Animation */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={300}
        recycle={false}
      />

      <div className="cart-items">
        <div className="cart-header">
          <span colSpan="2">PRODUCT</span>
          <span>QTY</span>
          <span>PRICE</span>
        </div>

        {order.products?.map((item, index) => (
          <div className="cart-item" key={index}>
            <div className="item-image-container">
              <img
                src={item.product_id.product_image_urls[0]}
                alt={item.product_id.product_name}
                className="item-image"
              />
            </div>
            <div className="item-details">
              <h3 className="item-title">{item.product_id.product_name}</h3>
              <p className="item-subtitle">{item.product_id.description}</p>
            </div>
            <div className="quantity-selector">
              <span className="quantity">{item.quantity}</span>
            </div>
            <div className="item-price">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <span>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
                {item.product_id.original_price &&
                  item.product_id.original_price >
                    item.product_id.offer_price && (
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "gray",
                        fontSize: "0.9rem",
                      }}
                    >
                      ₹
                      {(
                        item.product_id.original_price * item.quantity
                      ).toLocaleString("en-IN")}
                    </span>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-header">
          <FaCheckCircle /> &nbsp; Order Confirmed
        </div>
        <div className="summary-content">
          <div className="summary-item">
            <span>Order ID</span>
            <span>{orderId}</span>
          </div>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="summary-item">
            <span>Shipping Fee</span>
            <span>₹{shippingFee}</span>
          </div>
          <div className="summary-item">
            <span>Payment Mode</span>
            <span>{order.payment_method}</span>
          </div>
          <div className="summary-item summary-total">
            <span>TOTAL</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
          <button className="checkout-btn" onClick={downloadInvoice}>
            <FaFileInvoice /> &nbsp; Download Invoice
          </button>
          <button
            className="checkout-btn"
            onClick={() => navigate(`/orders/${orderId}/invoice`,{ state: { order } })}
          >
            <FaFileInvoice /> &nbsp; View Invoice PDF
          </button>
        </div>
      </div>
    </div>
  );
};
