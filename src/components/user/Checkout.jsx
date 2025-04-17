import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/checkout.css";
import { useNavigate } from "react-router-dom";
import loadRazorpayScript from "../user/loadRazorpay";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee] = useState(50); 
  const [discount] = useState(0); 
  const total = subtotal + shippingFee - discount;
  const [address, setAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [newAddress, setNewAddress] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    age: "",
    contact_number: "",
    title: "",
    unit_name: "",
    street: "",
    city_id: "",
    state_id: "",
    country_id: "",
    pincode: "",
  });

  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/user-details/user-details/${userId}`)
      .then((res) => setAddress(res.data.data))
      .catch((err) => console.error("Failed to fetch address", err));
  }, [userId]);
  useEffect(() => {
    axios.get(`/cart/user/${userId}`)
      .then(res => {
        const cartItems = res.data.data;
        setCart(cartItems);
  
        const sub = cartItems.reduce((acc, item) => 
          acc + item.product_id.offer_price * item.quantity, 0
        );
        setSubtotal(sub);
      })
      .catch(err => console.error("Failed to fetch cart", err));
  }, []);
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    axios.put(`/user-details/update/${userId}`, newAddress)
      .then((res) => {
        setAddress(res.data.data);
        setShowAddressForm(false);
      })
      .catch((err) => console.error("Failed to add address", err));
  };


  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
  
    if (paymentMethod === "cod") {
        try {
            const orderData = {
              user_id: userId,
              address: address._id,
              payment_method: "COD",
              amount: total, 
              status: "pending", // COD is pending until delivered
            };
        
            const response = await axios.post("/order/place", orderData);
        
            //  Redirect to Order Confirmation Page
            const orderId = response.data.order_id;
            navigate(`/order-confirmation/${orderId}`);
          } catch (err) {
            console.error("Failed to place COD order", err);
            alert("Something went wrong while placing the order. Please try again.");
          }
    }
  
    if (paymentMethod === "razorpay") {
      const isLoaded = await loadRazorpayScript();
  
      if (!isLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
  
      try {
        const { data: razorpayOrder } = await axios.post("/payment/create-order", {
          amount: total * 100,
        });
  
        const options = {
          key: "rzp_test_VUoYtVHJesQRnL",
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "Wear Web",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async function (response) {
            const paymentDetails = {
              order_id: razorpayOrder.id,
              payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
  
            await axios.post("/payment/verify", paymentDetails);
  
            const orderResponse = await axios.post("/order/place", {
              user_id: userId,
              address: address._id,
              payment_method: "Razorpay",
              payment_id: response.razorpay_payment_id,
              amount: 3550,
              status: "paid",
            });
  
            navigate(`/order-confirmation/${orderResponse.data.order_id}`);
          },
          theme: {
            color: "#4b748b",
          },
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("Razorpay error:", err);
      }
    }
  };
  
  

  return (
    <div className="checkout-container">
      <div className="billing-details">
        <h2>Billing Details</h2>
        {address ? (
          <div className="address-display">
            <p><strong>{address.first_name} {address.last_name}</strong></p>
            <p>{address.contact_number}</p>
            <p>{address.unit_name}, {address.street}</p>
            <p>{address.city_id?.name}, {address.state_id?.name}</p>
            <p>{address.country_id?.name} - {address.pincode}</p>
            <button className="add-address-btn" onClick={() => setShowAddressForm(true)}>
              Add Another Address
            </button>
          </div>
        ) : (
          <p>No address found. Please add one below.</p>
        )}

        {showAddressForm && (
          <form className="address-form" onSubmit={handleAddNewAddress}>
            <input type="text" name="first_name" placeholder="First Name" value={newAddress.first_name} onChange={handleAddressChange} required />
            <input type="text" name="last_name" placeholder="Last Name" value={newAddress.last_name} onChange={handleAddressChange} required />
            <input type="text" name="gender" placeholder="Gender" value={newAddress.gender} onChange={handleAddressChange} required />
            <input type="number" name="age" placeholder="Age" value={newAddress.age} onChange={handleAddressChange} required />
            <input type="text" name="contact_number" placeholder="Contact Number" value={newAddress.contact_number} onChange={handleAddressChange} required />
            <input type="text" name="title" placeholder="Title (e.g. Home, Office)" value={newAddress.title} onChange={handleAddressChange} required />
            <input type="text" name="unit_name" placeholder="Unit / Apartment" value={newAddress.unit_name} onChange={handleAddressChange} required />
            <input type="text" name="street" placeholder="Street" value={newAddress.street} onChange={handleAddressChange} required />
            <input type="text" name="city_id" placeholder="City ID" value={newAddress.city_id} onChange={handleAddressChange} required />
            <input type="text" name="state_id" placeholder="State ID" value={newAddress.state_id} onChange={handleAddressChange} required />
            <input type="text" name="country_id" placeholder="Country ID" value={newAddress.country_id} onChange={handleAddressChange} required />
            <input type="text" name="pincode" placeholder="Pincode" value={newAddress.pincode} onChange={handleAddressChange} required />

            <div className="form-actions">
              <button type="submit" className="submit-btn">Save Address</button>
              <button type="button" className="cancel-btn" onClick={() => setShowAddressForm(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="summary-box">
          <div className="summary-item">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <span>Shipping Fee</span>
            <span>₹{shippingFee}</span>
          </div>
          <div className="summary-item">
            <span>Coupon</span>
            <span>- ₹0</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          {/* Payment Method Dropdown */}
          <div className="payment-method">
            <label>Select Payment Method:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="razorpay">Razorpay</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
