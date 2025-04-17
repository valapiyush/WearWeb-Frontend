import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/cart.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";

export const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [shippingFee] = useState(50);
  const [discount, setDiscount] = useState(0);

  const userId = localStorage.getItem("id");

  // 🟢 Fetch Cart Data
  useEffect(() => {
    axios.get("/cart/user/" + userId)
      .then((response) => {
        setCart(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
        setLoading(false);
      });
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product_id?.offer_price * item.quantity,
    0
  );

  const total = subtotal + shippingFee - discount;

  const handleQuantity = (product, value) => {
    const newQuantity = Math.max(1, product.quantity + value);

    axios.put(`/cart/update/${product._id}`, { quantity: newQuantity })
      .then(() => {
        setCart(prevCart =>
          prevCart.map(item =>
            item._id === product._id ? { ...item, quantity: newQuantity } : item
          )
        );
      })
      .catch((error) => console.error("Error updating quantity:", error));
  };

  const handleDelete = (product) => {
    axios.delete(`/cart/remove/${product._id}`)
      .then(() => {
        toast.success("Item removed from cart!", {
          position: "top-center",
          autoClose: 1000,
        });
        setCart(prevCart => prevCart.filter(item => item._id !== product._id));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim() === "SAVE10") {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      toast.success("Coupon applied! 10% off", { autoClose: 1000 });
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code", { autoClose: 1000 });
    }
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
              <div className="cart-item" key={product._id}>
                <div className="item-image-container">
                  <img
                    src={product.product_id?.product_image_urls[0]}
                    alt={product.product_id?.product_name}
                    className="item-image"
                  />
                </div>
                <div className="item-details">
                  <h3 className="item-title">{product.product_id?.product_name}</h3>
                  <p className="item-subtitle">{product.product_id?.description}</p>
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
                  <span>
                    ₹{(product.product_id?.offer_price * product.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="delete-btn" onClick={() => handleDelete(product)}>
                  <FaTrashAlt size={20} color="red" />
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-header">
              <FaCartShopping /> &nbsp; Cart Summary
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
                <div className="coupon-box">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button className="apply-btn" onClick={handleApplyCoupon}>
                    Apply
                  </button>
                </div>
              </div>
              {discount > 0 && (
                <div className="summary-item">
                  <span>Discount</span>
                  <span>- ₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="summary-item summary-total">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <a href="/checkout" className="checkout-btn">
                Proceed to Checkout
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
