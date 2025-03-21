import { useState, useEffect } from "react";
import "../../assets/styles/homepage.css";
import Slider from "react-slick";
import Navbar from "./Navbar";
import { PrimaryNavbar } from "../common/PrimaryNavbar";
import { FaHeart } from "react-icons/fa"; 
import axios from "axios";

const HomePage = () => {
  const [wishlist, setWishlist] = useState([]);
  const isLoggedIn = localStorage.getItem("id") !== null;
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");
  
  useEffect(() => {
    if (userId) {
      axios.get(`/api/wishlist/${userId}`)
        .then(response => setWishlist(response.data))
        .catch(error => console.error("Error fetching wishlist:", error));
    }
  }, [userId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  
  const toggleWishlist = async (productId) => {
    if (!userId) {
      alert("Please log in to manage your wishlist.");
      return;
    }
  
    // 🔥 Convert productId to a string (MongoDB ObjectId)
    const productObjectId = "67c90529df09578e6750fd18".toString();
  
    console.log("Clicked Wishlist Button for Product:", productObjectId);
    console.log("Current userId:", userId);
  
    const isInWishlist = wishlist.includes(productObjectId);
    try {
      if (isInWishlist) {
        console.log("Removing from wishlist:", productObjectId);
        await axios.delete(`/wishlist/remove/${productObjectId}`, { data: { userId } });
        setWishlist(wishlist.filter(id => id !== productObjectId));
      } else {
        console.log("Adding to wishlist:", productObjectId);
  
        // 🔍 Debug before sending
        console.log("Sending request with:", { user_id: String(userId), product_id: productObjectId });
  
        const response = await axios.post("/wishlist/add", {
          user_id: String(userId),  // Ensure it's a string
          product_id: productObjectId,
        });
  
        console.log("Response from Server:", response.data);
        setWishlist([...wishlist, productObjectId]);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error.response?.data || error.message);
    }
  };
  
  
  
  
  

  const products = [
    { id: 1, name: "Casual Wear", desc: "Stylish & Comfortable", img: "../../public/images/image.png" },
    { id: 2, name: "Printed Shirt", desc: "Stylish & Comfortable", img: "../../public/images/image1.png" },
    { id: 3, name: "Women Shirt", desc: "Premium Quality", img: "../../public/images/image2.png" },
    { id: 4, name: "Formal Suit", desc: "Elegant & Trendy", img: "../../public/images/image.png" },
    { id: 5, name: "Designer Dress", desc: "Premium Quality", img: "../../public/images/image1.png" },
    { id: 6, name: "Designer Dress", desc: "Premium Quality", img: "../../public/images/image2.png" }
  ];

  return (
    <>
      {isLoggedIn && role === "User" ? <Navbar /> : <PrimaryNavbar />}
      <div className="homepage-container">
        <section className="hero-section">
          <Slider {...settings}>
            <div className="hero-content">
              <h1>70% Off on All Products</h1>
              <p>Exclusive deals on top fashion and accessories.</p>
              <button className="hero-btn">Shop Now</button>
            </div>
            <div className="hero-content">
              <h1>Limited Time Offer!</h1>
              <p>Hurry, while stocks last.</p>
              <button className="hero-btn">Shop Now</button>
            </div>
            <div className="hero-content">
              <h1>New Arrivals</h1>
              <p>Check out the latest trends in fashion.</p>
              <button className="hero-btn">Shop Now</button>
            </div>
          </Slider>
        </section>

        <section className="products-section">
          <h2>Top Selling Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.img} alt={product.name} className="product-image" />
                
                <FaHeart
                  className={`wishlist-icon ${wishlist.includes(product.id) ? "liked" : ""}`}
                  onClick={() => toggleWishlist(product.id)}
                />

                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <button className="product-btn">Buy Now</button>
              </div>
            ))}
          </div>
        </section>
        <section className="products-section">
          <h2>Top Selling Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.img} alt={product.name} className="product-image" />
                
                <FaHeart
                  className={`wishlist-icon ${wishlist.includes(product.id) ? "liked" : ""}`}
                  onClick={() => toggleWishlist(product.id)}
                />

                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <button className="product-btn">Buy Now</button>
              </div>
            ))}
          </div>
        </section>
        <section className="products-section">
          <h2>Top Selling Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.img} alt={product.name} className="product-image" />
                
                <FaHeart
                  className={`wishlist-icon ${wishlist.includes(product.id) ? "liked" : ""}`}
                  onClick={() => toggleWishlist(product.id)}
                />

                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <button className="product-btn">Buy Now</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
