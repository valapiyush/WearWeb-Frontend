import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/userprofile.css";

const Profile = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    age: Number,
    contact_number: "",
    title: "",
    unit_name: "",
    street: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `/user-details/user-details/${userId}`
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Handle Input Change
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]:
        e.target.name === "age" ? Number(e.target.value) : e.target.value,
    });
  };

  // Handle Update User
  const handleUpdate = async () => {
    try {
      await axios.put(`/user-details/update/${userId}`, user);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    return <div className="error-message">User not found.</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>

      <div className="profile-grid">
        {/* User Name */}
        <div className="profile-field">
          <p className="field-label">First Name</p>
          {isEditing ? (
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              className="edit-input"
            />
          ) : (
            <p className="field-value">{user.first_name}</p>
          )}
        </div>

        <div className="profile-field">
          <p className="field-label">Last Name</p>
          {isEditing ? (
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              className="edit-input"
            />
          ) : (
            <p className="field-value">{user.last_name}</p>
          )}
        </div>

        {/* Gender */}
        <div className="profile-field">
          <p className="field-label">Gender</p>
          {isEditing ? (
            <select
              name="gender"
              value={user.gender}
              onChange={handleChange}
              className="edit-input"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="field-value">{user.gender}</p>
          )}
        </div>

        {/* Age */}
        <div className="profile-field">
          <p className="field-label">Age</p>
          {isEditing ? (
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={handleChange}
              className="edit-input"
            />
          ) : (
            <p className="field-value">{user.age}</p>
          )}
        </div>

        {/* Contact */}
        <div className="profile-field">
          <p className="field-label">Contact Number</p>
          {isEditing ? (
            <input
              type="text"
              name="contact_number"
              value={user.contact_number}
              onChange={handleChange}
              className="edit-input"
            />
          ) : (
            <p className="field-value">{user.contact_number}</p>
          )}
        </div>

        {/* Title */}
        <div className="profile-field">
          <p className="field-label">Address Type</p>
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={user.title}
              onChange={handleChange}
              className="edit-input"
            />
          ) : (
            <p className="field-value">{user.title}</p>
          )}
        </div>

        {/* Address */}
        <div className="profile-field full-width">
          <p className="field-label">Address</p>
          {isEditing ? (
            <>
              <input
                type="text"
                name="unit_name"
                value={user.unit_name}
                onChange={handleChange}
                className="edit-input full-width"
              />
              <input
                type="text"
                name="street"
                value={user.street}
                onChange={handleChange}
                className="edit-input full-width"
              />
              <input
                type="text"
                name="pincode"
                value={user.pincode}
                onChange={handleChange}
                className="edit-input full-width"
              />
            </>
          ) : (
            <p className="field-value">
              {user.unit_name}, {user.street}, {user.pincode}
            </p>
          )}
        </div>

        {/* City, State, Country */}
        <div className="profile-field">
          <p className="field-label">City</p>
          {isEditing ? (
            <input
              type="text"
              name="city"
              value={user.city_id.name}
              onChange={handleChange}
              className="edit-input"
            />
          ) : (
            <p className="field-value">{user.city_id.name}</p>
          )}
        </div>
        <div className="profile-field">
          <p className="field-label">State</p>
          {isEditing ? (
            <input
              type="text"
              name="state"
              value={user.state_id.name}
              onChange={handleChange}
              className="edit-input"
            />
          ) : (
            <p className="field-value">{user.state_id.name}</p>
          )}
        </div>
        <div className="profile-field">
          <p className="field-label">Country</p>
          {isEditing ? (
            <input
              type="text"
              name="country"
              value={user.country_id.name}
              onChange={handleChange}
              className="edit-input"
            />
          ) : (
            <p className="field-value">{user.country_id.name}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="profile-buttons">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleUpdate}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
