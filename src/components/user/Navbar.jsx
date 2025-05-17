import { useEffect, useRef, useState } from 'react';
import '../../assets/styles/navbar.css'; // Import the CSS file
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaTimes, FaBars, FaCog, FaBox, FaSignOutAlt  } from 'react-icons/fa'; 
import { MdCardGiftcard, MdContactSupport } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const profileSidebarRef = useRef(null); // Ref for the profile sidebar
  const profileToggleRef = useRef(null); // Ref for the profile toggle button
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false); // State for profile sidebar
  const [isMenHovered, setIsMenHovered] = useState(false); // State for men dropdown
  const [isWomenHovered, setIsWomenHovered] = useState(false); // State for women dropdown
  const [isKidsHovered, setIsKidsHovered] = useState(false); // State for kids dropdown
  const [isHomeLivingHovered, setIsHomeLivingHovered] = useState(false); // State for home & living dropdown
  const [isBeautyHovered, setIsBeautyHovered] = useState(false); // State for beauty dropdown
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchText)}`);
    }
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
  
  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    window.location.href = "/";
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
          <Link to="/menswear">Men</Link>
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
            </div>
          )}
        </div>
        <div
          className="nav-link"
          onMouseEnter={() => setIsWomenHovered(true)}
          onMouseLeave={() => setIsWomenHovered(false)}
        >
          <Link to="/womenswear">Women</Link>
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
          <Link to="/kidswear">Kids</Link>
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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="navbar-icons">
        <Link to="/wishlist">
          <FaHeart />
        </Link>
        <Link to="/cart">
          <FaShoppingCart />
        </Link>
        <Link to="/profile" className='fa-user-logo'>
          <FaUser />
        </Link>
        {/* <ThemeToggle /> */}
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
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="/menswear">Men</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="/womenswear">Women</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="/kidswear">Kids</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="/home-living">Home & Living</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="/beauty">Beauty</Link>
          </li>
          <li><a href="#" onClick={handleLogout}><FaSignOutAlt className='profile-icon'/> Logout</a></li>

        </ul>
      </div>

      {/* Profile Sidebar (for big screens) */}
      <div ref={profileSidebarRef} className={`profile-sidebar ${profileSidebarOpen ? 'open' : ''}`}>
        <ul>
          <Link to="/profile"><li><FaUser className='profile-icon' /> Profile</li></Link>
          <Link to="/orders"><li><FaBox className='profile-icon'/> Orders</li></Link>
          <Link to="/settings"><li><FaCog className='profile-icon' /> Settings</li></Link>
          <Link to="/giftcard"><li><MdCardGiftcard className='profile-icon' /> GiftCards</li></Link>
          <Link to="/contactUs"><li><MdContactSupport className='profile-icon'/> ContactUs</li></Link>
          <a href="#" onClick={handleLogout}><li><FaSignOutAlt className='profile-icon'/> Logout</li></a>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;