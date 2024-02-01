import React from "react";
import mangesh from "../profile/mangesh.jpg";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

export default function ProfilePage() {
  return (
    <section>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />

                <p className="text-muted mb-1 my-2">Mangesh vispute</p>

                <div className="d-flex justify-content-center mb-2 my-2">
                  <button type="button" class="btn btn-danger">
                    Logout
                  </button>
                  <button type="button" class="btn btn-primary ms-3">
                    Edit Profile
                  </button>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0" style={{ cursor: "pointer" }}>
              <MDBCardBody className="p-0">
                <MDBListGroup className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i class="fas fa-calendar-day"></i>
                    <MDBCardText className=" mb-0">DailyTasks-logs</MDBCardText>
                    <MDBCardText className="text-muted mb-0">
                      Efficiency: 80% (2/12)
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i class="far fa-calendar "> </i>
                    <MDBCardText className=" mb-0">
                      MonthlyTask-logs
                    </MDBCardText>
                    <MDBCardText className="text-muted mb-0">
                      Efficiency: 80% (2/12)
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i class="fas fa-calendar"></i>
                    <MDBCardText className=" mb-0">
                      YearlyTasks-logs
                    </MDBCardText>
                    <MDBCardText className="text-muted mb-0">
                      Efficiency: 80% (2/12)
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i class="fas fa-bullseye"></i>
                    <MDBCardText className="mb-0">Goals-logs</MDBCardText>
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
                      Johnatan Smith
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
                      example@example.com
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
                      (097) 234-5678
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
                      (098) 765-4321
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="12">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">Work Status</MDBCardText>
                    <MDBCardText
                      className="mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Todays Tasks (2/3)
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={10} valuemin={0} valuemax={100} />
                      <MDBProgressBar width={10} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Monthly Tasks (2/3)
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Yearly Tasks (2/3)
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Goals (2/3)
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
