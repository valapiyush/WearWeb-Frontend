/* eslint-disable react/prop-types */
// import React from 'react';
import './TopProducts.css';

const TopProducts = ({ products = [
  {
    id: '01',
    name: 'Home Decore Range',
    popularity: 46,
    color: '#fcb859'
  },
  {
    id: '02', 
    name: 'Disney Princess Dress',
    popularity: 17,
    color: '#a9dfd8'
  },
  {
    id: '03',
    name: 'Bathroom Essentials',
    popularity: 19,
    color: '#28aef3'
  },
  {
    id: '04',
    name: 'Apple Smartwatch',
    popularity: 29,
    color: '#f2c8ed'
  }
] }) => {
  return (
    <div className="top-products">
      <h2 className="top-products-title">Top Products</h2>
      
      <div className="products-table">
        <div className="table-header">
          <div className="header-item header-hash">#</div>
          <div className="header-item header-name">Name</div>
          <div className="header-item header-popularity">Popularity</div>
          <div className="header-item header-sales">Sales</div>
        </div>

        {products.map((product) => (
          <div key={product.id} className="product-row">
            <div className="product-id">{product.id}</div>
            <div className="product-name">{product.name}</div>
            <div className="product-popularity">
              <div 
                className="popularity-bar" 
                style={{
                  width: `${product.popularity * 3}px`,
                  backgroundColor: product.color
                }} 
              />
            </div>
            <div className="product-sales">
              <div 
                className="sales-badge"
                style={{
                  backgroundColor: `${product.color}1f`,
                  border: `0.5px solid ${product.color}`,
                  color: product.color
                }}
              >
                {product.popularity}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
