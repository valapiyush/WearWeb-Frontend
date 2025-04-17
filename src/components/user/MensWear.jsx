// import React from 'react'

// export const MensWear = () => {
//   return (
//     <div className='homepage-container'>
         
//         <section className="products-section">
//           <h2>Men&apos;s Wear</h2>
//           <div className="products-grid">
//             <div className="product-card">
//               <img
//                 src="/images/image.png"
//                 alt="Product"
//                 className="product-image"
//               />
//               <h3>Casual Wear</h3>
//               <p>Stylish & Comfortable</p>
//               <button className="product-btn">Buy Now</button>
//             </div>
//             <div className="product-card">
//               <img
//                 src="/images/image1.png"
//                 alt="Product"
//                 className="product-image"
//               />
//               <h3>Printed Shirt</h3>
//               <p>Stylish & Comfortable</p>
//               <button className="product-btn">Buy Now</button>
//             </div>
//             <div className="product-card">
//               <img
//                 src="/images/image.png"
//                 alt="Product"
//                 className="product-image"
//               />
//               <h3>Women Shirt</h3>
//               <p>Premium Quality</p>
//               <button className="product-btn">Buy Now</button>
//             </div>
//             <div className="product-card">
//               <img
//                 src="images/image2.png"
//                 alt="Product"
//                 className="product-image"
//               />
//               <h3>Formal Suit</h3>
//               <p>Elegant & Trendy</p>
//               <button className="product-btn">Buy Now</button>
//             </div>
//             <div className="product-card">
//               <img
//                 src="/images/image1.png"
//                 alt="Product"
//                 className="product-image"
//               />
//               <h3>Designer Dress</h3>
//               <p>Premium Quality</p>
//               <button className="product-btn">Buy Now</button>
//             </div>
//           </div>
//         </section>
//         <section className="products-section">
//           <h2>Men&apos;s Wear</h2>
//           <div className="products-grid">
//             <div className="product-card">
//               <img
//                 src="/images/image.png"
//                 alt="Product"
//                 className="product-image"
//               />
//               <h3>Casual Wear</h3>
//               <p>Stylish & Comfortable</p>
//               <button className="product-btn">Buy Now</button>
//             </div>
//             <div className="product-card">
//               <img
//                 src="/images/image1.png"
//                 alt="Product"
//                 className="product-image"
//               />
//               <h3>Printed Shirt</h3>
//               <p>Stylish & Comfortable</p>
//               <button className="product-btn">Buy Now</button>
//             </div>
//             <div className="product-card">
//               <img
//                 src="/images/image.png"
//                 alt="Product"
//                 className="product-image"
//               />
//               <h3>Women Shirt</h3>
//               <p>Premium Quality</p>
//               <button className="product-btn">Buy Now</button>
//             </div>
//             <div className="product-card">
//               <img
//                 src="images/image2.png"
//                 alt="Product"
//                 className="product-image"
//               />
//               <h3>Formal Suit</h3>
//               <p>Elegant & Trendy</p>
//               <button className="product-btn">Buy Now</button>
//             </div>
//             <div className="product-card">
//               <img
//                 src="/images/image1.png"
//                 alt="Product"
//                 className="product-image"
//               />
//               <h3>Designer Dress</h3>
//               <p>Premium Quality</p>
//               <button className="product-btn">Buy Now</button>
//             </div>
//           </div>
//         </section>
//     </div>
//   )
// }
// export default MensWear

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

export const MensWear = () => {
  const [mensWearProducts, setMensWearProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchMensWear = async () => {
      try {
        const res = await axios.get('/products/mens/67c11cd931aacdf7de0b6601');
        console.log(res.data.data);
        // const filteredProducts = res.data.data.filter(
        //   (product) => product.category.toLowerCase() === "men's wear"
        // );
        setMensWearProducts(res.data.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchMensWear();
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
        <h2>Men&apos;s Wear</h2>
        {/* <div className="products-grid">
          {mensWearProducts.length > 0 ? (
            mensWearProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <img
                  src={product.product_image_urls}
                  alt={product.product_name}
                  className="product-image"
                />
                <h3>{product.product_name}</h3>
                <p>{product.description}</p>
                <button className="product-btn">Buy Now</button>
              </div>
            ))
          ) : (
            <p>No Men&apos;s Wear products found.</p>
          )}
        </div> */}
        <div className="products-grid">
                    {mensWearProducts.length > 0 ? (
                      mensWearProducts.map((product) => (
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
  );
};
export default MensWear;
