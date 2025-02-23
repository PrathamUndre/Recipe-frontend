import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Brand from "../assets/Brand-logo.png";
import ProfileIcon from "../assets/profile-icon.png";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [profileImg, setProfileImg] = useState(() => {
    return localStorage.getItem("profileImg") || ProfileIcon;
  });

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  useEffect(() => {
    localStorage.setItem("profileImg", profileImg);
  }, [profileImg]);

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImg(e.target.result);
        localStorage.setItem("profileImg", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle Navbar
  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  // Close Navbar after clicking a link
  const closeNav = () => {
    setIsNavCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-danger navbar-dark py-2">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={Brand} alt="Brand Logo" className="img-fluid" style={{ height: "50px" }} />
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavToggle}
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`} id="navbarNav">
          {/* Left-Side Links */}
          <ul className="navbar-nav me-auto text-center">
            <li className="nav-item">
              <Link to="/" className="nav-link active" onClick={closeNav}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={closeNav}>About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={closeNav}>Contact Us</Link>
            </li>
          </ul>

          {/* Centered Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-2 my-2 my-lg-0">
            <Link to="/" className="btn btn-primary" onClick={closeNav}>All Recipes</Link>
            <Link to="/saved" className="btn btn-primary" onClick={closeNav}>Saved Recipes ❤️</Link>
          </div>

          {/* Right-Side Auth & Profile Section */}
          <div className="d-flex align-items-center gap-3 ms-lg-auto mt-2 mt-lg-0">
            {isAuthenticated ? (
              <button className="btn btn-warning" onClick={onLogout}>Logout</button>
            ) : (
              <>
                <Link className="btn btn-primary" to="/login" onClick={closeNav}>Login</Link>
                <Link className="btn btn-secondary" to="/register" onClick={closeNav}>Register</Link>
              </>
            )}

            {/* Profile Picture */}
            <div className="position-relative">
              <label htmlFor="profile-upload" className="cursor-pointer">
                <img 
                  src={profileImg} 
                  alt="Profile" 
                  className="rounded-circle border border-light shadow-sm"
                  style={{ height: "40px", width: "40px", objectFit: "cover", cursor: "pointer" }}
                />
              </label>
              <input 
                id="profile-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleProfileChange} 
                className="d-none"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
