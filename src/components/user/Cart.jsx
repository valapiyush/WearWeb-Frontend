import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/cart.css";
import image1 from "/images/image1.png";
import { FaTrashAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";

export const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shippingFee] = useState(50);

  const userId = localStorage.getItem("id");
  // 🟢 Fetch Cart Data
  useEffect(() => {
    axios.get("/cart/user/"+userId)
      .then((response) => {
        console.log(response.data.data.map(item => item.quantity));

        setCart(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
        setLoading(false);
      });
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.product_id.offer_price * item.quantity, 0);
  const total = subtotal + shippingFee;

  // Update Quantity API
  const handleQuantity = (product, value) => {
    const newQuantity = Math.max(1, product.quantity + value);
  
    axios.put(`/cart/update/${product._id}`, { quantity: newQuantity })
      .then((response) => {
        setCart(prevCart => 
          prevCart.map(item =>
            item._id === product._id ? { ...item, quantity: newQuantity } : item
          )
        );
      })
      .catch((error) => console.error("Error updating quantity:", error));
  };
  

  // Delete Item API
  const handleDelete = (product) => {
    axios.delete(`/cart/remove/${product._id}`)  
      .then(() => {
        toast.success(" Item removed from cart!", { position: "top-center",autoClose: 1000 });
        setCart(prevCart => prevCart.filter(item => item._id !== product._id));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };
  
  const processOnlinePayment = async (amount) => {
    return new Promise((resolve) => {
      const options = {
        key: "RAZORPAY_API_KEY",
        amount: amount * 100, // Convert to paisa
        currency: "INR",
        name: "Wear Web",
        description: "Fashion Order Payment",
        handler: function (response) {
          resolve({ success: true, transaction_id: response.razorpay_payment_id });
        },
        prefill: {
          name:"",
          email: "",
          contact: null,
        },
        theme: { color: "#4b748b" },
      };
  
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    });
  };
  
  // Checkout API
  const handleCheckout = async() => {
    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }
  
    // Define cart items
    const cartItems = cart.map((item) => ({
      product_id: item.product_id._id,
      quantity: item.quantity,
      price: item.product_id.offer_price,
    }));
  
    // Define total amount
    const cartTotal = subtotal + shippingFee;
  
    // Get selected payment method
    const selectedPaymentMethod = "COD"; // Default to COD (Cash on Delivery)
  
    // Define transaction ID (for online payments)
    let paymentTransactionId = null;
  
    // If Razorpay or Stripe is used, generate transaction_id
    if (selectedPaymentMethod !== "COD") {
      const response = await processOnlinePayment(cartTotal);
      if (!response.success) {
        alert("Payment failed! Try again.");
        return;
      }
      paymentTransactionId = response.transaction_id;
    }
  
    // Make checkout API call
    axios
      .post("/payment/checkout", {
        user_id: userId,
        cart: cartItems,
        total: cartTotal,
        payment_method: selectedPaymentMethod,
        transaction_id: paymentTransactionId, // If online payment
      })
      .then((response) => {
        alert("Order placed successfully!");
        setCart([]); // Clear cart in UI
        window.location.href = `/order-confirmation/${response.data.order_id}`;
      })
      .catch((error) => console.error("Checkout failed:", error));
  };
  
  

  return (
    <div className="shopping-cart">
      <ToastContainer />
      {loading ? (
        <p>Loading cart...</p>
      ) : cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty 🛒</h2>
          <p>Add some items to proceed!</p>
        </div>
      ) : (
        <>
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
                  <img src={product.product_id.product_image_urls[0]} alt={product.product_id.product_name} className="item-image" />
                </div>
                <div className="item-details">
                  <h3 className="item-title">{product.product_id.product_name}</h3>
                  <p className="item-subtitle">{product.product_id.description}</p>
                </div>
                <div className="quantity-selector">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantity(product, -1)}
                    disabled={product.quantity === 1}
                  >
                    -
                  </button>
                  <span className="quantity">{product.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantity(product, 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-price">
                  <span>₹{(product.product_id.offer_price * product.quantity).toLocaleString("en-IN")}</span>
                </div>
                <div className="delete-btn" onClick={() => handleDelete(product)}>
                  <FaTrashAlt size={20} color="red" />
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-header">
              <FaCartShopping /> &nbsp; Purchase Summary
            </div>
            <div className="summary-content">
              <div className="summary-item">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="summary-item">
                <span>Shipping Fee</span>
                <span>₹{shippingFee}</span>
              </div>
              <div className="summary-item">
                <span>Coupon</span>
                <span>No</span>
              </div>
              <div className="summary-item summary-total">
                <span>TOTAL</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
