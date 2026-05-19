import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Login({ saveSession }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await API.post("/auth/login", formData);
      saveSession(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="auth-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      {message && <p className="message error">{message}</p>}
      <p>
        Need an account? <Link to="/register">Register</Link>
      </p>
    </section>
  );
}

export default Login;

