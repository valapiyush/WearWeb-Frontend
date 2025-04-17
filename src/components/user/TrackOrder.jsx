// TrackOrderStatus.jsx
import React from "react";
import "../../assets/styles/trackOrder.css"; 

const statuses = ["Processing", "Packed", "Shipped", "Out for Delivery", "Delivered"];

const TrackOrderStatus = ({ currentStatus }) => {
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="tracking-container">
      {statuses.map((status, index) => (
        <div key={index} className={`step ${index <= currentIndex ? "active" : ""}`}>
          <div className="circle">{index + 1}</div>
          <div className="label">{status}</div>
        </div>
      ))}
    </div>
  );
};

export default TrackOrderStatus;
