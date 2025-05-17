import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/styles/orderConfirmation.css";
import Navbar from "./Navbar";

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

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "processing":
        return "status-processing";
      case "shipped":
        return "status-shipped";
      case "delivered":
        return "status-delivered";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-default";
    }
  };

  return (
    <div>
      <Navbar />
      <div className="order-confirmation-container">
        <div className="confirmation-card">
          <h2>🎉 Thank You for Your Order!</h2>
          <p>
            Your order <strong>#{orderDetails._id}</strong> has been placed successfully.
          </p>

          <div className="order-status-badge-container">
            <span className={`status-badge ${getStatusClass(orderDetails.status)}`}>
              {orderDetails.status}
            </span>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <p><strong>Payment Method:</strong> {orderDetails.payment_method}</p>
            {orderDetails.payment_id && (
              <p><strong>Payment ID:</strong> {orderDetails.payment_id}</p>
            )}
            <p><strong>Total Amount:</strong> ₹{orderDetails.total_amount}</p>
          </div>

          <button
            className="download-invoice-btn"
            onClick={() => window.open(`/invoice/${orderDetails._id}`)}
          >
            📄 Download Invoice (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
