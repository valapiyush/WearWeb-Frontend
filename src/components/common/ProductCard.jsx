import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const handleAddToCart = (productId) => {
      if (role !== "User") {
        toast.success("Please log in to add items to cart.", { position: "top-right", autoClose: 1000 });
        return;
      }
  
      axios
        .post("/cart/add", { user_id: userId, product_id: productId, quantity: 1 })
        .then(() =>
          toast.success("🛒 Item added to cart!", { position: "top-center", autoClose: 1000 })
        )
        .catch(() =>
          toast.error("❌ Failed to add item!", { position: "top-right", autoClose: 1000 })
        );
    };
  
    const handleBuyNow = (product) => {
      if (role !== "User") {
        toast.error("Please log in to buy items.", { position: "top-right", autoClose: 1000 });
        return;
      }
  
      navigate("/checkout", {
        state: {
          buyNowProduct: {
            product_id: product,
            quantity: 1
          }
        }
      });
    };
  return (
    <div className="product-card">
      <ToastContainer />
      {/* <img src={product.imageUrl} alt={product.name} /> */}
      <img src={product.product_image_urls} alt={product.product_name} />
      <h3>{product.product_name}</h3>
                  <p>{product.description}</p>
                  <p className="wishlist-brand">Brand: {product.brand_name}</p>
                  <div className="wishlist-price">
                    <span
                      className="wishlist-original-price"
                      data-price={product.base_price}
                    >
                      ₹{product.base_price}
                      <span className="wishlist-discount">
                        ({product.offer_percentage}% OFF)
                      </span>
                    </span>
                    <span className="wishlist-discounted-price">
                      ₹{product.offer_price}
                    </span>
                  </div>
                  <div className="buy-cart-btn">
                    <button className="product-btn" onClick={() => handleAddToCart(product._id)}>Add To Cart</button>
                    <button className="product-btn" onClick={() => handleBuyNow(product)}>Buy Now</button>
                  </div>
    </div>
  );
};

// Prop validation using PropTypes
ProductCard.propTypes = {
  product: PropTypes.shape({
    product_name: PropTypes.string.isRequired,  // product name should be a string
    offer_price: PropTypes.number.isRequired, 
    product_image_urls: PropTypes.string.isRequired,
    base_price: PropTypes.number.isRequired,
    offer_percentage: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    brand_name: PropTypes.string.isRequired
  }).isRequired,
};

export default ProductCard;
