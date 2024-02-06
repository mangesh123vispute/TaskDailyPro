import { React, useContext, useEffect } from "react";
import Accordion from "./Accordion";
import noteContext from "../context/notes/noteContext.js";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBProgress,
  MDBProgressBar,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

export default function ProfilePage() {
  const context = useContext(noteContext);
  const { userdetails, getUser, getTaskStatus, taskStatus, resetProgress } =
    context;
  useEffect(() => {
    getUser();
    getTaskStatus();
  }, []);

  console.log(userdetails);
  console.log(taskStatus);
  return (
    <section>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={userdetails?.image}
                  alt="avatar"
                  className="rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    border: "3px solid darkgray",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  fluid
                />
                <p className="text-muted mb-1 my-2">
                  {" "}
                  <strong>Hi {userdetails?.name}</strong>{" "}
                </p>

                <div className="d-flex justify-content-center mb-2 my-2">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload();
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </button>

                  <button type="button" className="btn btn-primary ms-3">
                    Edit Profile
                  </button>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0" style={{ cursor: "pointer" }}>
              <MDBCardBody className="p-0">
                <MDBListGroup className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-calendar-day"></i>
                    <MDBCardText className=" mb-0">
                      DailyTasks-logs:
                    </MDBCardText>
                    <MDBCardText className="text-muted mb-0">
                      Efficiency: 80% (2/12)
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i className="far fa-calendar "> </i>
                    <MDBCardText className=" mb-0">
                      MonthlyTask-logs:
                    </MDBCardText>
                    <MDBCardText className="text-muted mb-0">
                      Efficiency: 80% (2/12)
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-calendar"></i>
                    <MDBCardText className=" mb-0">
                      YearlyTasks-logs:
                    </MDBCardText>
                    <MDBCardText className="text-muted mb-0">
                      Efficiency: 80% (2/12)
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-bullseye"></i>
                    <MDBCardText className="mb-0">Goals-logs:</MDBCardText>
                    <MDBCardText className="text-muted mb-0">
                      Efficiency: 80% (2/12)
                    </MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userdetails?.name}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userdetails?.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userdetails?.phone || "Not Available"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Whatsapp Number</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userdetails?.whatsappNumber || "Not Available"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">Task Status</MDBCardText>
                    <MDBCardText
                      className="mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Todays Tasks :{" "}
                      <strong>
                        {" "}
                        ({taskStatus?.dailyTasks?.completedTask}/
                        {taskStatus?.dailyTasks?.totalTask}) {"  "}
                        &#8658; {"   "} {taskStatus?.dailyTasks?.inpercentage}%{" "}
                        {taskStatus?.dailyTasks?.inpercentage === 100 ? (
                          <span
                            className="text-success mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              const reset = async () => {
                                await resetProgress("daily");
                                window.location.reload();
                              };
                              reset();
                            }}
                          >
                            Reset
                          </span>
                        ) : null}
                      </strong>
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar
                        width={taskStatus?.dailyTasks?.inpercentage}
                        valuemin={0}
                        valuemax={100}
                      />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Monthly Tasks :{" "}
                      <strong>
                        ({taskStatus?.monthlyTasks?.completedTask}/
                        {taskStatus?.monthlyTasks?.totalTask}) {"   "}
                        &#8658; {"   "}
                        {taskStatus?.monthlyTasks?.inpercentage}%{" "}
                        {taskStatus?.monthlyTasks?.inpercentage === 100 ? (
                          <span
                            className="text-success mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              const reset = async () => {
                                await resetProgress("monthly");
                                window.location.reload();
                              };
                              reset();
                            }}
                          >
                            Reset
                          </span>
                        ) : null}
                      </strong>
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar
                        width={taskStatus?.monthlyTasks?.inpercentage}
                        valuemin={0}
                        valuemax={100}
                      />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Yearly Tasks:{" "}
                      <strong>
                        {" "}
                        ({taskStatus?.yearlyTasks?.completedTask}/
                        {taskStatus?.yearlyTasks?.totalTask}){"   "}
                        &#8658; {"   "}
                        {taskStatus?.yearlyTasks?.inpercentage}%
                        {taskStatus?.yearlyTasks?.inpercentage === 100 ? (
                          <span
                            className="text-success mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              const reset = async () => {
                                await resetProgress("yearly");
                                window.location.reload();
                              };
                              reset();
                            }}
                          >
                            Reset
                          </span>
                        ) : null}
                      </strong>
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar
                        width={taskStatus?.yearlyTasks?.inpercentage}
                        valuemin={0}
                        valuemax={100}
                      />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Goals assigned:{" "}
                      <strong>
                        {" "}
                        ({taskStatus?.goals?.completedTask}/
                        {taskStatus?.goals?.totalTask}){"   "}
                        &#8658; {"   "} {taskStatus?.goals?.inpercentage}%
                        {taskStatus?.goals?.inpercentage === 100 ? (
                          <span
                            style={{ cursor: "pointer" }}
                            className="text-success mx-2"
                            onClick={() => {
                              const reset = async () => {
                                await resetProgress("goals");
                                window.location.reload();
                              };
                              reset();
                            }}
                          >
                            Reset
                          </span>
                        ) : null}
                      </strong>
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar
                        width={taskStatus?.goals?.inpercentage}
                        valuemin={0}
                        valuemax={100}
                      />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="6">
                <Accordion />
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
