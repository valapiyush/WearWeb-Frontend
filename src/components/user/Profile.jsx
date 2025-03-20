import { useState, useEffect } from "react";
import axios from "axios";
// import { useRole } from "../context/RoleContext";

const Profile = () => {
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    role: role || "User",
    gender: "",
    age: "",
  });
  useEffect(() => {
    if (id) {
      axios
        .get(`/user-details/user-details/${id}`)
        .then((response) => {
          setUserData(response.data.data);
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [id]); // Runs whenever `id` changes

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="text-xl font-semibold">
            {userData.first_name || "User"}
          </h2>
          <p className="text-gray-500">{userData.last_name}</p>
          <span className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded">
            {userData.role}
          </span>
        </div>
      </div>

      {/* Profile Details */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Profile Details</h3>
        <h2 className="text-xl font-semibold">
          {userData?.first_name || "User"}
        </h2>
        <p className="text-gray-500">{userData?.last_name || "N/A"}</p>
        <p>
          <strong>First Name:</strong> {userData?.first_name || "N/A"}
        </p>
        <p>
          <strong>Last Name:</strong> {userData?.last_name || "N/A"}
        </p>
        <p>
          <strong>Role:</strong> {userData?.role || "N/A"}
        </p>
        <p>
          <strong>Gender:</strong> {userData?.gender || "N/A"}
        </p>
        <p>
          <strong>Age:</strong> {userData?.age || "N/A"}
        </p>
      </div>

      {/* Edit Profile Button (Optional) */}
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
