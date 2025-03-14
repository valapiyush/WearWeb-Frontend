import React from 'react';
import './LevelAndCustomerFulfillment.css';

const LevelAndCustomerFulfillment = () => {
  return (
    <div className="level-fulfillment-container">
      {/* Level Section */}
      <div className="level-section">
        <h2>Level</h2>
        <div className="level-chart">
          <img src="https://dashboard.codeparrot.ai/api/image/Z8kfNqwi-41-yX5P/bars.png" alt="level bars" />
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-dot volume"></div>
            <span>Volume</span>
          </div>
          <div className="legend-divider"></div>
          <div className="legend-item">
            <div className="legend-dot service"></div>
            <span>Service</span>
          </div>
        </div>
      </div>

      {/* Customer Fulfillment Section */}
      <div className="fulfillment-section">
        <h2>Customer Fulfillment</h2>
        <div className="fulfillment-chart">
          <img src="https://dashboard.codeparrot.ai/api/image/Z8kfNqwi-41-yX5P/graph.png" alt="fulfillment graph" />
        </div>
      </div>
    </div>
  );
};

export default LevelAndCustomerFulfillment;
