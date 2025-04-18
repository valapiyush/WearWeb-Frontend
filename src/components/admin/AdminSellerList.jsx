import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import "./AdminSellerList.css"; 

const AdminSellerList = () => {
  const [sellers, setSellers] = useState([]);
  // const navigate = useNavigate();

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
            phone: user.phone || "N/A",
            shop: user.shop_name || "N/A",
            role: user.role_id?.name || "N/A",
          }));
        setSellers(onlySellers);
      } catch (err) {
        console.error("Error fetching sellers:", err);
      }
    };

    fetchAllSellers();
  }, []);

  // const handleEdit = (id) => {
  //   navigate(`/admin/sellers/edit/${id}`);
  // };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this seller?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/users/${id}`);
      setSellers((prev) => prev.filter((seller) => seller.id !== id));
      alert("Seller deleted successfully.");
    } catch (err) {
      console.error("Error deleting seller:", err);
      alert("Failed to delete seller.");
    }
  };

  return (
    <div className="admin-seller-container">
      <h2>All Sellers</h2>
      <table className="seller-table">
        <thead>
          <tr>
            <th>Seller ID</th>
            <th>Seller Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller.id}>
              <td>{seller.id}</td>
              <td>{seller.name}</td>
              <td>{seller.email}</td>
              <td>
                <div className="action-buttons">
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(seller.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSellerList;
