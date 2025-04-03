/* eslint-disable react/prop-types */
import React from 'react';
import './OrderCard.css';
import { FaShoppingBag,FaEllipsisV, FaArrowUp } from "react-icons/fa";

const OrderCard = ({ title, amount, percentage, comparison }) => {
  return (
    <div className="order-card">
      <div className="order-card-header">
        <span className="order-card-title">{title}</span>
        <FaEllipsisV alt="options" className="order-card-dots" />
      </div>
      <div className="order-card-body">
        <FaShoppingBag alt="icon" className="order-card-icon" />
        <div className="order-card-info">
          <span className="order-card-amount">{amount}</span>
          <div className="order-card-stats">
            <FaArrowUp  alt="arrow up" className="order-card-arrow" />
            <span className="order-card-percentage">{percentage}</span>
          </div>
        </div>
      </div>
      <div className="order-card-footer">
        <span className="order-card-comparison">{comparison}</span>
      </div>
    </div>
  );
};

export default OrderCard;
