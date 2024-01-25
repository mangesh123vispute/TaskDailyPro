import React, { useState, useRef, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notificationSound from "../notificationsound.mp3";
import { Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

function Tables() {
  const audioRef = useRef(null);
  const context = useContext(noteContext);
  const { goal, setGoal } = context;

  const [data, setData] = useState([
    {
      id: 1,
      task: "Task1",
      taskDescription: "Description1",
      startDate: "2023-01-01",
      endDate: "2023-01-15",
      isCompleted: false,
      mentor: "Mentor",
      achievements: "Achievements",
      processReviewedBy: "mangesh",
    },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editableCell, setEditableCell] = useState(null);
  const [mentorInput, setMentorInput] = useState("");
  const [achievementsInput, setAchievementsInput] = useState("");
  const [processReviewedByInput, setProcessReviewedByInput] = useState("");

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleAddNewTask = () => {
    const newTask = {
      id: data.length + 1,
      task: "",
      taskDescription: "",
      startDate: "",
      endDate: "",
      isCompleted: "",
      mentor: "",
      achievements: "",
      processReviewedBy: "",
    };
    setData([...data, newTask]);
  };

  const handleUpdate = () => {
    const sortedData = [...data].sort((a, b) => a.id - b.id);
    setData([...sortedData]);
    const updated_data = {
      id: document.getElementById("id")?.value,
      task: document.getElementById("task")?.value,
      taskDescription: document.getElementById("taskDescription")?.value,
      startDate: document.getElementById("startDate")?.value,
      endDate: document.getElementById("endDate")?.value,
      isCompleted: document.getElementById("checkbox")?.value,
      mentor: document.getElementById("mentorInput")?.value,
      achievements: document.getElementById("achievementsInput")?.value,
      processReviewedBy: document.getElementById("processReviewedByInput")
        ?.value,
    };
    console.log("this is the updated data", data);

    // Check if all checkboxes are selected
    const allTasksCompleted = data.every((row) =>
      selectedRows.includes(row.name)
    );
    if (allTasksCompleted) {
      // Show the notification popup
      audioRef.current.play();
      toast.success("You have completed all the tasks. Goal is reached! 🎉", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: true,
      });
    }
  };

  const handleEditClick = (rowIndex, columnName) => {
    setEditableCell({ rowIndex, columnName });
  };

  const handleInputChange = (e, rowIndex, columnName) => {
    const newData = [...data];
    newData[rowIndex][columnName] = e.target.value;
    setData(newData);
  };

  const handleInputBlur = () => {
    setEditableCell(null);
  };

  const handleDelete = (id) => {
    const newData = data.filter((row) => row.id !== id);
    setData(newData);
  };

  return (
    <div className="container">
      <div className="heading-container">
        <h2 className="process-heading">
          Central Process:{" "}
          <small className="process-description">
            Combined Process given by mentors to achieve <strong>Goal</strong>
            ...
          </small>
        </h2>
      </div>
      <audio ref={audioRef} src={notificationSound} />
      {/* <div className="mentor-input-container" style={{ marginTop: "50px" }}>
        <label htmlFor="mentorInput" className="mentor-label ">
          Mentor:
        </label>  
        <input
          type="text"
          id="mentorInput"
          value={mentorInput}
          onChange={(e) => setMentorInput(e.target.value)}
          placeholder="Enter mentor's name"
          className="mentor-input "
        />
        <label htmlFor="achievementsInput" className="mentor-label mx-4">
          Achievements:
        </label>
        <input
          type="text"
          id="achievementsInput"
          value={achievementsInput}
          onChange={(e) => setAchievementsInput(e.target.value)}
          placeholder="Enter mentor's achievements"
          className="mentor-input"
        />
      </div> */}
      <div className="table-responsive">
        <table
          className="table table-bordered table-striped table-hover table-condensed"
          style={{ border: "2px solid green", marginTop: "30px" }}
        >
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Task Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>isCompleted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, rowIndex) => (
              <tr key={rowIndex}>
                <td
                  onClick={() => handleEditClick(rowIndex, "id")}
                  style={{ cursor: "pointer" }}
                >
                  {editableCell &&
                  editableCell.rowIndex === rowIndex &&
                  editableCell.columnName === "id" ? (
                    <input
                      type="text"
                      value={val.id}
                      id="id"
                      onChange={(e) => handleInputChange(e, rowIndex, "id")}
                      onBlur={handleInputBlur}
                    />
                  ) : (
                    val.id
                  )}
                </td>
                <td
                  onClick={() => handleEditClick(rowIndex, "task")}
                  style={{ cursor: "pointer" }}
                >
                  {editableCell &&
                  editableCell.rowIndex === rowIndex &&
                  editableCell.columnName === "task" ? (
                    <input
                      type="text"
                      value={val.task}
                      id="task"
                      onChange={(e) => handleInputChange(e, rowIndex, "task")}
                      onBlur={handleInputBlur}
                    />
                  ) : (
                    val.task
                  )}
                </td>
                <td
                  onClick={() => handleEditClick(rowIndex, "taskDescription")}
                  style={{ cursor: "pointer" }}
                >
                  {editableCell &&
                  editableCell.rowIndex === rowIndex &&
                  editableCell.columnName === "taskDescription" ? (
                    <input
                      type="text"
                      value={val.taskDescription}
                      id="taskDescription"
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, "taskDescription")
                      }
                      onBlur={handleInputBlur}
                    />
                  ) : (
                    val.taskDescription
                  )}
                </td>
                <td
                  onClick={() => handleEditClick(rowIndex, "startDate")}
                  style={{ cursor: "pointer" }}
                >
                  {editableCell &&
                  editableCell.rowIndex === rowIndex &&
                  editableCell.columnName === "startDate" ? (
                    <input
                      type="text"
                      value={val.startDate}
                      id="startDate"
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, "startDate")
                      }
                      onBlur={handleInputBlur}
                    />
                  ) : (
                    val.startDate
                  )}
                </td>
                <td
                  onClick={() => handleEditClick(rowIndex, "endDate")}
                  style={{ cursor: "pointer" }}
                >
                  {editableCell &&
                  editableCell.rowIndex === rowIndex &&
                  editableCell.columnName === "endDate" ? (
                    <input
                      type="text"
                      value={val.endDate}
                      id="endDate"
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, "endDate")
                      }
                      onBlur={handleInputBlur}
                    />
                  ) : (
                    val.endDate
                  )}
                </td>
                <td>
                  <input
                    type="checkbox"
                    id="checkbox"
                    onChange={() => handleCheckboxChange(val.id)}
                    checked={selectedRows.includes(val.id)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(val.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary btn-sm  mx-1"
                    onClick={handleAddNewTask}
                  >
                    Add New Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <Link to="/mentor">
          <button className="btn btn-success ">Mentors</button>
        </Link>
        <button className="btn btn-success mx-2" onClick={handleUpdate}>
          Update
        </button>
        <Link to="/roadmap">
          <button className="btn bg-dark mx-1" style={{ color: "white" }}>
            Back
          </button>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Tables;
