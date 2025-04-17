import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import { RoleProvider } from "./components/context/RoleContext"; 
// import "./i ndex.css"
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RoleProvider> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RoleProvider>
  </React.StrictMode>
);
