import { useState } from "react";
import axios from "axios";
import "../../assets/styles/ContactUs.css";
import Navbar from "../user/Navbar";

const ContactUs = () => {
  const [form, setForm] = useState({ subject: "", message: "", email: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("id");

    try {
      const response = await axios.post("/contact", { ...form, user_id });
      setStatus("Message sent successfully!");
      setForm({ subject: "", message: "", email: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-us-container">
      <Navbar/>
      <h2>Contact Us</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Your Email" required value={form.email} onChange={handleChange} />
        <input type="text" name="subject" placeholder="Subject" required value={form.subject} onChange={handleChange} />
        <textarea name="message" placeholder="Your Message" rows="5" required value={form.message} onChange={handleChange}></textarea>

        <button type="submit">Send Message</button>

        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
};

export default ContactUs;
