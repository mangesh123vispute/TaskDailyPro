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
        <Link className="navbar-brand " to="/roadmap">
          <strong
            style={{
              color: "#DC143C",
              border: "2px solid #DC143C",
              borderRadius: "10px",
              padding: "2px",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "monospace",
              textShadow: "2px 2px 4px #000000",
              textDecoration: "none",
            }}
          >
            <strong>TaskDailyPro </strong>
          </strong>
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
                className={`nav-link ${
                  location.pathname === "/roadmap" ? "active" : ""
                }`}
                to="/roadmap"
              >
                Goals
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`nav-link dropdown-toggle ${
                  location.pathname === "/AddYearlyTask" ||
                  location.pathname === "/AddMonthlyTask" ||
                  location.pathname === "/AddDailyTask"
                    ? "active"
                    : ""
                }`}
                to="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Add Tasks
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link
                    className={`dropdown-item ${
                      location.pathname === "/AddDaily" ? "active" : ""
                    }`}
                    to="/AddDailyTask"
                  >
                    To Complete..
                  </Link>
                </li>
                <hr style={{ marginTop: "0px" }} />
                <li>
                  <Link
                    className={`dropdown-item ${
                      location.pathname === "/AddDaily" ? "active" : ""
                    }`}
                    to="/AddDailyTask"
                    style={{ marginTop: "0px" }}
                  >
                    TasksOfDay
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${
                      location.pathname === "/monthly" ? "active" : ""
                    }`}
                    to="/AddMonthlyTask"
                  >
                    TaskOfMonth
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${
                      location.pathname === "/yearly" ? "active" : ""
                    }`}
                    to="/AddYearlyTask"
                  >
                    TaskOfYear
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`nav-link dropdown-toggle ${
                  location.pathname === "/" ||
                  location.pathname === "/monthly" ||
                  location.pathname === "/yearly"
                    ? "active"
                    : ""
                }`}
                to="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Show Task
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link
                    className={`dropdown-item ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    to="/"
                  >
                    Daily Tasks
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${
                      location.pathname === "/monthly" ? "active" : ""
                    }`}
                    to="/monthly"
                  >
                    Monthly Tasks
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${
                      location.pathname === "/yearly" ? "active" : ""
                    }`}
                    to="/yearly"
                  >
                    Yearly Tasks
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
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
