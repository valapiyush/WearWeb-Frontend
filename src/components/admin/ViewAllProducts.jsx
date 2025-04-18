import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewAllProducts.css"; // custom modern styling

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("/products/products"); // Make sure this route calls getAllProducts
        if (res.data.success) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div className="admin-products-container">
      <h2>All Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  <img
                    src={product.product_image_urls}
                    alt={product.propduct_name}
                    className="product-img"
                  />
                </td>
                <td>{product.product_name}</td>
                <td>{product.category_id?.category_name || "N/A"}</td>
                <td>{product.sub_category_id?.sub_category_name || "N/A"}</td>
                <td>₹{product.offer_price}</td>
                <td>
                  {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllProducts;
