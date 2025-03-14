// import React from 'react';
import './DashboardLayout.css';
import SalesOverview from '../SellerDashboard/SalesOverview_EarningsAndVisitorInsights_LevelAndCustomerFulfillment';
import Navbar from '../SellerNavbar';

export const DashboardLayout = () => {
  return (
    <div className="dashboard-container">

      <Navbar />
      <div className="main-content">
        <div className="content-sections">
          <div className="bottom-sections">
          <SalesOverview />
            {/* <TopProducts /> */}
            {/* <EarningsAndVisitorInsights /> */}
            {/* <LevelAndCustomerFulfillment /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

