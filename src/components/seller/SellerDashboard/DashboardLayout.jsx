

import React from "react";
import "./DashboardLayout.css";
import OrderCard from "./OrderCard";
import BestSellersComponent from "./BestSellersComponent";
import SaleGraphComponent from "./SaleGraphComponent";
import RecentOrders from "./RecentOrders";

const DashboardLayout = () => {
  return (
    <div >
      <div className="dashboard-layout">
        <OrderCard
          title="Total Orders"
          amount="₹126.500"
          percentage="34.7%"
          comparison="Compared to Oct 2023"
        />
        <OrderCard
          title="Active Orders"
          amount="₹126.500"
          percentage="34.7%"
          comparison="Compared to Oct 2023"
        />
        <OrderCard
          title="Completed Orders"
          amount="₹126.500"
          percentage="34.7%"
          comparison="Compared to Oct 2023"
        />
        <OrderCard
          title="Return Orders"
          amount="₹126.500"
          percentage="34.7%"
          comparison="Compared to Oct 2023"
        />
      </div>

      <div className="dashboard-container">
        <div className="sale-graph-section">
          <SaleGraphComponent />
        </div>
        <div className="best-sellers-section">
          <BestSellersComponent />
        </div>
        
      </div>
      <div className="recent-orders-section">
          <RecentOrders/>
        </div>
    </div>
  );
};

export default DashboardLayout;
