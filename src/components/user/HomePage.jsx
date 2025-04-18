import { useState, useEffect } from "react";
import "../../assets/styles/homepage.css";
import Slider from "react-slick";
import Navbar from "./Navbar";
import { PrimaryNavbar } from "../common/PrimaryNavbar";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const isLoggedIn = localStorage.getItem("id") !== null;
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    //  Fetch Products
    axios
      .get("/products/products")
      .then((response) => setProducts(response.data.data))
      .catch((error) => console.error("Error fetching products:", error));

    // Fetch Wishlist only if user is logged in
    if (userId) {
      axios
        .get(`/wishlist/user/${userId}`)
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setWishlist(response.data.data.map((item) => item.product_id._id));
          }
        })
        .catch((error) => console.error("Error fetching wishlist:", error));
    }
  }, [userId]);

  const toggleWishlist = async (productId) => {
    if (!userId) {
      toast.error("Please log in to manage your wishlist!", {
        position: "top-center",
        autoClose: 1000,
      });
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      {isLoggedIn && role === "User" ? <Navbar /> : <PrimaryNavbar />}
      <ToastContainer />
      <div className="homepage-container">
        <section className="hero-section">
          <Slider {...settings}>
            <div className="hero-content">
              <h1>70% Off on All Products</h1>
              <p>
                Experience the latest fashion, beauty, and lifestyle trends at
                the best price.
              </p>
              <button className="hero-btn">Shop Now</button>
            </div>
            <div className="hero-content">
              <h1>Limited Time Offer!</h1>
              <p>
                Get up to 50% off on all clothing, accessories, and jewelry.
              </p>
              <button className="hero-btn">Shop Now</button>
            </div>
            <div className="hero-content">
              <h1>New Arrivals</h1>
              <p>Discover the latest fashion trends and stylish accessories.</p>
              <button className="hero-btn">Shop Now</button>
            </div>
          </Slider>
        </section>

        <section className="products-section">
          <h2>Top Selling Products</h2>
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
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
    </>
  );
};

export default HomePage;
