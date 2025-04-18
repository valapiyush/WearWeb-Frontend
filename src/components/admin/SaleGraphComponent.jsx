import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const SaleGraphComponent = () => {
  const [salesData, setSalesData] = useState([]);
  const [period, setPeriod] = useState("weekly");

  const fetchSalesData = async () => {
    try {
      const res = await axios.get(`/orders/sales-data?period=${period}`);
      setSalesData(res.data.data);
    } catch (err) {
      console.error("Error fetching sales data:", err);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [period]);

  const chartData = {
    labels: salesData.map((item) => item.label),
    datasets: [
      {
        label: `Sales (${period})`,
        data: salesData.map((item) => item.sales),
        fill: false,
        backgroundColor: "#4b748b",
        borderColor: "#4b748b",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff", // legend text color
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "#ddd" }, // x-axis label color
        grid: { color: "#444" },   // optional: grid line color
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ddd", // y-axis label color
          callback: (value) => `₹${value}`,
        },
        grid: { color: "#444" },
      },
    },
  };

  return (
    <div style={{
      background: "#303244",
      padding: "1rem",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      color: "#fff",
      height:"auto"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h3 style={{ margin: 0 }}>Sales Overview ({period.charAt(0).toUpperCase() + period.slice(1)})</h3>
        <Select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          size="small"
          sx={{ color: "#fff", borderColor: "#ccc", '.MuiOutlinedInput-notchedOutline': { borderColor: "#666" } }}
        >
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </div>
      <Line data={chartData} options={chartOptions} height={350} />
    </div>
  );
};

export default SaleGraphComponent;
