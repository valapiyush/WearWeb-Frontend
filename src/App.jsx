import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { useRole } from "./components/context/RoleContext";

import { SignupLoginForm } from "./components/common/SignupLoginForm";
import ForgotPasswordPage from "./components/common/ForgotPasswordPage";

import { MensWear } from "./components/user/MensWear";
import { WomensWear } from "./components/user/WomensWear";
import HomePage from "./components/user/HomePage";
import { Cart } from "./components/user/Cart";
import Navbar from "./components/user/Navbar";

import SellerNavbar from "./components/seller/SellerNavbar";
import AdminNavbar from "./components/admin/AdminNavbar";

import DashboardLayout from "./components/seller/SellerDashboard/DashboardLayout";
import { AddNewProduct } from "./components/seller/AddNewProduct";
import { ViewMyProducts } from "./components/seller/ViewMyProducts";
import RecentOrders from "./components/seller/SellerDashboard/RecentOrders";
// import { AddProduct } from "./components/seller/AddProduct";

import PrivateRoutes from "./components/hooks/PrivateRoutes";
import "./assets/styles/navbar.css";
import "./assets/styles/signupLoginForm.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Profile from "./components/user/Profile";
import KidsWear from "./components/user/KidsWear";
import WishList from "./components/user/WishList";
import { ResetPasswordPage } from "./components/common/ResetPasswordPage";
import ThemeToggle from "./components/common/ThemeToggle";

function App() {
  const location = useLocation();
  const { role } = useRole();
  const [currentNavbar, setCurrentNavbar] = useState(null);

  useEffect(() => {
    document.body.className =
      location.pathname === "/loginsignup" ? "" : "body";
  }, [location.pathname]);

  useEffect(() => {
    if (role === "Seller") {
      setCurrentNavbar(<SellerNavbar />);
    } else if (role === "Admin") {
      setCurrentNavbar(<AdminNavbar />);
    } else {
      setCurrentNavbar(<Navbar />);
    }
  }, [role]);

  axios.defaults.baseURL = "http://localhost:3000";

  return (
    <>
    
      {!["/loginsignup", "/forgotpassword", "/resetpassword"].some((path) =>
        location.pathname.includes(path)
      ) && currentNavbar}

      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/loginsignup" element={<SignupLoginForm />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/theme" element={<ThemeToggle />} />
          {/*  Protected User Routes */}
          <Route element={<PrivateRoutes allowedRoles={["User"]} />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/womenswear" element={<WomensWear />} />
            <Route path="/kidswear" element={<KidsWear />} />
            <Route path="/menswear" element={<MensWear />} />
          </Route>

          {/*  Protected Seller Routes */}
          <Route element={<PrivateRoutes allowedRoles={["Seller"]} />}>
            <Route path="/seller/dashboard" element={<DashboardLayout />} />
            <Route path="/seller/addnewproduct" element={<AddNewProduct />} />
            <Route path="/seller/viewmyproducts" element={<ViewMyProducts />} />
            <Route path="/seller/orders" element={<RecentOrders />} />
          </Route>

          {/*  Protected Admin Routes */}
          <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
            <Route path="/admin/dashboard" element={<DashboardLayout />} />
            {/* Add admin-only routes here */}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
