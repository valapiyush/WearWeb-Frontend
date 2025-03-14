import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../assets/styles/forgotpassword.css"; 

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const { data } = await axios.post("/api/forgot-password", { email });
      setMessage("Password reset link sent to your email");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link</p>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="forgot-password-button">Send Reset Link</button>
        </form>
        <p className="login-link">
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
