// import React from "react";
import "../../assets/styles/homepage.css";
import Slider from "react-slick";
import Navbar from "./Navbar";
import { PrimaryNavbar } from "../common/PrimaryNavbar";

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Change the speed of the autoplay
  };
  const isLoggedIn = localStorage.getItem("id") !== null;
  const role = localStorage.getItem("role");
  return (
    <>
      {isLoggedIn && role === "User" ? <Navbar /> : <PrimaryNavbar />}
      <div className="homepage-container">
        {/* Hero Section */}
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

        {/* Products Section */}
        <section className="products-section">
          <h2>Top Selling Products</h2>
          <div className="products-grid">
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Casual Wear</h3>
              <p>Stylish & Comfortable</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image1.png"
                alt="Product"
                className="product-image"
              />
              <h3>Printed Shirt</h3>
              <p>Stylish & Comfortable</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image2.png"
                alt="Product"
                className="product-image"
              />
              <h3>Women Shirt</h3>
              <p>Premium Quality</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Formal Suit</h3>
              <p>Elegant & Trendy</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Designer Dress</h3>
              <p>Premium Quality</p>
              <button className="product-btn">Buy Now</button>
            </div>
          </div>
        </section>
        <section className="products-section">
          <h2>Top Selling Products</h2>
          <div className="products-grid">
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Casual Wear</h3>
              <p>Stylish & Comfortable</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Formal Suit</h3>
              <p>Elegant & Trendy</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Designer Dress</h3>
              <p>Premium Quality</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Formal Suit</h3>
              <p>Elegant & Trendy</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Designer Dress</h3>
              <p>Premium Quality</p>
              <button className="product-btn">Buy Now</button>
            </div>
          </div>
        </section>
        <section className="products-section">
          <h2>Top Selling Products</h2>
          <div className="products-grid">
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Casual Wear</h3>
              <p>Stylish & Comfortable</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Formal Suit</h3>
              <p>Elegant & Trendy</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Designer Dress</h3>
              <p>Premium Quality</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Formal Suit</h3>
              <p>Elegant & Trendy</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Designer Dress</h3>
              <p>Premium Quality</p>
              <button className="product-btn">Buy Now</button>
            </div>
          </div>
        </section>
        <section className="products-section">
          <h2>Top Selling Products</h2>
          <div className="products-grid">
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Casual Wear</h3>
              <p>Stylish & Comfortable</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Formal Suit</h3>
              <p>Elegant & Trendy</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Designer Dress</h3>
              <p>Premium Quality</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Formal Suit</h3>
              <p>Elegant & Trendy</p>
              <button className="product-btn">Buy Now</button>
            </div>
            <div className="product-card">
              <img
                src="../src/images/image.png"
                alt="Product"
                className="product-image"
              />
              <h3>Designer Dress</h3>
              <p>Premium Quality</p>
              <button className="product-btn">Buy Now</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
