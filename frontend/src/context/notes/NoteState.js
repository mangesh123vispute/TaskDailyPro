import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const [tags, setTags] = useState("");
  const [tagchange, setTagchange] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [time, setTime] = useState("");

  // *fetching all daily tasks
  const getNotes = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/fetchallnotes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      setNotes(json.notes);
      setTags(json.tags);
    } catch (error) {
      console.log(error);
    }
  };

  // *fetch monthly tasks
  const getMonthly = async () => {
    const response = await fetch(
      `http://localhost:5000/api/tasks/fetchallmonthly`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setNotes(json.notes);
    setTags(json.tags);
  };

  // *fetch yearly tasks
  const getYearly = async () => {
    const response = await fetch(
      `http://localhost:5000/api/tasks/fetchallyearly`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setNotes(json.notes);
    setTags(json.tags);
  };

  //* fetch all the goals
  const fetchAllGoals = async () => {
    const authToken = localStorage.getItem("token");
    const response = await fetch(
      "http://localhost:5000/api/goals/fetchallgoals",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken,
        }),
      }
    );
    const json = await response.json();

    setNotes(json.goals);

    setTags(json.tags);
  };

  //*add daily task
  const addNote = async (title, description, tag, deadline, deadlinetime) => {
    const response = await fetch(`http://localhost:5000/api/tasks/addnote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag, deadline, deadlinetime }),
    });

    const note = await response.json();

    setNotes(notes.concat(note));
  };

  // *addmonthlytasks
  const addMonthly = async (
    title,
    description,
    tag,
    deadline,
    deadlinetime
  ) => {
    const response = await fetch(
      `http://localhost:5000/api/tasks/addMonthlytask/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },

        body: JSON.stringify({
          title,
          description,
          tag,
          deadline,
          deadlinetime,
        }),
      }
    );

    const note = await response.json();

    console.log("adding the notes ", note);
    setNotes(notes.concat(note));
  };

  // *add yearly
  const addYearly = async (title, description, tag, deadline, deadlinetime) => {
    const response = await fetch(
      `http://localhost:5000/api/tasks/addyearlytask/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },

        body: JSON.stringify({
          title,
          description,
          tag,
          deadline,
          deadlinetime,
        }),
      }
    );

    const note = await response.json();

    console.log("adding the notes ", note);
    setNotes(notes.concat(note));
  };
  // *Delete daily tasks
  const deleteNote = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/tasks/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // *delete monthly tasks
  const deleteMonthly = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/tasks/deleteMonthly/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // *delete yearly tasks
  const deleteYearly = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/tasks/deleteYearly/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  const deleteGoal = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/goals/deletegoal/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // *edit daily tasks
  const editNote = async (
    id,
    title,
    description,
    tag,
    deadline,
    deadlinetime
  ) => {
    console.log(
      "all the data is here ",
      "id:",
      id,
      "title:",
      title,
      "description:",
      description,
      "tag:",
      tag,
      "deadline:",
      deadline,
      "deadlinetime:",
      deadlinetime
    );

    const data = {
      title: title,
      description: description,
      tag: tag,
      deadline: deadline,
      deadlinetime: deadlinetime,
    };
    const response = await fetch(
      `http://localhost:5000/api/tasks/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },

        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // *edit monthly tasks
  const editMonthly = async (id, title, description, tag, deadline) => {
    const data = {
      title: title,
      description: description,
      tag: tag,
      deadline: deadline,
    };
    const response = await fetch(
      `http://localhost:5000/api/tasks/updateMonthly/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },

        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // *edit Yearly tasks
  const editYearly = async (id, title, description, tag, deadline) => {
    const data = {
      title: title,
      description: description,
      tag: tag,
      deadline: deadline,
    };
    const response = await fetch(
      `http://localhost:5000/api/tasks/updateYearly/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },

        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  //*addGoals
  const addGoals = async (goal, description, deadline, tag) => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/goals/create_goal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            goal,
            description,
            tag,
            deadline,
            authToken,
          }),
        }
      );
      const addedGoal = await response.json();
      console.log("adding the goal ", addedGoal);
      setNotes(notes.concat(addedGoal));
    } catch (error) {
      console.log(error);
    }
  };

  //* update goals
  const editGoals = async (id, goal, description, deadline, tag) => {
    console.table(id, goal, description, deadline, tag);

    const data = {
      goal: goal,
      description: description,
      tag: tag,
      deadline: deadline,
    };
    const response = await fetch(
      `http://localhost:5000/api/goals/updategoal/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },

        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    console.log("this is the response", json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = goal;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        newNotes[index].deadline = deadline;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        time,
        setTime,
        addMonthly,
        getMonthly,
        deleteMonthly,
        editMonthly,
        tags,
        tagchange,
        setTagchange,
        selectedValue,
        setSelectedValue,
        addYearly,
        getYearly,
        deleteYearly,
        editYearly,
        addGoals,
        fetchAllGoals,
        deleteGoal,
        editGoals,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
