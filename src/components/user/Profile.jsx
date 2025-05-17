import { useState } from "react";
import EditProfile from "./EditProfile";
import UserProfile from "./UserProfile";
import Navbar from "./Navbar";

const Profile = () => {
  const [viewMode, setViewMode] = useState("view");
  const [editUserData, setEditUserData] = useState(null); // Store user data for editing

  return (
    <div>
      <Navbar/>
      {viewMode === "edit" ? (
        <EditProfile setViewMode={setViewMode} userData={editUserData} />
      ) : (
        <UserProfile setViewMode={setViewMode} setEditUserData={setEditUserData} />
      )}
    </div>
  );
};

export default Profile;
