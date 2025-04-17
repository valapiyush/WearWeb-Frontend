import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/styles/orderConfirmation.css";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/orders/${orderId}`);
        
        setOrderDetails(res.data.data);
      } catch (err) {
        console.error("Failed to fetch order details", err);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!orderDetails) {
    return <div className="order-confirmation-container">Loading...</div>;
  }

  return (
    <div className="order-confirmation-container">
      <div className="confirmation-card">
        <h2>🎉 Thank You for Your Order!</h2>
        <p>Your order <strong>#{orderDetails._id}</strong> has been placed successfully.</p>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <p><strong>Status:</strong> {orderDetails.status}</p>
          <p><strong>Payment Method:</strong> {orderDetails.payment_method}</p>
          {orderDetails.payment_id && (
            <p><strong>Payment ID:</strong> {orderDetails.payment_id}</p>
          )}
          <p><strong>Total Amount:</strong> ₹{orderDetails.amount}</p>
        </div>

        <button
          className="download-invoice-btn"
          onClick={() => window.open(`/invoice/${orderDetails._id}`)}
        >
          📄 Download Invoice (PDF)
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
