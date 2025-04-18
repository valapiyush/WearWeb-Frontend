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
    title: "",
    user_id: "",
    city_id: "",
    state_id: "",
    country_id: "",
  });

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const [cityRes, stateRes, countries] = await Promise.all([
          axios.get("/city/cities"),
          axios.get("/state/states"),
          axios.get("/country/countries"),
        ]);
        console.log(cityRes.data.data);
        console.log(stateRes.data.data);
        console.log(countries.data.data);
        setCities(cityRes.data.data || []);
        setStates(stateRes.data.data || []);
        setCountries(countries.data.data || []);
      } catch (err) {
        console.error("Error fetching location data:", err);
      }
    };

    fetchLocationData();
  }, []);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const userId = localStorage.getItem("id");

    if (!userId) {
      alert("User is not logged in or user_id is missing.");
      return;
    }

    try {
      const response = await axios.get(`/user-details/${userId}`);

      if (!response.data.data) {
        await axios.post("/user-details/adddetails", {
          ...user,
          user_id: userId,
        });
        alert("Profile created successfully!");
      } else {
        await axios.put(`/user-details/update/${userId}`, {
          ...user,
          user_id: userId,
        });
        
        alert("Profile updated successfully!");
      }

      setViewMode("view");
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

        <select className="edit-input" name="title" value={user.title} onChange={handleChange}>
          <option value="">Select Title</option>
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Hostel">Hostel</option>
          <option value="Other">Other</option>
        </select>

        <select className="edit-input" name="city_id" value={user.city_id} onChange={handleChange}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city._id} value={city._id}>
              {city.name}
            </option>
          ))}
        </select>

        <select className="edit-input" name="state_id" value={user.state_id} onChange={handleChange}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state._id} value={state._id}>
              {state.name}
            </option>
          ))}
        </select>

        <select className="edit-input" name="country_id" value={user.country_id} onChange={handleChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country._id} value={country._id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="edit-profile-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-btn" onClick={() => setViewMode("view")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
