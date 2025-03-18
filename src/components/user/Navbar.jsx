import { useEffect, useRef, useState } from 'react';
import '../../assets/styles/navbar.css'; // Import the CSS file
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaTimes, FaBars, FaCog, FaBox, FaSignOutAlt  } from 'react-icons/fa'; 
import { MdCardGiftcard, MdContactSupport } from "react-icons/md";
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const profileSidebarRef = useRef(null); // Ref for the profile sidebar
  const profileToggleRef = useRef(null); // Ref for the profile toggle button
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false); // State for profile sidebar
  const [isMenHovered, setIsMenHovered] = useState(false); // State for men dropdown
  const [isWomenHovered, setIsWomenHovered] = useState(false); // State for women dropdown
  const [isKidsHovered, setIsKidsHovered] = useState(false); // State for kids dropdown
  const [isHomeLivingHovered, setIsHomeLivingHovered] = useState(false); // State for home & living dropdown
  const [isBeautyHovered, setIsBeautyHovered] = useState(false); // State for beauty dropdown

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`You searched for: ${searchQuery}`);
  };

  // Toggle mobile sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle profile sidebar
  const toggleProfileSidebar = () => {
    setProfileSidebarOpen(!profileSidebarOpen);
  };

  // Close sidebar when a link is clicked
  const handleLinkClick = () => {
    setSidebarOpen(false);
    setProfileSidebarOpen(false);
  };
  

  // Close profile sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileSidebarRef.current && 
        !profileSidebarRef.current.contains(event.target) &&
        profileToggleRef.current && 
        !profileToggleRef.current.contains(event.target)
      ) {
        setProfileSidebarOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="brand">
          Wear Web
        </Link>
      </div>
      <div className="navbar-links">
        
        <div
          className="nav-link"
          onMouseEnter={() => setIsMenHovered(true)}
          onMouseLeave={() => setIsMenHovered(false)}
        >
          <Link to="#men">Men</Link>
          {isMenHovered && (
            <div className="dropdown-card">
              <div className="dropdown-section">
                <h4>Topwear</h4>
                <ul>
                  <li>T-Shirts</li>
                  <li>Casual Shirts</li>
                  <li>Formal Shirts</li>
                  <li>Sweatshirts</li>
                  <li>Sweaters</li>
                  <li>Jackets</li>
                  <li>Blazers & Coats</li>
                  <li>Suits</li>
                  <li>Rain Jackets</li>
                </ul>
              </div>
              <div className="dropdown-section">
                <h4>Bottomwear</h4>
                <ul>
                  <li>Jeans</li>
                  <li>Casual Trousers</li>
                  <li>Formal Trousers</li>
                  <li>Shorts</li>
                  <li>Track Pants & Joggers</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div
          className="nav-link"
          onMouseEnter={() => setIsWomenHovered(true)}
          onMouseLeave={() => setIsWomenHovered(false)}
        >
          <Link to="#women">Women</Link>
          {isWomenHovered && (
            <div className="dropdown-card">
              <div className="dropdown-section">
                <h4>Topwear</h4>
                <ul>
                  <li>Tops</li>
                  <li>Casual Shirts</li>
                  <li>Formal Shirts</li>
                  <li>Sweatshirts</li>
                  <li>Sweaters</li>
                  <li>Jackets</li>
                  <li>Blazers & Coats</li>
                  <li>Suits</li>
                  <li>Rain Jackets</li>
                </ul>
              </div>
              <div className="dropdown-section">
                <h4>Bottomwear</h4>
                <ul>
                  <li>Jeans</li>
                  <li>Casual Trousers</li>
                  <li>Formal Trousers</li>
                  <li>Shorts</li>
                  <li>Skirts</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div
          className="nav-link"
          onMouseEnter={() => setIsKidsHovered(true)}
          onMouseLeave={() => setIsKidsHovered(false)}
        >
          <Link to="#kids">Kids</Link>
          {isKidsHovered && (
            <div className="dropdown-card">
              <div className="dropdown-section">
                <h4>Topwear</h4>
                <ul>
                  <li>T-Shirts</li>
                  <li>Casual Shirts</li>
                  <li>Sweatshirts</li>
                  <li>Jackets</li>
                </ul>
              </div>
              <div className="dropdown-section">
                <h4>Bottomwear</h4>
                <ul>
                  <li>Jeans</li>
                  <li>Casual Trousers</li>
                  <li>Shorts</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div
          className="nav-link"
          onMouseEnter={() => setIsHomeLivingHovered(true)}
          onMouseLeave={() => setIsHomeLivingHovered(false)}
        >
          <Link to="#home-living">Home & Living</Link>
          {isHomeLivingHovered && (
            <div className="dropdown-card">
              <div className="dropdown-section">
                <h4>Home Decor</h4>
                <ul>
                  <li>Curtains</li>
                  <li>Cushions</li>
                  <li>Wall Art</li>
                </ul>
              </div>
              <div className="dropdown-section">
                <h4>Kitchen</h4>
                <ul>
                  <li>Cookware</li>
                  <li>Dinnerware</li>
                  <li>Storage</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div
          className="nav-link"
          onMouseEnter={() => setIsBeautyHovered(true)}
          onMouseLeave={() => setIsBeautyHovered(false)}
        >
          <Link to="#beauty">Beauty</Link>
          {isBeautyHovered && (
            <div className="dropdown-card">
              <div className="dropdown-section">
                <h4>Skincare</h4>
                <ul>
                  <li>Moisturizers</li>
                  <li>Cleansers</li>
                  <li>Masks</li>
                </ul>
              </div>
              <div className="dropdown-section">
                <h4>Makeup</h4>
                <ul>
                  <li>Foundation</li>
                  <li>Lipstick</li>
                  <li>Eyeshadow</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-search">
        <form onSubmit={handleSearch}>
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

      <div className="navbar-icons">
        <a href="#wishlist">
          <FaHeart />
        </a>
        <a href="/cart">
          <FaShoppingCart />
        </a>
        <Link to="/loginsignup" className='fa-user-logo'>
          <FaUser />
        </Link>
        <button ref={profileToggleRef} onClick={toggleProfileSidebar} className="profile-toggle">
          {profileSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        {/* Toggle button for mobile sidebar */}
        <button className="menu-toggle" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={handleLinkClick}>
            <Link to="/homepage">Home</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="#men">Men</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="#women">Women</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="#kids">Kids</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="#home-living">Home & Living</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="#beauty">Beauty</Link>
          </li>
        </ul>
      </div>

      {/* Profile Sidebar (for big screens) */}
      <div ref={profileSidebarRef} className={`profile-sidebar ${profileSidebarOpen ? 'open' : ''}`}>
        <ul>
          <li><FaUser className='profile-icon' /> <Link to="/loginsignup">Profile</Link></li>
          <li><FaBox className='profile-icon'/> <Link to="/orders">Orders</Link></li>
          <li><FaCog className='profile-icon' /> <Link to="/settings">Settings</Link></li>
          <li><MdCardGiftcard className='profile-icon' /> <Link to="#">GiftCards</Link></li>
          <li><MdContactSupport className='profile-icon'/> <Link to="#">ContactUs</Link></li>
          <li><FaSignOutAlt className='profile-icon'/> <Link to="/loginsignup">Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
};