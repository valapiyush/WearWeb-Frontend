import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* <img src={product.imageUrl} alt={product.name} /> */}
      <img src={product.product_image_urls} alt={product.product_name} />
      <h4>{product.product_name}</h4> {/* Updated to use correct product property */}
      <p>₹{product.offer_price}</p>
    </div>
  );
};

// Prop validation using PropTypes
ProductCard.propTypes = {
  product: PropTypes.shape({
    product_name: PropTypes.string.isRequired,  // product name should be a string
    offer_price: PropTypes.number.isRequired, 
    product_image_urls: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
