import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../CustomCss/Login2.css";

const Login2 = (props) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handelSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const result = await response.json();
    if (result.success) {
      localStorage.setItem("token", result.authToken);
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      alert("Please enter valid credentials");
    }
    console.log(result);
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <section className="h-100 gradient-form ">
      <div className="container py-5 h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: "185px" }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">
                        {" "}
                        <strong>TaskDailyPro</strong>{" "}
                      </h4>
                    </div>

                    <form onSubmit={handelSubmit}>
                      <p>Please login to your account..</p>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={credentials.email}
                          onChange={onChange}
                          className="form-control"
                          placeholder="Phone number or email address"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          name="password"
                          value={credentials.password}
                          onChange={onChange}
                          placeholder="Enter password"
                        />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 "
                          onClick={handelSubmit}
                          type="button"
                          style={{
                            width: "315px",
                            height: "35px",
                            margin: "auto",
                            padding: "2px",
                            borderRadius: "10px",
                            border: "none",
                          }}
                        >
                          Log in
                        </button>
                        <br />
                        <a className="text-muted" href="#!">
                          Forgot password?
                        </a>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link to="/signup2">
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            Create new
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2 card rounded-3">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <div className="small mb-0">
                      <h1>TaskDailyPro: Your Path to Efficient Success!</h1>
                      <h6>
                        🚀 More than an app, it's a realistic thought process
                        for success. 🗺️
                      </h6>
                      <br /> <br /> 🛤️ Clear Path: Understand the journey before
                      reaching the goal.
                      <br /> <br /> 👥 Right Mentor: Connect with successful
                      mentors for guidance. 👩‍🏫
                      <br /> <br /> 📊 Process Management: Track progress
                      systematically.
                      <br /> <br /> 🎯 Goal Setting: Break down goals into
                      daily, monthly, and yearly tasks. Experience success with
                      <br /> <br /> TaskDailyPro – not just an app, but your
                      holistic guide to a well-informed journey! 🌟
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login2;
