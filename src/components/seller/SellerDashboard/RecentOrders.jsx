import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { 
      field: "id", 
      headerName: "Order ID", 
      width: 150 
    },
    { 
      field: "product", 
      headerName: "Product", 
      width: 200 
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
      renderCell: (params) => (
        <span 
          style={{ 
            color: params.value === "Completed" ? "green" : "red",
            fontWeight: "bold"
          }}
        >
          {params.value}
        </span>
      ),
    },
    { 
      field: "amount", 
      headerName: "Amount", 
      width: 150,
      renderCell: (params) => `₹${params.value}` // Format currency
    }
  ];
  
  const rows = [
    { id: "ORD12345", product: "T-Shirt", date: "2025-03-25", customer: "John Doe", status: "Completed", amount: 1999 },
    { id: "ORD12346", product: "Jeans", date: "2025-03-24", customer: "Jane Smith", status: "Pending", amount: 2499 },
    { id: "ORD12347", product: "Sneakers", date: "2025-03-23", customer: "Michael Lee", status: "Completed", amount: 3999 },
    { id: "ORD12348", product: "Watch", date: "2025-03-22", customer: "Emily Davis", status: "Cancelled", amount: 5999 },
    { id: "ORD12349", product: "Backpack", date: "2025-03-21", customer: "Chris Brown", status: "Pending", amount: 1499 }
  ];
  

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
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
              color: "white", // White text for row cells
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#171821", // Dark background for header
              color: "white", // White text for headers
            },
            "& .MuiDataGrid-columnHeader .MuiCheckbox-root": {
                color: "black !important", // Black checkbox in the header
              },
            "& .MuiCheckbox-root": {
              color: "white !important", // White checkbox color
            },
            "& .MuiDataGrid-iconSeparator": {
              display: "none", // Hides the separator between column headers
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#2a2d3e", // Darker row highlight on hover
            },
            "& .MuiTablePagination-root": {
              color: "white", // White pagination text
            },
            "& .MuiDataGrid-columnHeaderTitleContainer": {
                color: "black", // White header text
            },
            "& .MuiDataGrid-columnHeaderTitleContainerContent": {
                color: "black", // White header text
            },
            "& .MuiDataGrid-selectedRowCount": {
                color: "white", // White selected row count text
            },
          }}
      />
    </Box>
  );
}
