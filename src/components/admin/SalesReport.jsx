import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SalesReport.css";

const SalesReport = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get("/sales-report");
        if (res.data.success) setReport(res.data);
      } catch (err) {
        console.error("Failed to fetch sales report:", err);
      }
    };
    fetchReport();
  }, []);

  return (
    <div className="sales-report-container">
      <h2>Sales Report</h2>
      {report ? (
        <div>
          <p><strong>Total Orders:</strong> {report.totalOrders}</p>
          <p><strong>Total Revenue:</strong> ₹{report.totalRevenue}</p>

          <h3>Product-wise Sales</h3>
          <table className="sales-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity Sold</th>
              </tr>
            </thead>
            <tbody>
              {report.productSales.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantitySold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading sales data...</p>
      )}
    </div>
  );
};

export default SalesReport;
