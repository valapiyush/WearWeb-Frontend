import React from 'react';
import './BestSellersComponent.css';
import { FaEllipsisV } from 'react-icons/fa';

const BestSellersComponent = () => {
  const bestSellers = [
    {
      id: 1,
      title: 'Lorem Ipsum',
      price: '₹126.500',
      salePrice: '₹126.50',
      sales: '999 sales',
      image: 'https://dashboard.codeparrot.ai/api/image/Z-AXu2s0ZhD5c3ay/rectangl.png'
    },
    {
      id: 2,
      title: 'Lorem Ipsum',
      price: '₹126.500',
      salePrice: '₹126.50',
      sales: '999 sales',
      image: 'https://dashboard.codeparrot.ai/api/image/Z-AXu2s0ZhD5c3ay/rectangl-2.png'
    },
    {
      id: 3,
      title: 'Lorem Ipsum',
      price: '₹126.500',
      salePrice: '₹126.50',
      sales: '999 sales',
      image: 'https://dashboard.codeparrot.ai/api/image/Z-AXu2s0ZhD5c3ay/rectangl-3.png'
    }
  ];

  return (
    <div className="best-sellers">
      <div className="best-seller-header">
        <h2>Best Sellers</h2>
        <button className="menu-button">
          <FaEllipsisV className='best-seller-menu-icon'/>
        </button>
      </div>
      <div className="divider"></div>
      
      <div className="sellers-list">
        {bestSellers.map((seller) => (
          <div key={seller.id} className="seller-item">
            <div className="seller-info">
              <div className="seller-image">
                <img src={seller.image} alt={seller.title} />
              </div>
              <div className="seller-details">
                <h3>{seller.title}</h3>
                <span className="price">{seller.price}</span>
              </div>
            </div>
            <div className="sales-info">
              <span className="sale-price">{seller.salePrice}</span>
              <span className="sales-count">{seller.sales}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="report-button">REPORT</button>
    </div>
  );
};

export default BestSellersComponent;

