import { useState } from "react";
import axios from "axios";

const DeleteAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("id");

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/users/${userId}`);
      if (res.status === 200) {
        localStorage.clear();
        alert("Account deleted successfully.");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete account.");
    }
  };

  return (
    <div>
      <h3>Deactivate or Delete Account</h3>
      <p>This action is irreversible. You will lose all your data.</p>
      <button className="delete-btn" onClick={() => setShowModal(true)}>
        Delete My Account
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>Are you absolutely sure?</h4>
            <p>This action cannot be undone. This will permanently delete your account.</p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleDelete}>Yes, Delete</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
