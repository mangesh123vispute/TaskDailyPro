import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Aavtar from "./Aavtar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token") && location.pathname !== "/signup2") {
      navigate("/login2");
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand " to="/">
          <strong>TaskDailyPro </strong>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Daily Tasks
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                className={`nav-link ${
                  location.pathname === "/monthly" ? "active" : ""
                }`}
                to="/monthly"
              >
                Monthly Tasks
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                className={`nav-link ${
                  location.pathname === "/yearly" ? "active" : ""
                }`}
                to="/yearly"
              >
                Yearly Tasks
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                className={`nav-link ${
                  location.pathname === "/roadmap" ? "active" : ""
                }`}
                to="/roadmap"
              >
                Goals
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {localStorage.getItem("token") && (
            <Link to="/profile" aria-current="page">
              <Aavtar />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
