/* eslint-disable react/prop-types */
import React from 'react';
import './EarningsAndVisitorInsights.css';

const EarningsAndVisitorInsights = ({
  totalAmount = "$6078.76",
  percentage = "80",
  profitPercentage = "48",
  title = "Earnings",
  subtitle = "Total Expense"
}) => {
  return (
    <div className="earnings-visitor-container">
      {/* Earnings Section */}
      <div className="earnings-card">
      <div className="card-body">
        <div className="heading">
          <h2>{title}</h2>
          <p className="subtitle">{subtitle}</p>
        </div>
        <div className="amount">{totalAmount}</div>
        <p className="profit-text">
          Profit is {profitPercentage}% More than last Month
        </p>
      </div>
      
      <div className="percentage-meter">
        <div className="meter-background"></div>
        <div 
          className="meter-progress" 
          style={{
            transform: `rotate(${percentage * 1.8}deg)`
          }}
        ></div>
        <div className="percentage-text">{percentage}%</div>
        <div className="meter-line"></div>
      </div>
    </div>

      {/* Visitor Insights Section */}
      <div className="visitor-section">
        <h2>Visitor Insights</h2>
        <div className="visitor-chart">
          <img src="https://dashboard.codeparrot.ai/api/image/Z8kfNqwi-41-yX5P/graph-2.png" alt="visitor graph" />
        </div>
      </div>
    </div>
  );
};

export default EarningsAndVisitorInsights;
