import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
import TimeInput from "./TimeInput";
import Monthly from "./Monthly";
import Yearly from "./Yearly";
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
    selectedValue,
  } = context;
  console.log(notes);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
    edate: "",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      edate: currentNote.date,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (path === "Monthly") {
      editMonthly(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
    } else if (path === "Yearly") {
      editMonthly(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
    } else {
      editNote(note.id, note.etitle, note.edescription, note.etag);
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
  console.log(selectedValue, filteredNotes);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (props.path === "Monthly") {
        getMonthly();
      } else if (props.path === "Yearly") {
        getMonthly();
      } else {
        getNotes();
      }
    } else {
      props.showAlert("Please Login", "danger");
      navigate("/login");
    }
  }, [props.path, tagchange]);

  return (
    <>
      {props.path === "Monthly" ? (
        <Monthly showAlert={props.showAlert} />
      ) : props.path === "Yearly" ? (
        <Yearly showAlert={props.showAlert} />
      ) : (
        <Addnote showAlert={props.showAlert} />
      )}
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
                Edit Note
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
                    Title
                  </label>
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

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Deadline
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="edate"
                    name="edate"
                    value={note.edate}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <TimeInput />
                </div>
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
                  note.etag.length < 5 ||
                  note.etitle.length < 5 ||
                  note.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" row " style={{ marginTop: "60px" }}>
        <h1 className="mb-3 col-md-4">
          {props.path == "home" ? "Todays" : props.path} tasks:
        </h1>

        <Select notes={notes} onChange={onChange} monthText={monthText} />

        <div className="container mx-2">
          {notes.length === 0 && "no notes to display"}
        </div>

        {filteredNotes.map((note, index) => {
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
    </>
  );
}

export default Note;
