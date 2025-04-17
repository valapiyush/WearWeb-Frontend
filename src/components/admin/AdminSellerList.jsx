import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminSellerList = () => {
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllSellers = async () => {
      try {
        const res = await axios.get("/users");
        const onlySellers = res.data.data
          .filter((user) => user.role_id?.name === "Seller")
          .map((user) => ({
            id: user._id,
            name: user.username,
            email: user.email,
            role: user.role_id?.name || "N/A",
          }));
        setSellers(onlySellers);
      } catch (err) {
        console.error("Error fetching sellers:", err);
      }
    };

    fetchAllSellers();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit seller with ID:", id);
    // Example: navigate to seller edit page
    navigate(`/admin/sellers/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this seller?");
    if (!confirm) return;

    try {
      await axios.delete(`/users/${id}`);
      setSellers((prev) => prev.filter((seller) => seller.id !== id));
      alert("Seller deleted successfully.");
    } catch (err) {
      console.error("Error deleting seller:", err);
      alert("Failed to delete seller.");
    }
  };

  const columns = [
    { field: "id", headerName: "Seller ID", width: 220 },
    { field: "name", headerName: "Seller Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
    {
      field: "view",
      headerName: "View",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => navigate(`/admin/sellers/${params.row.id}`)}
        >
          View
        </Button>
      ),
    }
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <h2>All Sellers</h2>
      <DataGrid
        rows={sellers}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        checkboxSelection
      />
    </div>
  );
};

export default AdminSellerList;
