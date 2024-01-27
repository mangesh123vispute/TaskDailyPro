import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
function MentorTable() {
  const context = useContext(noteContext);
  const { goal, setGoal } = context;
  const [mentors, setMentors] = useState([
    {
      id: "",
      name: "",
      achievement: "",
      suggestion: "",
    },
  ]);

  const [editableCell, setEditableCell] = useState(null);

  const handleEditClick = (mentorId, columnName) => {
    setEditableCell({ mentorId, columnName });
  };

  const handleDoubleClick = (mentorId, columnName) => {
    if (
      !editableCell ||
      editableCell.mentorId !== mentorId ||
      editableCell.columnName !== columnName
    ) {
      setEditableCell({ mentorId, columnName });
    }
  };

  const handleInputChange = (e, mentorId, columnName) => {
    const updatedMentors = mentors.map((mentor) => {
      if (mentor.id === mentorId) {
        return {
          ...mentor,
          [columnName]: e.target.value,
        };
      }
      return mentor;
    });
    setMentors(updatedMentors);
  };

  const handleInputBlur = () => {
    setEditableCell(null);
  };

  const handleAddMentor = () => {
    const newMentor = {
      id: mentors.length + 1,
      name: "",
      achievement: "",
      suggestion: "",
    };
    setMentors([...mentors, newMentor]);
  };

  const handleDeleteMentor = (mentorId) => {
    const updatedMentors = mentors.filter((mentor) => mentor.id !== mentorId);
    setMentors(updatedMentors);
  };

  const handleUpdateMentor = (mentorId) => {
    // Perform any necessary update logic here
    console.log("Updating mentor with ID:", mentorId);
    //algo:
    //get data from the front end
    //save it to the goal data
  };

  return (
    <div className="container">
      <table className="table table-bordered table-striped table-hover table-responsive">
        <thead>
          <tr>
            <th style={{ maxWidth: "15%" }}>Mentor Name</th>
            <th style={{ maxWidth: "20%" }}>Mentor Achievement</th>
            <th style={{ maxWidth: "70%" }}>Suggestions</th>
            <th style={{ maxWidth: "10%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor) => (
            <tr key={mentor.id}>
              <td
                onDoubleClick={() => handleDoubleClick(mentor.id, "name")}
                style={{ cursor: "pointer", maxWidth: "15%" }}
              >
                {editableCell &&
                editableCell.mentorId === mentor.id &&
                editableCell.columnName === "name" ? (
                  <textarea
                    style={{
                      width: "200px",
                      height: "100px",
                      wordBreak: "break-word",
                    }}
                    value={mentor.name}
                    onChange={(e) => handleInputChange(e, mentor.id, "name")}
                    onBlur={handleInputBlur}
                  />
                ) : (
                  mentor.name
                )}
              </td>
              <td
                onDoubleClick={() =>
                  handleDoubleClick(mentor.id, "achievement")
                }
                style={{
                  cursor: "pointer",
                  maxWidth: "20%",
                  wordBreak: "break-word",
                }}
              >
                {editableCell &&
                editableCell.mentorId === mentor.id &&
                editableCell.columnName === "achievement" ? (
                  <textarea
                    value={mentor.achievement}
                    style={{ width: "200px", height: "100px" }}
                    onChange={(e) =>
                      handleInputChange(e, mentor.id, "achievement")
                    }
                    onBlur={handleInputBlur}
                  />
                ) : (
                  mentor.achievement
                )}
              </td>
              <td
                onDoubleClick={() => handleDoubleClick(mentor.id, "suggestion")}
                style={{
                  cursor: "pointer",
                  maxWidth: "70%",
                  wordBreak: "break-word",
                }}
              >
                {editableCell &&
                editableCell.mentorId === mentor.id &&
                editableCell.columnName === "suggestion" ? (
                  <textarea
                    style={{ width: "700px", height: "100px" }}
                    value={mentor.suggestion}
                    onChange={(e) =>
                      handleInputChange(e, mentor.id, "suggestion")
                    }
                    onBlur={handleInputBlur}
                  />
                ) : (
                  mentor.suggestion
                )}
              </td>
              <td>
                <button
                  className="update-button"
                  onClick={() => handleUpdateMentor(mentor.id)}
                >
                  Update
                </button>
                <button
                  className="delete-button mx-2 my-2"
                  onClick={() => handleDeleteMentor(mentor.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-mentor-button" onClick={handleAddMentor}>
        Add Mentor
      </button>
      <Link to="/Tables">
        <button
          className="add-mentor-button bg-success mx-1"
          style={{ color: "white" }}
        >
          Back to process
        </button>
      </Link>
      <Link to="/Tables">
        <button
          className="add-mentor-button bg-success mx-1"
          style={{ color: "white" }}
        >
          Back to goals
        </button>
      </Link>
    </div>
  );
}

export default MentorTable;
