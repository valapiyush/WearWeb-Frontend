import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

export const ResetPasswordPage = () => {
  const token = useParams().token;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
    const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const submitHandler = async (data) => {
    setError("");
    setMessage("");
    try{
        await axios.post(`/users/resetpassword/${token}`, {
            password: data.password,
          });
          setMessage("Password reset successfully");
          setTimeout(() => {
            navigate("/loginsignup");
          }, 2000);
    }catch(err){
        setError(err.response?.data?.message || "Error sending reset link");
    }
  };
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Reset Password</h2>
        <p>Enter your new password to complete the password reset process.</p>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div>
            <input type="text" {...register("password")}></input>
            {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          </div>
          <div>
            <input type="submit" className="forgot-password-button"></input>
          </div>
        </form>
        <p className="login-link">
          Remember your password? <Link to="/loginsignup">Login</Link>
        </p>
      </div>
    </div>
  );
};
