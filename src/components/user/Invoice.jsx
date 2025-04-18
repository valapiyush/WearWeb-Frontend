import  { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import autoTable from "jspdf-autotable"; 
// autoTable(jsPDF);
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/styles/invoice.css";

const Invoice = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`/orders/${orderId}`)
      .then(res => setOrder(res.data.data))
      .catch(err => console.error("Failed to fetch order:", err));
  }, [orderId]);

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // ✅ Title & Branding
    doc.setFontSize(20);
    doc.setTextColor("#4b748b");
    doc.text("Wear Web - Invoice", 14, 20);
  
    // ✅ Order Metadata
    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.text(`Order ID: ${order._id}`, 14, 30);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 36);
    doc.text(`Payment Method: ${order.payment_method}`, 14, 42);
  
    // ✅ Billing Info (optional - if you have user/customer name/address)
    if (order.user_details) {
      doc.text(`Customer: ${order.user_details.full_name}`, 14, 50);
      doc.text(`Email: ${order.user_details.email}`, 14, 56);
      doc.text(
        `Address: ${order.user_details.address}, ${order.user_details.city}, ${order.user_details.state}, ${order.user_details.zip}`,
        14,
        62
      );
    }
  
    // ✅ Product Table
    const tableStartY = order.user_details ? 70 : 50;
    autoTable(doc, {
      startY: tableStartY,
      head: [["Product", "Qty", "Price", "Total"]],
      body: order.products.map((item) => [
        item.product_id.product_name,
        item.quantity,
        `₹${item.price}`,
        `₹${item.quantity * item.price}`,
      ]),
      theme: "grid",
      headStyles: {
        fillColor: [75, 116, 139],
      },
    });
  
    // ✅ Totals
    const subtotal = order.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shipping = order.shipping_fee || 50;
    const total = subtotal + shipping;
  
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Subtotal: ₹${subtotal}`, 14, finalY);
    doc.text(`Shipping: ₹${shipping}`, 14, finalY + 6);
    doc.setFont(undefined, "bold");
    doc.text(`Total: ₹${total}`, 14, finalY + 12);
  
    // ✅ Footer
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.setTextColor("gray");
    doc.text(
      "Thank you for shopping with Wear Web!",
      14,
      finalY + 25
    );
  
    doc.save(`Invoice_${order._id}.pdf`);
  };
  

  if (!order) return <p>Loading order data...</p>;

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <h2>Wear Web - Invoice</h2>
        <div className="invoice-meta">
          <div>Order ID: {order._id}</div>
          <div>Date: {new Date(order.createdAt).toLocaleDateString()}</div>
          <div>Payment Method: {order.payment_method}</div>
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((item, index) => (
            <tr key={index}>
              <td>{item.product_id.product_name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-summary">
        <span>Subtotal: ₹{order.products.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
        <span>Shipping: ₹{order.shipping_fee || 50}</span>
        <span className="invoice-total">Total: ₹{order.total_amount}</span>
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default Invoice;
