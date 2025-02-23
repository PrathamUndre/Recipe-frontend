import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (formData.email === storedEmail && formData.password === storedPassword) {
      localStorage.setItem("isAuthenticated", "true");
      onLogin();
      navigate("/home");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row g-3 p-4 bg-light shadow rounded" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
