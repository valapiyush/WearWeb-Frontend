import {Routes, Route, useLocation} from 'react-router-dom';
// import { Navbar } from './components/Navbar';
import { SignupLoginForm } from "../src/components/common/SignupLoginForm";
import './assets/styles/navbar.css';
import './assets/styles/signupLoginForm.css';
import HomePage from '../src/components/user/HomePage';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ForgotPasswordPage from '../src/components/common/ForgotPasswordPage';
import axios from 'axios';
import { useEffect } from 'react';
import { AddProduct } from './components/seller/AddProduct';
import PrivateRoutes from './components/hooks/PrivateRoutes';
import DashboardLayout from './components/seller/SellerDashboard/DashboardLayout';
import { AddNewProduct } from './components/seller/AddNewProduct';
import { Navbar } from './components/user/Navbar';
import SellerNavbar from './components/seller/SellerNavbar';
import { ViewMyProducts } from './components/seller/ViewMyProducts';
import { Cart } from './components/user/Cart';



function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/loginsignup") {
      document.body.className = ""; // Remove the unwanted class for login and signup
    } else {
      document.body.className =
        "body"; // Add the class for the rest of the pages
    }
  }, [location.pathname]);
  const showSellerNavbar = location.pathname.startsWith("/seller"); 
  axios.defaults.baseURL = "http://localhost:3000";
  return (
    <>
    {/* Render Navbar only if on a seller page */}
    {showSellerNavbar && <SellerNavbar />}
      <div className={location.pathname === "/loginsignup" ? "" : "App"}>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route  path="/loginsignup" element={<SignupLoginForm />} /> 
          <Route  path="/forgotpassword" element={<ForgotPasswordPage />} /> 
          <Route  path="/homepage" element={<HomePage />} /> 
          <Route  path="/cart" element={<Cart />} /> 

          <Route path='' element={<PrivateRoutes/>}>
            <Route  path="/addProduct" element={<AddProduct />} />
          </Route>
          <Route path='' element={<PrivateRoutes/>}>
            <Route path='' element={<Navbar/>}/>
            <Route path="/seller/dashboard" element = {<DashboardLayout/>}/>
            <Route path="/seller/addnewproduct" element = {<AddNewProduct/>}/>
            <Route path="/seller/viewmyproducts" element = {<ViewMyProducts/>}/>
          </Route>
        </Routes>
      </div>
    </>
  
  );
}

export default App;