import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import './RecentOrders.css';

const columns = [
  { 
    field: "id", 
    headerName: "Order ID", 
    width: 150 
  },
  { 
    field: "payment_method", 
    headerName: "Payment Method", 
    width: 200,
    align: 'center'
  },
  { 
    field: "date", 
    headerName: "Date", 
    width: 150 
  },
  { 
    field: "customer", 
    headerName: "Customer Name", 
    width: 200 
  },
  { 
    field: "status", 
    headerName: "Status", 
    width: 150,
    renderCell: (params) => {
      const status = params.value.toLowerCase();
      return (
        <span className={`status ${status}`}>
          {params.value}
        </span>
      );
    },
  },
  { 
    field: "amount", 
    headerName: "Amount", 
    width: 150,
    renderCell: (params) => `₹${params.value}`
  }
];

export default function DataGridDemo() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const sellerId = localStorage.getItem('id'); // Logged-in seller's ID
        const response = await axios.get('/orders');
        const allOrders = response.data.data;
        const filteredRows = allOrders.flatMap((order) => {
          return order.products
            .filter((product) => product.product_id?.user_id === sellerId)
            .map((product, index) => ({
              id: order._id + '-' + index, // Ensure uniqueness if multiple products in same order
              payment_method: order.payment_method,
              amount: order.total_amount,
              customer: order.user_id?.username || 'N/A',
              status: order.status,
              date: new Date(order.createdAt).toLocaleDateString(),
            }));
        });

        setRows(filteredRows);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setRows([]);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%', backgroundColor: '#171821' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-cell": {
            color: "white",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#171821",
            color: "white",
          },
          "& .MuiDataGrid-columnHeader .MuiCheckbox-root": {
            color: "black !important",
          },
          "& .MuiCheckbox-root": {
            color: "white !important",
          },
          "& .MuiDataGrid-iconSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#2a2d3e",
          },
          "& .MuiTablePagination-root": {
            color: "white",
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            color: "black",
          },
          "& .MuiDataGrid-columnHeaderTitleContainerContent": {
            color: "black",
          },
          "& .MuiDataGrid-selectedRowCount": {
            color: "white",
          },
        }}
      />
    </Box>
  );
}
