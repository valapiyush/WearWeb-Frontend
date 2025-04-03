import React, { useState, useEffect } from 'react';
import '../../assets/styles/sellerSidebar.css';
import { FaClipboardList, FaBoxOpen, FaFileAlt, FaComments, FaTrophy, FaUser, FaHome, FaCog, FaHeart, FaHistory, FaSignOutAlt, FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle sidebar on menu click
  const handleToggleSidebar = () => {
    setIsExpanded(true); // Open sidebar when clicking any menu item
  };

  // Function to toggle sidebar with button
  const handleSidebarToggle = (event) => {
    event.stopPropagation(); // Prevent sidebar from closing when clicking the button
    setIsExpanded(!isExpanded);
  };

  // Function to close sidebar when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest(".seller-sidebar")) {
      setIsExpanded(false);
    }
  };

  // Add event listener when sidebar is open
  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isExpanded]);

  return (
    <div className={`seller-sidebar ${isExpanded ? "expanded" : "collapsed"}`}>

      {/* Three-line menu toggle button */}
      <div className="toggle-button" onClick={handleSidebarToggle}>
        <FaBars/>
      </div>

      <div className="sidebar-content">
        <div className="menu-item active" onClick={handleToggleSidebar}>
          <FaHome className="menu-icon" />
          {isExpanded && <Link to="/seller/dashboard" className="menu-label">Dashboard</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaUser className="menu-icon" />
          {isExpanded && <Link to="/leaderboard" className="menu-label">Profile</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaTrophy className="menu-icon" />
          {isExpanded && <Link to="/leaderboard" className="menu-label">Leaderboard</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaClipboardList className="menu-icon" />
          {isExpanded && <Link to="/seller/orders" className="menu-label">Orders</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaBoxOpen className="menu-icon" />
          {isExpanded && <Link to="/seller/addnewproduct" className="menu-label">Products</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaBoxOpen className="menu-icon" />
          {isExpanded && <Link to="/seller/viewmyproducts" className="menu-label">View Products</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaFileAlt className="menu-icon" />
          {isExpanded && <Link to="/leaderboard" className="menu-label">Sales Report</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaComments className="menu-icon" />
          {isExpanded && <Link to="/leaderboard" className="menu-label">Messages</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaCog className="menu-icon" />
          {isExpanded && <Link to="/leaderboard" className="menu-label">Settings</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaHeart className="menu-icon" />
          {isExpanded && <Link to="/leaderboard" className="menu-label">Favourite</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaHistory className="menu-icon" />
          {isExpanded && <Link to="/leaderboard" className="menu-label">History</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaSignOutAlt className="menu-icon" />
          {isExpanded && <Link to="/leaderboard" className="menu-label">Sign Out</Link>}
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
