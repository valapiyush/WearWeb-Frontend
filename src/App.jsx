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
import { Order } from "./components/user/Order";
import Invoice from "./components/user/Invoice";
import MyOrders from "./components/user/MyOrders";
import Checkout from "./components/user/Checkout";
import OrderConfirmation from "./components/user/OrderConfirmation";
import AdminLayout from "./components/admin/AdminLayout";
import AdminUserList from "./components/admin/AdminUserList";
import AdminSellerList from "./components/admin/AdminSellerList";
import ProductList from "./components/common/ProductList";
import GiftCard from "./components/user/GiftCard";
import ContactUs from "./components/common/ContactUs";
import Settings from "./components/user/Settings";
import SellerOrders from "./components/seller/SellerOrders";
import ViewAllProducts from "./components/admin/ViewAllProducts";
import SalesReport from "./components/admin/SalesReport";
import { EditProduct } from "./components/seller/EditProduct";

function App() {
  const location = useLocation();
  const { role } = useRole();
  const [currentNavbar, setCurrentNavbar] = useState(null);

  useEffect(() => {
    document.body.className =
      location.pathname === "/loginsignup" ? "" : "body";
  }, [location.pathname]);

  useEffect(() => {
    if (!role) {
      setCurrentNavbar(<Navbar/>);
    }
    else if (role === "Seller") {
      setCurrentNavbar(<SellerNavbar />);
    } else if (role === "Admin") {
      setCurrentNavbar(<AdminNavbar />);
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
          <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/products" element={<ProductList />} />
          {/*  Protected User Routes */}
          <Route element={<PrivateRoutes allowedRoles={["User"]} />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/orders/:orderId" element={<Order />} />
            <Route path="/orders/:orderId/invoice" element={<Invoice />} />
            <Route path="/invoice/:orderId" element={<Invoice />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/womenswear" element={<WomensWear />} />
            <Route path="/kidswear" element={<KidsWear />} />
            <Route path="/menswear" element={<MensWear />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/giftcard" element={<GiftCard />} />
            <Route path="/settings" element={<Settings />} />

          </Route>

          {/*  Protected Seller Routes */}
          <Route element={<PrivateRoutes allowedRoles={["Seller"]} />}>
            <Route path="/seller/dashboard" element={<DashboardLayout />} />
            <Route path="/seller/addnewproduct" element={<AddNewProduct />} />
            <Route path="/seller/viewmyproducts" element={<ViewMyProducts />} />
            {/* <Route path="/seller/orders" element={<RecentOrders />} /> */}
            <Route path="/seller/settings" element={<Settings />} />
            <Route path="/seller/orders" element={<SellerOrders />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />


          </Route>

          {/*  Protected Admin Routes */}
          <Route element={<PrivateRoutes allowedRoles={["Admin"]} />}>
            {/* <Route path="/admin/dashboard" element={<DashboardLayout />} /> */}
            <Route path="/admin/dashboard" element={<AdminLayout />} />
            <Route path="/admin/users" element={<AdminUserList />} />
            <Route path="/admin/sellers" element={<AdminSellerList />} />
            <Route path="/admin/products" element={<ViewAllProducts />} />
            <Route path="/admin/reports" element={<SalesReport />} />
            </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
