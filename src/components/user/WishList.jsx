import "../../assets/styles/wishlist.css"
import React, { useEffect, useState } from "react";
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const userId = localStorage.getItem("id");
      const response = await axios.get(`/wishlist/user/${userId}`);
  
      // ✅ Handle correct response format
      if (Array.isArray(response.data)) {
        setWishlist(response.data);
      } else if (response.data.data && Array.isArray(response.data.data)) {
        // If API wraps data inside `data`
        setWishlist(response.data.data);
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
        const productObjectId = "67c90529df09578e6750fd18".toString();
      await axios.delete(`/wishlist/remove/${productObjectId}`);
      
      // Update state after removal
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist ❤️</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty!</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item._id} className="wishlist-card">
              <img src={item.image} alt={item.name} className="wishlist-image" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button className="remove-btn" onClick={() => removeFromWishlist(item._id)}>
                Remove ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

