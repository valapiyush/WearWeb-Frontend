import { useState, useEffect, useRef } from "react";
import "../../assets/styles/homepage.css";
import Slider from "react-slick";
import Navbar from "./Navbar";
import { PrimaryNavbar } from "../common/PrimaryNavbar";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const isLoggedIn = localStorage.getItem("id") !== null;
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/products/products")
      .then((response) => setProducts(response.data.data))
      .catch((error) => console.error("Error fetching products:", error));

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
      toast.error("Please log in to manage your wishlist!", { position: "top-center", autoClose: 1000 });
      return;
    }

    const isInWishlist = wishlist.includes(productId);

    try {
      if (isInWishlist) {
        await axios.delete(`/wishlist/remove/${userId}/${productId}`, { data: { user_id: userId } });
        setWishlist((prev) => prev.filter((id) => id !== productId));
        toast.success("❤️ Removed from wishlist", { position: "top-center", autoClose: 1000 });
      } else {
        await axios.post("/wishlist/add", { user_id: userId, product_id: productId });
        setWishlist((prev) => [...prev, productId]);
        toast.success("💖 Added to wishlist", { position: "top-center", autoClose: 1000 });
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Failed to update wishlist", { position: "top-center", autoClose: 1000 });
    }
  };

  const handleAddToCart = (productId) => {
    if (role !== "User") {
      toast.error("Please log in to add items to cart.", { position: "top-center", autoClose: 1000 });
      return;
    }

    axios
      .post("/cart/add", { user_id: userId, product_id: productId, quantity: 1 })
      .then(() =>
        toast.success("🛒 Item added to cart!", { position: "top-center", autoClose: 1000 })
      )
      .catch(() =>
        toast.error("❌ Failed to add item!", { position: "top-center", autoClose: 1000 })
      );
  };

  const handleBuyNow = (product) => {
    if (role !== "User") {
      toast.error("Please log in to buy items.", { position: "top-center", autoClose: 1000 });
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

  const handleShopNowClick = () => {
    switch (activeSlide) {
      case 0:
        navigate("/products?filter=discount50");
        break;
      case 1:
        navigate("/products?filter=limited-offer");
        break;
      case 2:
        navigate("/products?filter=new-arrivals");
        break;
      default:
        navigate("/products");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_, next) => setActiveSlide(next),
  };

  return (
    <>
      {isLoggedIn && role === "User" ? <Navbar /> : <PrimaryNavbar />}
      <ToastContainer />
      <div className="homepage-container">
        <section className="hero-section">
          <Slider ref={sliderRef} {...settings}>
            <div className="hero-content">
              <h1>50% Off on All Products</h1>
              <p>
                Experience the latest fashion, beauty, and lifestyle trends at the best price.
              </p>
              <button className="hero-btn" onClick={handleShopNowClick}>Shop Now</button>
            </div>
            <div className="hero-content">
              <h1>Limited Time Offer!</h1>
              <p>
                Get up to 50% off on all clothing, accessories, and jewelry.
              </p>
              <button className="hero-btn" onClick={handleShopNowClick}>Shop Now</button>
            </div>
            <div className="hero-content">
              <h1>New Arrivals</h1>
              <p>Discover the latest fashion trends and stylish accessories.</p>
              <button className="hero-btn" onClick={handleShopNowClick}>Shop Now</button>
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
                    className={`wishlist-icon ${wishlist.includes(product._id) ? "liked" : ""}`}
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
                    <button className="product-btn" onClick={() => handleAddToCart(product._id)}>Add To Cart</button>
                    <button className="product-btn" onClick={() => handleBuyNow(product)}>Buy Now</button>
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
