import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import { RoleProvider } from "./components/context/RoleContext"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RoleProvider> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RoleProvider>
  </React.StrictMode>
);
