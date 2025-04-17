import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
export const WomensWear = () => {
  const [womensWearProducts, setWomensWearProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchWoensWear = async () => {
      try {
        const res = await axios.get('/products/womens/67c11cf631aacdf7de0b6603');
        console.log(res.data.data);
        // const filteredProducts = res.data.data.filter(
        //   (product) => product.category.toLowerCase() === "men's wear"
        // );
        setWomensWearProducts(res.data.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchWoensWear();
  }, []);
  const toggleWishlist = async (productId) => {
    if (!userId) {
      alert("Please log in to manage your wishlist.");
      return;
    }
  const isInWishlist = wishlist.includes(productId);
  
      try {
        if (isInWishlist) {
          await axios.delete(`/wishlist/remove/${productId}`, {
            data: { user_id: userId },
          });
          setWishlist((prev) => prev.filter((id) => id !== productId));
          toast.success("❤️ Removed from wishlist", {
            position: "top-right",
            autoClose: 1000, // Auto close in 3 sec
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        } else {
          await axios.post("/wishlist/add", {
            user_id: userId,
            product_id: productId,
          });
          setWishlist((prev) => [...prev, productId]);
          toast.success("💖 Added to wishlist", {
            position: "top-right",
            autoClose: 1000, // Auto close in 3 sec
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      } catch (error) {
        console.error("Wishlist error:", error);
        toast.error(" Failed to update wishlist", {
          position: "top-right",
          autoClose: 1000, // Auto close in 3 sec
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
  };
   const handleAddToCart = (productId) => {
      if (role != "User") {
        toast.success("Please log in to add items to cart.", {
          position: "top-right",
          autoClose: 1000, // Auto close in 3 sec
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        return;
      }
  
      axios
        .post("/cart/add", {
          user_id: userId,
          product_id: productId,
          quantity: 1,
        })
        .then(() =>
          toast.success("🛒 Item added to cart!", {
            position: "top-center",
            autoClose: 1000, // Auto close in 3 sec
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          })
        )
        .catch(() => toast.error("❌ Failed to add item!"), {
          position: "top-right",
          autoClose: 1000, // Auto close in 3 sec
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
    };
  
  return (
    <div className="homepage-container">
        <ToastContainer />
      <section className="products-section">
        <h2>Women&apos;s Wear</h2>
        
        <div className="products-grid">
                    {womensWearProducts.length > 0 ? (
                      womensWearProducts.map((product) => (
                        <div key={product._id} className="product-card">
                          <div className="product-image-container">
                            <img
                              src={product.product_image_urls}
                              alt={product.product_name}
                              className="product-image"
                            />
                          </div>
                          <FaHeart
                            className={`wishlist-icon ${
                              wishlist.includes(product._id) ? "liked" : ""
                            }`}
                            onClick={() => toggleWishlist(product._id)}
                          />
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
                            <button
                              className="product-btn"
                              onClick={() => handleAddToCart(product._id)}
                            >
                              Add To Cart
                            </button>
                            <button className="product-btn">Buy Now</button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Loading products...</p>
                    )}
                  </div>
      </section>
    </div>
  )
}
export default WomensWear