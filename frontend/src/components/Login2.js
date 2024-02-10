import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../CustomCss/Login2.css";
import noteContext from "../context/notes/noteContext.js";
import CountdownTimer from "./CountDown.js";

const Login2 = (props) => {
  const context = useContext(noteContext);
  const [expired, setExpired] = useState(false);
  const [seconds, setSeconds] = useState(60 * 2);
  const [otpverified, setOtpverified] = useState(false);
  const { sendOtpTOEmail, verifyOtpTOEmail } = context;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [email, setEmail] = useState("");
  const ResetOtp = async () => {
    await sendOtpTOEmail(email);
    setSeconds(60 * 2);
    setExpired(false);
    setOtpverified(false);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const _Email = document.getElementById("email").value;
    const _Password = document.getElementById("password").value;
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: _Email,
        password: _Password,
      }),
    });
    const result = await response.json();
    if (result.success) {
      localStorage.setItem("token", result.authToken);
      props.showAlert("Logged in successfully", "success");
      navigate("/profile");
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
                        <small
                          onClick={() => {
                            setSeconds(60 * 2);
                            setExpired(false);
                            credentials.otp = null;
                            setOtpverified(false);

                            const _email = prompt("Please enter Your Email");
                            sendOtpTOEmail(_email)
                              .then((res) => {
                                if (res === false) {
                                  alert("Please enter valid email");
                                } else {
                                  setEmail(_email);
                                  alert("Otp sent to your email");
                                  const button =
                                    document.getElementById("myButton");
                                  button.click();
                                }
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Forgot password / Change Password
                        </small>

                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          id="myButton"
                          data-bs-target="#exampleModal"
                          style={{ display: "none" }}
                        >
                          Launch demo modal
                        </button>

                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  Enter Valid Otp
                                </h1>

                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <div className="modal-body text-center">
                                  <div className="mb-3">
                                    <CountdownTimer
                                      expired={expired}
                                      setExpired={setExpired}
                                      seconds={seconds}
                                      setSeconds={setSeconds}
                                      email={email}
                                    />
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="otp"
                                      placeholder="Enter OTP"
                                      value={credentials.otp}
                                      onChange={onChange}
                                      name="otp"
                                    />
                                  </div>

                                  <div id="timer" className="mb-3"></div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                  id="closeBtn"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => {
                                    if (expired) {
                                      ResetOtp();
                                    } else {
                                      verifyOtpTOEmail(
                                        email,
                                        credentials.otp
                                      ).then((res) => {
                                        if (res === false) {
                                          alert("Please enter valid otp");
                                        } else {
                                          alert("Otp verified successfully");
                                          const newPass =
                                            prompt("Enter new password");
                                          const confirmPass = prompt(
                                            "Confirm new password"
                                          );

                                          if (
                                            newPass !== confirmPass ||
                                            newPass === "" ||
                                            confirmPass === "" ||
                                            newPass === null ||
                                            confirmPass === null
                                          ) {
                                            alert(
                                              "Enter valid password ,Reclick on Varify otp"
                                            );
                                          } else {
                                            console.log(newPass, confirmPass);
                                            (async () => {
                                              const response = await fetch(
                                                "http://localhost:5000/api/auth/password/change",
                                                {
                                                  method: "POST",
                                                  headers: {
                                                    "Content-Type":
                                                      "application/json",
                                                  },
                                                  body: JSON.stringify({
                                                    email,
                                                    password: newPass,
                                                    conformPassword:
                                                      confirmPass,
                                                  }),
                                                }
                                              );
                                              const json =
                                                await response.json();
                                              if (!json.success) {
                                                alert(json.message);
                                              }
                                              const button =
                                                document.getElementById(
                                                  "closeBtn"
                                                );
                                              button.click();
                                              alert(json.message);
                                            })();
                                          }
                                        }
                                      });
                                    }
                                  }}
                                >
                                  {expired ? "Resend Otp" : "Verify Otp"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
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
