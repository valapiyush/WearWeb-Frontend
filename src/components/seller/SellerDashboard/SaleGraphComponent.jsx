// SalesGraph.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography, CircularProgress } from '@mui/material';
import "./SaleGraphComponent.css"

const SaleGraphComponent = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const sellerId = localStorage.getItem('id');

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('/orders');
        const orders = response.data.data;

        // Extract sales related to the current seller
        const sellerSales = [];

        orders.forEach(order => {
          const date = new Date(order.createdAt).toLocaleDateString();

          order.products.forEach(product => {
            const userId = product.product_id?.user_id?._id || product.product_id?.user_id;

            if (userId === sellerId) {
              const totalSale = product.quantity * product.product_id?.offer_price || 0;

              // Push sale data with date
              sellerSales.push({
                date,
                total: totalSale
              });
            }
          });
        });

        // Group sales by date
        const groupedSales = sellerSales.reduce((acc, curr) => {
          const found = acc.find(item => item.date === curr.date);
          if (found) {
            found.total += curr.total;
          } else {
            acc.push({ date: curr.date, total: curr.total });
          }
          return acc;
        }, []);

        setSalesData(groupedSales);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [sellerId]);

  return (
    <Box sx={{ padding: 3, backgroundColor: '#1f2029', borderRadius: 2, mt: 4 }}>
      <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
        📈 Sales Graph (by Date)
      </Typography>

      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <Line type="monotone" dataKey="total" stroke="#4fc3f7" strokeWidth={3} />
            <CartesianGrid stroke="#555" strokeDasharray="5 5" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default SaleGraphComponent;
