import { useEffect, useState } from "react";
import "./AdminDashboardLayout.css";
import OrderCard from "../seller/SellerDashboard/OrderCard";
import RecentOrders from "../seller/SellerDashboard/RecentOrders";
import SaleGraphComponent from "../seller/SellerDashboard/SaleGraphComponent";
import axios from "axios";
import BestSellersComponent from "../seller/SellerDashboard/BestSellersComponent";

const AdminLayout = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/admin/dashboard-stats");
        setStats(res.data.data);
      } catch (error) {
        console.error("Failed to load admin dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  // Function to calculate percentage change
  const calculatePercentageChange = (currentValue, previousValue) => {
    if (previousValue === 0) return currentValue > 0 ? "∞%" : "0%"; // Handling division by zero
    return `${(((currentValue - previousValue) / previousValue) * 100).toFixed(2)}%`;
  };

  return (
    <div>
      <div className="dashboard-layout">
        <OrderCard
          title="Total Revenue"
          amount={`₹${stats?.totalRevenue || 0}`}
          percentage={stats?.totalRevenue && stats?.previousTotalRevenue ? 
            calculatePercentageChange(stats.totalRevenue, stats.previousTotalRevenue) : "↑ 0%"}
          comparison="This quarter"
        />
        <OrderCard
          title="Total Sellers"
          amount={stats?.totalSellers || 0}
          percentage={stats?.totalSellers && stats?.previousTotalSellers ? 
            calculatePercentageChange(stats.totalSellers, stats.previousTotalSellers) : "↑ 0%"}
          comparison="Compared to last month"
        />
        <OrderCard
          title="Total Users"
          amount={stats?.totalUsers || 0}
          percentage={stats?.totalUsers && stats?.previousTotalUsers ? 
            calculatePercentageChange(stats.totalUsers, stats.previousTotalUsers) : "↑ 0%"}
          comparison="Compared to last month"
        />
        <OrderCard
          title="Pending Verifications"
          amount={stats?.pendingApprovals || 0}
          percentage={stats?.pendingApprovals && stats?.previousPendingApprovals ? 
            calculatePercentageChange(stats.pendingApprovals, stats.previousPendingApprovals) : "↓ 0%"}
          comparison="Compared to last week"
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

export default AdminLayout;
