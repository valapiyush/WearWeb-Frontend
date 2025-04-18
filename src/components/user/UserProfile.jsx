import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/UserProfile.css";

const UserProfile = ({ setViewMode,setEditUserData  }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("id");
        if (!userId) return;

        const response = await axios.get(`/user-details/${userId}`);
        console.log(response.data.data);
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return (
      <div className="profile-container">
        <h3 className="error-message">No profile found.</h3>
        <button className="edit-btn" onClick={() => setViewMode("edit")}>Add Profile</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>

      <div className="profile-grid">
        <div className="profile-field">
          <p className="field-label">First Name:</p>
          <p className="field-value">{user.first_name}</p>
        </div>

        <div className="profile-field">
          <p className="field-label">Last Name:</p>
          <p className="field-value">{user.last_name}</p>
        </div>

        <div className="profile-field">
          <p className="field-label">Gender:</p>
          <p className="field-value">{user.gender}</p>
        </div>

        <div className="profile-field">
          <p className="field-label">Age:</p>
          <p className="field-value">{user.age}</p>
        </div>

        <div className="profile-field">
          <p className="field-label">Contact:</p>
          <p className="field-value">{user.contact_number}</p>
        </div>

        <div className="profile-field full-width">
          <p className="field-label">Address:</p>
          <p className="field-value">{user.unit_name}, {user.street}, {user.pincode}</p>
        </div>
        <div className="profile-field full-width">
          <p className="field-label">City</p>
          <p className="field-value">{user.city_id.name}</p>
        </div>
        <div className="profile-field full-width">
          <p className="field-label">State</p>
          <p className="field-value">{user.state_id.name}</p>
        </div>
        <div className="profile-field full-width">
          <p className="field-label">Country</p>
          <p className="field-value">{user.country_id.name}</p>
        </div>
      </div>

      <div className="profile-buttons">
        <button className="edit-btn" onClick={() => { setEditUserData(user); setViewMode("edit"); }}>Edit Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
0