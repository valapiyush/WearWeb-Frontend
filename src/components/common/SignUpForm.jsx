import axios from 'axios';
import  { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const SignUpForm = () => {
    const [signupData, setSignupData] = useState({ role: 'User' });
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const registerSubmitHandler = async (data) => {
        console.log(data);
        try {
            // data.role_id=localStorage.getItem("id");
            const userData = { username: data.username,
              email: data.email,
              password: data.password,
              role_id: signupData.role || "User" 
            };
            console.log("Submitting Data:", userData);
            const res = await axios.post("/users/signup", userData);
          if(res.status===201){
            navigate("/loginsignup");
    
            toast.success('Registered successfully. please try to login', {
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
        } catch (error) {
            console.error(error);
          toast.error('Registration failed', {
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
      };
      const handleInputChange = (e) => {
        setSignupData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };
    
    return (
    <div>
        <form onSubmit={handleSubmit(registerSubmitHandler)}>
          <h1>Registration</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              name="username"
              {...register("username")}
              value={signupData.username}
              onChange={handleInputChange} 
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              name="email"
              {...register("email")}
              value={signupData.email}
              onChange={handleInputChange} 
              required
            />
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              {...register("password")}
              value={signupData.password}
              onChange={handleInputChange} 
              required
              className="password-input"
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="input-box">
            <select
              name="role"
              value={signupData.role}
              onChange={handleInputChange} 
              required
              className="role-select"
            >
              <option value="">Select Role</option>
              <option value="67bd469cef31516d015d5fe6">User</option>
              <option value="67bd468bef31516d015d5fe4">Seller</option>
              {/* <option value="67bd4674ef31516d015d5fe2">Admin</option> */}
            </select>
            <i className="bx bxs-user-detail"></i>
          </div>
          <button type="submit" className="btn">
            Register
          </button>
          <p>or register with social platforms</p>
          <div className="social-icon-wrap style5">
            <Link to="https://facebook.com/" target="_blank" className="facebook">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="https://twitter.com/" target="_blank" className="twitter">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="https://google.com/" target="_blank" className="google">
              <i className="fab fa-google"></i>
            </Link>
            <Link to="https://linkedin.com/" target="_blank" className="linkedin">
              <i className="fab fa-linkedin"></i>
            </Link>
          </div>
        </form>
    </div>
  )
}
