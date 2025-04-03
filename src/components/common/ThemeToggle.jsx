import React, { useState } from "react";
import "../../assets/styles/themeToggle.css";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme", !darkMode);
  };

  return (
    <div className="theme-toggle-container">
      <label className="theme-toggle">
        <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
        <span className="slider">
          {darkMode ? <FaMoon className="icon moon" /> : <FaSun className="icon sun" />}
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
