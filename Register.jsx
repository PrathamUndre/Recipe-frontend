import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save user data
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userPassword", formData.password);

    alert("Registration successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row g-3 p-4 bg-light shadow rounded" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Register</h2>
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
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
