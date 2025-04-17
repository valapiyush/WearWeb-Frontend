import { useEffect, useState } from "react";
import "./DashboardLayout.css";
import OrderCard from "./OrderCard";
import BestSellersComponent from "./BestSellersComponent";
import SaleGraphComponent from "./SaleGraphComponent";
import RecentOrders from "./RecentOrders";
import axios from "axios";

const DashboardLayout = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await axios.get("/orders/dashboard-stats");
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div>
      <div className="dashboard-layout">
        <OrderCard
          title="Total Orders"
          amount={`₹${stats?.totalRevenue || 0}`}
          percentage="↑ 15%"
          comparison="This month"
        />
        <OrderCard
          title="Active Orders"
          amount={stats?.activeOrders || 0}
          percentage="↑ 10%"
          comparison="Compared to last month"
        />
        <OrderCard
          title="Completed Orders"
          amount={stats?.completedOrders || 0}
          percentage="↑ 20%"
          comparison="Compared to last month"
        />
        <OrderCard
          title="Return Orders"
          amount={stats?.returnOrders || 0}
          percentage="↓ 5%"
          comparison="Compared to last month"
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
        <RecentOrders />
      </div>
    </div>
  );
};

export default DashboardLayout;
