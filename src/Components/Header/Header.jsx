import React, { useContext } from "react";
import "./header.css";
import Logo from "../../Images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import ProfileLogo from "../../Images/ProfileImage.png";
import { LoginContext } from "../Context/ContextProvider";

const Header = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  const navigator = useNavigate();
  // console.log(loginData)

  // Function for logout user

  const handleLogoutFunc = async (e) => {
    e.preventDefault();
    try {
      const token = await localStorage.getItem("UserInfo");
      if (token) {
        localStorage.removeItem("UserInfo");
        setLoginData(null);
        navigator("/");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
  <div className="header-cover">
    <div className="header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Header Logo */}
          <img src={Logo} alt="Header Logo" className="header-logo" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Nav icons with navigation functionalities */}
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Home */}
              <li className="nav-item active">
                <Link to="/Home" className="nav-link">
                  <FaHome className="cursor-pointer Home-Icon" /> Home
                </Link>
              </li>
              {/* Login */}
              <li className="nav-item">
                <Link to="/Login" className="nav-link">
                  <RiLoginBoxFill className="cursor-pointer" /> Log in
                </Link>
              </li>
              {/* Sign Up */}
              <li className="nav-item">
                <Link to="/SignUp" className="nav-link">
                  <SiGnuprivacyguard className="cursor-pointer" /> Sign Up
                </Link>
              </li>
              {/* Logout*/}
              <li className="nav-item">
                <Link className="nav-link" onClick={handleLogoutFunc}>
                  <RiLogoutBoxFill className="cursor-pointer" /> Logout
                </Link>
              </li>
            </ul>
            <span className="navbar-text">
              {/* Profile Wrapper */}
              <div className="profile-wrapper">
                {/* Profile image */}
                <img
                  src={ProfileLogo}
                  alt="profile-img"
                  className="profile-img"
                />
                {/* User Name */}
                <span className="profile-userName">
                  {loginData ? loginData : "User"}
                </span>
              </div>
            </span>
          </div>
        </div>
      </nav>
      </div>
      </div>
  );
};

export default Header;
