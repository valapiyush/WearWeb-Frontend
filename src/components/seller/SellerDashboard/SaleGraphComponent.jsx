import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios"; // Make sure to install axios
import "./SaleGraphComponent.css";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SaleGraphComponent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [salesData, setSalesData] = useState({
    labels: [],
    data: []
  });

  // Fetch sales data from the backend
  const fetchSalesData = async (period) => {
    try {
      const response = await axios.get(`/orders/sales-data`, {
        params: { period }
      });
      if (response.data.success) {
        const sales = response.data.data;
        const labels = sales.map(item => item.label);
        const data = sales.map(item => item.sales);

        setSalesData({
          labels,
          data
        });
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  // Fetch data when the component mounts or the selectedPeriod changes
  useEffect(() => {
    fetchSalesData(selectedPeriod);
  }, [selectedPeriod]);

  // Chart data
  const chartData = {
    labels: salesData.labels,
    datasets: [
      {
        label: "Sales (₹)",
        data: salesData.data,
        borderColor: "#fff",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        pointBackgroundColor: "#4CAF50",
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.25)"
        }
      }
    }
  };

  return (
    <div className="sale-graph">
      <div className="sale-graph-header">
        <h2 className="sale-graph-title">Sale Graph</h2>
        <div className="period-buttons">
          {["weekly", "monthly", "yearly"].map((period) => (
            <button 
              key={period} 
              className={`period-button ${selectedPeriod === period ? "active" : ""}`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="divider"></div>
      <div className="graph-container">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SaleGraphComponent;
