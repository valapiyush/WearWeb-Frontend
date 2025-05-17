import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/checkout.css";
import { useNavigate, useParams } from "react-router-dom";
import loadRazorpayScript from "../user/loadRazorpay";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee] = useState(50);
  const [discount] = useState(0);
  const total = subtotal + shippingFee - discount;
  const orderId = useParams();

  const [address, setAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
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
  const location = useLocation();
  const buyNowProduct = location.state?.buyNowProduct || null;

  useEffect(() => {
    axios
      .get(`/user-details/${userId}`)
      .then((res) => setAddress(res.data.data))
      .catch((err) => console.error("Failed to fetch address", err));
  }, [userId]);

  // useEffect(() => {
  //   axios.get(`/cart/user/${userId}`)
  //     .then(res => {
  //       const cartItems = res.data.data;
  //       setCart(cartItems);
  //       const sub = cartItems.reduce((acc, item) => acc + item.product_id.offer_price * item.quantity, 0);
  //       setSubtotal(sub);
  //     })
  //     .catch(err => console.error("Failed to fetch cart", err));
  // }, [userId]);
  useEffect(() => {
    if (buyNowProduct) {
      setCart([buyNowProduct]);
      setSubtotal(
        buyNowProduct.product_id.offer_price * buyNowProduct.quantity
      );
    } else {
      axios
        .get(`/cart/user/${userId}`)
        .then((res) => {
          const cartItems = res.data.data;
          setCart(cartItems);
          const sub = cartItems.reduce(
            (acc, item) => acc + item.product_id.offer_price * item.quantity,
            0
          );
          setSubtotal(sub);
        })
        .catch((err) => console.error("Failed to fetch cart", err));
    }
  }, [userId, buyNowProduct]);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const [cityRes, stateRes, countries] = await Promise.all([
          axios.get("/city/cities"),
          axios.get("/state/states"),
          axios.get("/country/countries"),
        ]);
        setCities(cityRes.data.data || []);
        setStates(stateRes.data.data || []);
        setCountries(countries.data.data || []);
      } catch (err) {
        console.error("Error fetching location data:", err);
      }
    };

    fetchLocationData();
  }, []);
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/user-details/adddetails`, newAddress)
      .then((res) => {
        setAddress(res.data.data);
        setShowAddressForm(false);
        setEditingAddress(false);
      })
      .catch((err) => console.error("Failed to update address", err));
  };

  const handleEditAddress = () => {
    if (address) {
      setNewAddress({ ...address });
      setShowAddressForm(true);
      setEditingAddress(true);
    }
  };

  const handleAddNewAddress = () => {
    setNewAddress({
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
    setShowAddressForm(true);
    setEditingAddress(false);
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const orderPayload = {
      user_id: userId,
      products: cart.map((item) => ({
        product_id: item.product_id._id || item.product_id,
        quantity: item.quantity,
        price: item.product_id.offer_price,
      })),
      total_amount: total,
      status: "Processing",
      payment_status: paymentMethod === "cod" ? "Pending" : "Paid",
      payment_method: paymentMethod === "cod" ? "COD" : "Razorpay",
      shipping_address_id: address?._id,
    };

    if (paymentMethod === "cod") {
      try {
        const response = await axios.post("/orders", orderPayload);
        navigate(`/order-confirmation/${response.data.data}`);
      } catch (err) {
        console.error("Failed to place COD order", err);
        alert(
          "Something went wrong while placing the order. Please try again."
        );
      }
    }

    if (paymentMethod === "razorpay") {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      try {
        const { data: razorpayOrder } = await axios.post(
          "/payment/create-order",
          {
            amount: total * 100,
          }
        );

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

            const orderResponse = await axios.post("/orders", orderPayload);

            // ⬇️ Use the actual order_id returned by the backend
            navigate(`/order-confirmation/${orderResponse.data.data}`);
          },

          theme: { color: "#4b748b" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("Razorpay error:", err);
        alert("Razorpay payment failed. Please try again.");
      }
    }
  };

  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  return (
    <div className="checkout-container">
      <Navbar />
      <div className="billing-details">
        <h2>Billing Details</h2>

        {address ? (
          <div className="address-display">
            <p>
              <strong>
                {address.first_name} {address.last_name}
              </strong>
            </p>
            <p>{address.contact_number}</p>
            <p>
              {address.unit_name}, {address.street}
            </p>
            <p>
              {address.city_id?.name}, {address.state_id?.name}
            </p>
            <p>
              {address.country_id?.name} - {address.pincode}
            </p>
            {/* <button className="add-address-btn" onClick={handleEditAddress} style={{ display: editingAddress ? "none" : "block" , backgroundColor: "#90C67C"}}>Edit Address</button> */}
            
          </div>
        ) : (
          <div className="address-display">
            <p>No address found. Please add one below.</p>
            <button className="add-address-btn" onClick={handleAddNewAddress}>
              Add Address
            </button>
          </div>
          
        )}

        {showAddressForm && (
          <form className="address-form" onSubmit={handleAddressSubmit}>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={newAddress.first_name}
              onChange={handleAddressChange}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={newAddress.last_name}
              onChange={handleAddressChange}
              required
            />
            <select
              className="edit-input"
              name="gender"
              value={newAddress.gender}
              onChange={handleAddressChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>{" "}
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={newAddress.age}
              onChange={handleAddressChange}
              required
            />
            <input
              type="text"
              name="contact_number"
              placeholder="Contact Number"
              value={newAddress.contact_number}
              onChange={handleAddressChange}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Title (e.g. Home, Office)"
              value={newAddress.title}
              onChange={handleAddressChange}
              required
            />
            <input
              type="text"
              name="unit_name"
              placeholder="Unit / Apartment"
              value={newAddress.unit_name}
              onChange={handleAddressChange}
              required
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={newAddress.street}
              onChange={handleAddressChange}
              required
            />
            <select
              name="city_id"
              value={newAddress.city_id}
              onChange={handleAddressChange}
              required
            >
              <option value="">Select City</option>
              {cities?.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
            <select
              name="state_id"
              value={newAddress.state_id}
              onChange={handleAddressChange}
              required
            >
              <option value="">Select State</option>
              {states?.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
            <select
              name="country_id"
              value={newAddress.country_id}
              onChange={handleAddressChange}
              required
            >
              <option value="">Select Country</option>
              {countries?.map((country) => (
                <option key={country._id} value={country._id}>
                  {country.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={handleAddressChange}
              required
            />
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingAddress ? "Update Address" : "Save Address"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowAddressForm(false)}
              >
                Cancel
              </button>
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
            <span>- ₹{discount}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          <div className="payment-method">
            <label>Select Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
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
