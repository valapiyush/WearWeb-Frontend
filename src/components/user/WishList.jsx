import "../../assets/styles/wishlist.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const userId = localStorage.getItem("id");
      const response = await axios.get(`/wishlist/user/${userId}`);

      if (Array.isArray(response.data)) {
        setWishlist(response.data);
      } else if (response.data.data && Array.isArray(response.data.data)) {
        setWishlist(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Unexpected wishlist format:", response.data);
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist([]);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      if (!productId) {
        console.error("Invalid product ID:", productId);
        return;
      }
      const userId = localStorage.getItem("id");
      await axios.delete(`/wishlist/remove/${userId}/${productId}`);
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.product_id._id !== productId)
      );
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem("id"); //Get user ID dynamically

    if (!userId) {
      toast.error("⚠️ Please log in to add items to cart.", {
        autoClose: 1000,
      });
      return;
    }

    try {
      const res = await axios.post("/cart/add", {
        user_id: localStorage.getItem("id"),
        product_id: productId,
        quantity: 1,
      });
      removeFromWishlist(productId);
      console.log("Cart Response:", res.data); // ✅ Debugging
      toast.success("🛒 Item added to cart!", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
      toast.error("❌ Failed to add item!", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="wishlist-container">
      <ToastContainer />
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty!</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item._id} className="wishlist-card">
              <img
                src={item.product_id.product_image_urls[0]}
                alt={item.product_id.product_name}
                className="wishlist-image"
              />
              <div className="wishlist-details">
                <h3 className="wishlist-product-name">
                  {item.product_id.product_name}
                  <p>{item.product_id.description}</p>
                </h3>
                <p className="wishlist-brand">
                  Brand: {item.product_id.brand_name}
                  
                </p>
                <div className="wishlist-price">
                  <span
                    className="wishlist-original-price"
                    data-price={item.product_id.base_price}
                  >
                    ₹{item.product_id.base_price}
                    <span className="wishlist-discount">
                      ({item.product_id.offer_percentage}% OFF)
                    </span>
                  </span>

                  <span className="wishlist-discounted-price">
                    ₹{item.product_id.offer_price}
                  </span>
                </div>
              </div>
              <div className="wishlist-actions">
                <button
                  className="wishlist-btn add-to-cart"
                  onClick={() => handleAddToCart(item.product_id._id)}
                >
                  Add to Cart
                </button>
                <button
                  className="wishlist-btn remove-btn"
                  onClick={() => removeFromWishlist(item.product_id._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
