import React, { useState, useRef, useEffect } from "react";
import "../../assets/styles/adminNavbar.css";
import { FaSearch, FaBell, FaUser, FaBars, FaTimes, FaSignOutAlt, FaAngleRight } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import { useRole } from "../context/RoleContext";
const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(null);
  const popupRef = useRef(null);
  const { setRole } = useRole();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const togglePopup = (type) => {
    setPopupOpen(popupOpen === type ? null : type);
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    setRole(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <FaBars className="menu-icon" onClick={toggleSidebar} />
          <span className="brand-name"><Link style={{ color: "white" }} to="/admin/dashboard">Wear Web Admin</Link></span>
        </div>
        <div className="navbar-right">
          <div
            className={`search-container ${searchOpen ? "open" : ""}`}
            onMouseEnter={() => setSearchOpen(true)}
            onMouseLeave={() => setSearchOpen(false)}
          >
            <FaSearch className="nav-icon" />
            <input type="text" placeholder="Search..." className="search-input" />
          </div>

          <div className="icon-container" onClick={() => togglePopup("notifications")}>
            <FaBell className="nav-icon" />
          </div>

          <div className="icon-container" onClick={() => togglePopup("admin")}>
            <FaUser className="nav-icon" />
          </div>
        </div>
      </nav>

      {popupOpen && (
        <div className={`popup-box ${popupOpen}`} ref={popupRef}>
          {popupOpen === "notifications" && (
            <div className="popup-content">
              <div className="popup-header">
                <h3>Notifications</h3>
                <span className="notification-close-button" onClick={() => togglePopup(null)}><FaTimes /></span>
              </div>
              <div className="popup-content">
                <p>New user signed up</p>
                <p>Product reported by customer</p>
                <p>Seller request pending</p>
              </div>
            </div>
          )}
          {popupOpen === "admin" && (
            <div className="popup-content">
              <h3>Admin</h3>
              <span className="notification-close-button" onClick={() => togglePopup(null)}><FaTimes /></span>

              <Link to="/forgotpassword">Change Password <FaAngleRight /></Link>
              <a href="/" onClick={handleLogout}>Logout <FaSignOutAlt /></a>
            </div>
          )}
        </div>
      )}

      {sidebarOpen && <AdminSidebar />}
    </>
  );
};

export default AdminNavbar;
