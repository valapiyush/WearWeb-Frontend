// Settings.jsx
import { useState } from "react";
import DeleteAccount from "./DeleteAccount";
import "../../assets/styles/Settings.css";
import Navbar from "./Navbar";

const Settings = () => {
  const [activeOption, setActiveOption] = useState("none");

  const options = [
    { key: "delete", label: "Deactivate / Delete Account" },
    // Add more options here in future
  ];

  return (
    <div className="settings-wrapper">
      <Navbar/>
      <div className="settings-sidebar">
        <h2>Settings</h2>
        <ul className="settings-options">
          {options.map((opt) => (
            <li
              key={opt.key}
              className={activeOption === opt.key ? "active" : ""}
              onClick={() => setActiveOption(opt.key)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="settings-content">
        {activeOption === "delete" && <DeleteAccount />}
        {/* {activeOption === "none" && <p>Select an option from the sidebar</p>} */}
      </div>
    </div>
  );
};

export default Settings;
