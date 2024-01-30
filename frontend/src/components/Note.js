import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext.js";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
import Select from "./Select";

function Note(props) {
  const path = props.path;
  let monthText = "Task";
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const {
    notes,
    getNotes,
    editNote,
    getMonthly,
    editMonthly,
    tagchange,
    setTagchange,
    selectedValue,
    setSelectedValue,
    getYearly,
    editYearly,
    fetchAllGoals,
    editGoals,
  } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
    edate: "",
    edeadline: "",
    etime: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title || currentNote.Goal,
      edescription: currentNote.description,
      etag: currentNote.tag,
      edate: currentNote.date,
      edeadline: currentNote.deadline,
      etime: currentNote.deadlinetime,
    });
    console.log("this is the note after setting it ", note);
  };

  //* function to convert deadline into dd-mm-yy format
  const formatDate = (dateString) => {
    // Create a new Date object from the string
    const dateObject = new Date(dateString);
    // Extract the year, month, and day
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    // Format the date string
    return `${year}-${month}-${day}`;
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (path === "Monthly") {
      editMonthly(
        note.id,
        note.etitle,
        note.edescription,
        note.etag,
        note.edeadline
      );
      setTagchange(!tagchange);
      refClose.current.click();
    } else if (path === "Yearly") {
      editYearly(
        note.id,
        note.etitle,
        note.edescription,
        note.etag,
        note.edeadline
      );
      setTagchange(!tagchange);
      refClose.current.click();
    } else if (path === "Goal") {
      editGoals(
        note.id,
        note.etitle,
        note.edescription,
        note.edeadline,
        note.etag
      );
      setTagchange(!tagchange);
      refClose.current.click();
    } else {
      console.log("this is the daily note ", note);
      editNote(
        note.id,
        note.etitle,
        note.edescription,
        note.etag,
        note.edeadline,
        note.etime
      );
      setTagchange(!tagchange);
      refClose.current.click();
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  if (props.path === "Monthly") {
    monthText = "Month";
  } else if (props.path === "Yearly") {
    monthText = "Year";
  }

  const filterNotesByTag = (tag) => {
    // If tag is "All", return the original array
    if (tag === "All" || tag === "") {
      return notes;
    }
    // Filter the array based on the selected tag
    const filteredNotes = notes.filter((note) => note.tag === tag);
    return filteredNotes;
  };

  const filteredNotes = filterNotesByTag(selectedValue);

  const handleClickOpen = () => {
    console.log("this is the path", props.path);
    props.path === "Monthly"
      ? navigate("/AddMonthlyTask")
      : props.path === "Yearly"
      ? navigate("/AddYearlyTask")
      : props.path === "Goal"
      ? navigate("/AddGoal")
      : navigate("/AdddailyTask");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (props.path === "Monthly") {
        getMonthly();
      } else if (props.path === "Yearly") {
        getYearly();
      } else if (props.path === "Goal") {
        fetchAllGoals();
      } else {
        getNotes();
      }
      setSelectedValue("All");
    } else {
      props.showAlert("Please Login", "danger");
      navigate("/login");
    }
  }, [props.path, tagchange]);

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
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
              <h5 className="modal-title" id="exampleModalLabel">
                Edit{" "}
                {props.path === "Monthly"
                  ? "Task"
                  : props.path === "Yearly"
                  ? "Task"
                  : props.path === "Goal"
                  ? "Goal"
                  : "Task"}
              </h5>
              <button
                type="button"
                ref={refClose}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    {props.path === "Monthly"
                      ? "Task"
                      : props.path === "Yearly"
                      ? "Task"
                      : props.path === "Goal"
                      ? "Goal"
                      : "Task"}
                  </label>
                  {console.log("this are the notes in the update html", note)}
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                {props.path === "Monthly" ? (
                  <div className="col-md-3">
                    <label htmlFor="tag" className="form-label">
                      Month
                    </label>
                    <select
                      className="form-control"
                      id="tag"
                      value={note.etag}
                      name="etag"
                      required
                      onChange={onChange}
                      style={{ width: "205px" }}
                    >
                      <option value="">Select a Month</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>
                ) : props.path === "Yearly" ? (
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Year
                    </label>
                    <select
                      className="form-select"
                      id="tag"
                      value={note.etag}
                      name="etag"
                      required
                      onChange={onChange}
                    >
                      {/* Generating options for the next 10 years from the current year onwards */}
                      {Array.from({ length: 10 }, (_, index) => (
                        <option
                          key={index}
                          value={new Date().getFullYear() + index}
                        >
                          {new Date().getFullYear() + index}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                )}
                {props.path === "home" ? (
                  <div className="mb-3">
                    <label htmlFor="edeadline" className="form-label">
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="edeadline"
                      name="edeadline"
                      value={formatDate(note.edeadline)}
                      onChange={onChange}
                      style={{ width: "205px" }}
                      required
                    />
                    <label
                      htmlFor="etime"
                      className="form-label "
                      style={{ marginTop: "15px" }}
                    >
                      Select time:
                    </label>
                    <input
                      type="text"
                      id="etime"
                      name="etime"
                      value={note.etime}
                      onChange={onChange}
                      placeholder="Start time-End time (example: 10:00am-11:00am)"
                      style={{ width: "205px" }}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div className="mb-3">
                    <label
                      htmlFor="edeadline"
                      className="form-label"
                      style={{ marginTop: "10px" }}
                    >
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="edeadline"
                      name="edeadline"
                      value={formatDate(note.edeadline)}
                      onChange={onChange}
                      style={{ width: "205px" }}
                      required
                    />
                  </div>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleClick}
                disabled={
                  note.etitle?.length < 1 || note.edescription?.length < 1
                }
                type="button"
                className="btn btn-primary"
              >
                {console.log("this is the notes in the update", note)}
                Update {props.path === "Goal" ? "Goal" : "Task"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{ marginTop: "60px" }}>
        <div
          className="row my-3 container"
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            paddingBottom: "30px",
            paddingTop: "30px",
          }}
        >
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ height: "40px", marginLeft: "10px", width: "100px" }}
            onClick={handleClickOpen}
          >
            Add {props.path === "Goal" ? "Goal" : "Task"}
          </button>
          <div
            style={{
              marginTop: "30px",
              display: "flex",
            }}
          >
            <h1 className="mb-3 col-md-4">
              <strong>
                {" "}
                {notes?.length === 0 || notes === undefined
                  ? "No"
                  : props.path === "home"
                  ? "Todays"
                  : props.path === "Goal"
                  ? "Goals"
                  : props.path}{" "}
                {props.path === "Goal:" ? "List:" : "Tasks:"}{" "}
              </strong>
            </h1>
            <Select notes={notes} onChange={onChange} monthText={monthText} />
          </div>
          <div className="container mx-2">
            {(notes?.length === 0 || notes === undefined) && (
              <img
                src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                alt="No Task"
                style={{
                  borderRadius: "10px",
                  display: "inline-block",
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
                className="img-fluid"
              ></img>
            )}
          </div>
          {filteredNotes?.map((note, index) => {
            return (
              <Noteitem
                note={note}
                key={note._id}
                notes={notes[index]}
                updateNote={updateNote}
                showAlert={props.showAlert}
                path={props.path}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Note;
