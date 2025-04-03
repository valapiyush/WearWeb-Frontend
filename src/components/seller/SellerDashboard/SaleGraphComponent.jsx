import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./SaleGraphComponent.css";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SaleGraphComponent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  // Sample sales data for different periods
  const salesData = {
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [100, 200, 150, 300, 250, 400, 350]
    },
    monthly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [1000, 1500, 1200, 1800]
    },
    yearly: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      data: [5000, 7000, 6500, 8000, 7500, 9000, 8500, 10000, 9500, 11000, 10500, 12000]
    }
  };

  // Chart data
  const chartData = {
    labels: salesData[selectedPeriod].labels,
    datasets: [
      {
        label: "Sales (₹)",
        data: salesData[selectedPeriod].data,
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
