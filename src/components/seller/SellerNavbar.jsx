import React, { useState, useRef, useEffect } from "react";
import "../../assets/styles/sellerNavbar.css";
import { FaSearch, FaBell, FaUser, FaBars, FaTimes, FaSignOutAlt, FaAngleRight } from "react-icons/fa";
import Sidebar from "../user/Sidebar";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(null);

  const popupRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const togglePopup = (type) => {
    setPopupOpen(popupOpen === type ? null : type);
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
          <span className="brand-name">Wear Web</span>
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
          {popupOpen === "notifications" && 
            <div className="popup-content">
                <div className="popup-header">
                  <h3>Notifications</h3>
                  <span className="notification-close-button" onClick={() => togglePopup(null)}><FaTimes/></span>
                </div>
                <div className="popup-content">
                    <p>No new notifications</p>
                    <p>You have a new order</p>
                    <p>You have a new review</p>
                    <p>You have a new message</p>
                    <p>You have a new order</p>
                </div>
            </div>
        }
          {popupOpen === "admin" && 
            <div className="popup-content">
                <h3>Admin</h3>
                <span className="notification-close-button" onClick={() => togglePopup(null)}><FaTimes/></span>

                <Link to="/ChnagePassword ">Chnage Password <FaAngleRight /></Link>
                <Link to="/logout">Logout <FaSignOutAlt/></Link>
            </div>
        }
        </div>
      )}

      {sidebarOpen && <Sidebar />}
    </>
  );
};

export default Navbar;
