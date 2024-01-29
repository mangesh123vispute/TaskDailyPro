import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext, useState } from "react";

function Roadmap(props) {
  const context = useContext(noteContext);
  const { tagchange, setTagchange, addGoals } = context;

  const [goal, setGoal] = useState({
    title: "",
    description: "",
    tag: "",
    deadline: "",
  });

  const onChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    //* algo:
    //get all required data from the front end
    //call the addGoal function from context
    //verify if correct then only call the method
    //set the goal to empty
    //show alert

    if (tagchange) {
      setTagchange(false);
    } else {
      setTagchange(true);
    }
    try {
      goal.title = document.getElementById("title").value;
      goal.description = document.getElementById("description").value;
      goal.tag = document.getElementById("tag").value;
      goal.deadline = document.getElementById("deadline").value;
      e.preventDefault();
      addGoals(goal.title, goal.description, goal.deadline, goal.tag);
      console.log("adding the goal see the goal ", goal);
      setGoal({ title: "", description: "", tag: "", deadline: "" });
    } catch (error) {
      props.showAlert("Failure while adding goal", "Failed");
      console.log(error.message);
    }
    props.showAlert("Added successfully", "success");
  };
  return (
    <div className="container my-4">
      <h1>Add Goals:</h1>
      <form style={{ marginTop: "20px" }}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Goal
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            value={goal.title}
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
            value={goal.description}
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
                value={goal.deadline}
                onChange={onChange}
                style={{ width: "205px" }}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                value={goal.tag}
                name="tag"
                minLength={5}
                required
                onChange={onChange}
                placeholder="Health, Education,  etc."
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "35px" }}>
          <button
            type="submit"
            onClick={handleClick}
            disabled={
              goal.tag.length < 1 ||
              goal.title.length < 1 ||
              goal.description.length < 1
            }
            className="btn btn-success"
          >
            Add Goal
          </button>
        </div>
      </form>
    </div>
  );
}

export default Roadmap;
