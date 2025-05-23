import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./AdminUserList.css";
const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("/users");
        const onlyCustomers = res.data.data
          .filter((user) => user.role_id?.name === "User") // Only users
          .map((user) => ({
            id: user._id,
            name: user.username,
            email: user.email,
            role: user.role_id?.name || "N/A",
          }));
        setUsers(onlyCustomers);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchAllUsers();
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
      setUsers((prev) => prev.filter((seller) => seller.id !== id));
      alert("Seller deleted successfully.");
    } catch (err) {
      console.error("Error deleting seller:", err);
      alert("Failed to delete seller.");
    }
  };
  const columns = [
    { field: "id", headerName: "User ID", width: 220 },
    { field: "name", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    // { field: "role", headerName: "Role", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
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
  ];

  return (
    <div className="admin-user-container">
    <h2>All Users (Customers Only)</h2>
    <table className="user-table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Username</th>
          <th>Email</th>
          {/* <th>Role</th> */}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {/* <td>{user.role}</td> */}
            <td>
              <div className="action-buttons">
                {/* <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </Button> */}
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(user.id)}
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

export default AdminUserList;
