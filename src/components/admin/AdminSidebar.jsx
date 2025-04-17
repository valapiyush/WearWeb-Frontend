import React, { useState, useEffect } from 'react';
import '../../assets/styles/adminSidebar.css';
import { FaUserShield, FaUsers, FaChartBar, FaProductHunt, FaCog, FaHistory, FaSignOutAlt, FaBars, FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleSidebar = () => {
    setIsExpanded(true);
  };

  const handleSidebarToggle = (event) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".admin-sidebar")) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isExpanded]);

  return (
    <div className={`admin-sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="toggle-button" onClick={handleSidebarToggle}>
        <FaBars />
      </div>

      <div className="sidebar-content">
        <div className="menu-item active" onClick={handleToggleSidebar}>
          <FaHome className="menu-icon" />
          {isExpanded && <Link to="/admin/dashboard" className="menu-label">Dashboard</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaUserShield className="menu-icon" />
          {isExpanded && <Link to="/admin/sellers" className="menu-label">Manage Sellers</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaUsers className="menu-icon" />
          {isExpanded && <Link to="/admin/users" className="menu-label">Manage Users</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaProductHunt className="menu-icon" />
          {isExpanded && <Link to="/admin/products" className="menu-label">All Products</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaChartBar className="menu-icon" />
          {isExpanded && <Link to="/admin/reports" className="menu-label">Reports</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaCog className="menu-icon" />
          {isExpanded && <Link to="/admin/settings" className="menu-label">Settings</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaHistory className="menu-icon" />
          {isExpanded && <Link to="/admin/logs" className="menu-label">Activity Logs</Link>}
        </div>
        <div className="menu-item" onClick={handleToggleSidebar}>
          <FaSignOutAlt className="menu-icon" />
          {isExpanded && <Link to="/" className="menu-label">Logout</Link>}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
