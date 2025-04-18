import { useState } from "react";
import "../../assets/styles/SignupLoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { SignUpForm } from "../common/SignUpForm";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRole } from "../context/RoleContext";

export const SignupLoginForm = () => {
  const [isActive, setIsActive] = useState(false);
  const [loginData, setLoginData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { setRole } = useRole();

  const navigate = useNavigate();
  const loginSubmitHandler = async () => {
    // data.role_id="67bd469cef31516d015d5fe6";
    try {
      const userData = {
        username: loginData.username,
        password: loginData.password,
        role_id: loginData.role,  // Ensure role_id is included
      };
      const res = await axios.post("/users/login", userData);

      if (res.status === 200) {
        toast.success("Logged in successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.role_id.name);
        setRole(res.data.data.role_id.name);
        if (res.data.data.role_id.name === "Seller") {
          navigate("/seller/dashboard");
        } else if (res.data.data.role_id.name === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log("Login error: ", err);
      if (err.response) {
        toast.error(
          err.response.data.message || "invalid username or password!",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
      } else {
        toast.error("Something went wrong! Please try again.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };
  const handleInputChange = (e, setData) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  // const handleLoginSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Login Data:', loginData);
  // };

  const handleToggleClick = (isRegister) => {
    setIsActive(isRegister);
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`}>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      {/* Login Form */}
      <div className="form-box login">
        <form onSubmit={handleSubmit(loginSubmitHandler)}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              name="username"
              {...register("username", { errors: errors.username })}
              value={loginData.username || ""}
              onChange={(e) => handleInputChange(e, setLoginData)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              name="password"
              value={loginData.password || ""}
              onChange={(e) => handleInputChange(e, setLoginData)}
              required
              className="password-input"
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="input-box">
            <select
              name="role"
              value={loginData.role}
              onChange={(e) => handleInputChange(e, setLoginData)}
              required
              className="role-select"
            >
              <option value="67bd4674ef31516d015d5fe2">Select Role</option>
              <option value="67bd469cef31516d015d5fe6">User</option>
              <option value="67bd468bef31516d015d5fe4">Seller</option>
            </select>
            <i className="bx bxs-user-detail"></i>
          </div>
          <div className="forgot-link">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <p>or login with social platforms</p>
          <div className="social-icon-wrap style5">
            <Link
              to="https://facebook.com/"
              target="_blank"
              className="facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="https://twitter.com/" target="_blank" className="twitter">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="https://google.com/" target="_blank" className="google">
              <i className="fab fa-google"></i>
            </Link>
            <Link
              to="https://linkedin.com/"
              target="_blank"
              className="linkedin"
            >
              <i className="fab fa-linkedin"></i>
            </Link>
          </div>
        </form>
      </div>

      {/* Registration Form */}
      <div className="form-box register">
        <SignUpForm />
      </div>

      {/* Toggle Section */}
      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
          <p>Don&apos;t have an account?</p>
          <button
            className="btn register-btn"
            onClick={() => handleToggleClick(true)}
          >
            Register
          </button>
        </div>
        <div className="toggle-panel toggle-right">
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          <button
            className="btn login-btn"
            onClick={() => handleToggleClick(false)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
