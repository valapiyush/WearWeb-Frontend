import { useState } from 'react';
import '../../assets/styles/primaryNavbar.css';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const PrimaryNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`You searched for: ${searchQuery}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="brand">
          Wear Web
        </Link>
      </div>

      <div className="navbar-search">
        <form className ="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="navbar-auth">
        <Link to="/loginsignup" className="login-signup-btn">Login / Sign Up</Link>
      </div>

      <button className="menu-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={toggleSidebar}><Link to="/">Home</Link></li>
          <li onClick={toggleSidebar}><Link to="/men">Men</Link></li>
          <li onClick={toggleSidebar}><Link to="/women">Women</Link></li>
          <li onClick={toggleSidebar}><Link to="/kids">Kids</Link></li>
          <li onClick={toggleSidebar}><Link to="/home-living">Home & Living</Link></li>
          <li onClick={toggleSidebar}><Link to="/beauty">Beauty</Link></li>
        </ul>
      </div>
    </nav>
  );
};