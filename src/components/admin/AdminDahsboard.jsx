import { useEffect, useState } from "react";
import "./AdminDashboardLayout.css";
import OrderCard from "../seller/SellerDashboard/OrderCard"; // You can reuse the same component
import UserStatsComponent from "./UserStatsComponent";
import RevenueGraphComponent from "./RevenueGraphComponent";
import RecentActivities from "./RecentActivities";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchAdminDashboardStats = async () => {
      try {
        const res = await axios.get("/orders/dashboard-stats");
        console.log(res.data.data)
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch admin dashboard stats", err);
      }
    };

    fetchAdminDashboardStats();
  }, []);

  return (
    <div>
      <div className="admin-dashboard-layout">
        <OrderCard
          title="Total Users"
          amount={stats?.totalUsers || 0}
          percentage="↑ 8%"
          comparison="This month"
        />
        <OrderCard
          title="Total Orders"
          amount={stats?.totalOrders || 0}
          percentage="↑ 12%"
          comparison="Compared to last month"
        />
        <OrderCard
          title="Total Revenue"
          amount={`₹${stats?.totalRevenue || 0}`}
          percentage="↑ 18%"
          comparison="This month"
        />
        <OrderCard
          title="Sellers Registered"
          amount={stats?.totalSellers || 0}
          percentage="↑ 5%"
          comparison="Compared to last month"
        />
      </div>

      <div className="admin-dashboard-container">
        <div className="revenue-graph-section">
          <RevenueGraphComponent />
        </div>
        <div className="user-stats-section">
          <UserStatsComponent />
        </div>
      </div>

      <div className="recent-activities-section">
        <RecentActivities />
      </div>
    </div>
  );
};

export default AdminDashboard;
