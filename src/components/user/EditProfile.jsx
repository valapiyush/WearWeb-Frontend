import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/editProfile.css";

const EditProfile = ({ setViewMode, userData }) => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    age: "",
    contact_number: "",
    unit_name: "",
    street: "",
    pincode: "",
  });

  // 🟢 Pre-fill form with existing user data when component loads
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("id");
      if (userId) {
        await axios.put(`/user-details/update/${userId}`, user);
        alert("Profile updated successfully!");
      } else {
        const response = await axios.post("/user-details/adddetails", user);
        alert("Profile added successfully!");
        if (response.data && response.data.userId) {
          localStorage.setItem("id", response.data.userId);
        }
      }
      setViewMode("view"); // Switch to UserProfile after saving
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Edit Profile</h2>

      <div className="edit-profile-grid">
        <input className="edit-input" type="text" name="first_name" value={user.first_name} onChange={handleChange} placeholder="First Name" />
        <input className="edit-input" type="text" name="last_name" value={user.last_name} onChange={handleChange} placeholder="Last Name" />
        
        <select className="edit-input" name="gender" value={user.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        
        <input className="edit-input" type="number" name="age" value={user.age} onChange={handleChange} placeholder="Age" />
        <input className="edit-input" type="text" name="contact_number" value={user.contact_number} onChange={handleChange} placeholder="Contact Number" />
        
        <input className="edit-input" type="text" name="unit_name" value={user.unit_name} onChange={handleChange} placeholder="Apartment, Floor, etc." />
        <input className="edit-input" type="text" name="street" value={user.street} onChange={handleChange} placeholder="Street, City, etc." />
        <input className="edit-input" type="text" name="pincode" value={user.pincode} onChange={handleChange} placeholder="Pincode" />
      </div>

      <div className="edit-profile-buttons">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="cancel-btn" onClick={() => setViewMode("view")}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProfile;
