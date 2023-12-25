import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext, useState } from "react";
import TimeInput from "./TimeInput";

function Yearly(props) {
  const [time, setTime] = useState("");
  const [meridian, setMeridian] = useState("AM");
  const deadlinetime = `${time} ${meridian}`;
  const context = useContext(noteContext);
  const { addNote } = context;

  const [notes, setNotes] = useState({
    title: "",
    description: "",
    tag: "",
    deadline: "",
  });

  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    notes.title = document.getElementById("title").value;
    notes.description = document.getElementById("description").value;
    notes.tag = document.getElementById("tag").value;
    notes.deadline = document.getElementById("deadline").value;

    console.log(deadlinetime);
    e.preventDefault();
    addNote(
      notes.title,
      notes.description,
      notes.tag,
      notes.deadline,
      deadlinetime
    );
    setNotes({ title: "", description: "", tag: "", deadline: "" });
    props.showAlert("Added successfully", "success");
  };
  return (
    <div className="container " style={{ marginTop: "10px" }}>
      <h1>Add Yearly task:</h1>
      <form style={{ marginTop: "20px" }}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Task
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            value={notes.title}
            minLength={5}
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={notes.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <div className="md-3">
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="description" className="form-label">
                Deadline
              </label>
              <input
                type="date"
                className="form-control"
                id="deadline"
                name="deadline"
                value={notes.deadline}
                onChange={onChange}
                style={{ width: "205px" }}
                required
              />
            </div>
            <div className="col-md-9" style={{ marginTop: "35px" }}>
              <TimeInput
                time={time}
                meridian={meridian}
                setMeridian={setMeridian}
                setTime={setTime}
              />
            </div>
          </div>
        </div>

        <div className="mb-3" style={{ marginTop: "10px" }}>
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={notes.tag}
            name="tag"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          onClick={handleClick}
          disabled={
            notes.tag.length < 5 ||
            notes.title.length < 5 ||
            notes.description.length < 5
          }
          className="btn btn-primary"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default Yearly;
