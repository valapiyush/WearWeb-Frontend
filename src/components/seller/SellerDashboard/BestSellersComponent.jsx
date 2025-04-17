import { useEffect, useState } from 'react';
import './BestSellersComponent.css';
import { FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';

const BestSellersComponent = () => {
  const [bestSellers, setBestSellers] = useState([]);

  // Dummy data to show when no best sellers are found
  const dummyData = [
    {
      id: 1,
      title: 'Sample Product 1',
      price: '999.00',
      salePrice: '799.00',
      totalSales: '120 sales',
      image: '/images/image.png'
    },
    {
      id: 2,
      title: 'Sample Product 2',
      price: '1499.00',
      salePrice: '1199.00',
      totalSales: '95 sales',
      image: '/images/image1.png'
    },
    {
      id: 3,
      title: 'Sample Product 3',
      price: '1999.00',
      salePrice: '1699.00',
      totalSales: '80 sales',
      image: '/images/image2.png'
    }
  ];

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await axios.get('/best-sellers');
        if (res.data.success && res.data.data.length > 0) {
          setBestSellers(res.data.data);
        } else {
          setBestSellers(dummyData); // Use dummy data if no best sellers found
        }
      } catch (err) {
        console.error("Error fetching best sellers:", err);
        setBestSellers(dummyData); // Use dummy data in case of error
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <div className="best-sellers">
      <div className="best-seller-header">
        <h2>Best Sellers</h2>
        <button className="menu-button">
          <FaEllipsisV className="best-seller-menu-icon" />
        </button>
      </div>
      <div className="divider"></div>

      <div className="sellers-list">
        {bestSellers.length === 0 ? (
          <p>No best sellers found.</p>
        ) : (
          bestSellers.map((seller) => (
            <div key={seller.id} className="seller-item">
              <div className="seller-info">
                <div className="seller-image">
                  <img src={seller.image} alt={seller.title} />
                </div>
                <div className="seller-details">
                  <h3>{seller.title}</h3>
                  <span className="price">₹{seller.price}</span>
                </div>
              </div>
              <div className="sales-info">
                <span className="sale-price">₹{seller.salePrice}</span>
                <span className="sales-count">{seller.totalSales}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="report-button">REPORT</button>
    </div>
  );
};

export default BestSellersComponent;
