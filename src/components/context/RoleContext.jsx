/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const RoleContext = createContext();

// RoleProvider component
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem("role") || ""); // ✅ Initial state

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// Custom hook to use RoleContext
export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
