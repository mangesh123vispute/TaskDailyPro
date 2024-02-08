import NoteContext from "./noteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const [tags, setTags] = useState("");
  const [tagchange, setTagchange] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [time, setTime] = useState("");
  const [userdetails, setUserdetails] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  //*fetch user details.
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/getUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();

      setUserdetails(json);
      console.log("user details", userdetails);
    } catch (error) {
      console.log("Error while fetching user " + error);
    }
  };

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

  //* fetch task status
  const getTaskStatus = async () => {
    const response = await fetch(
      `http://localhost:5000/api/progress/getprogress`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setTaskStatus(json.progress);
    console.log("task status", taskStatus);
  };
  //*add daily task
  const addNote = async (title, description, tag, deadline, deadlinetime) => {
    try {
      if (Number(taskStatus.dailyTasks.inpercentage) === 100) {
        console.log(
          "daily task inprogress",
          taskStatus.dailyTasks.inpercentage
        );
        alert("Reset the Daily Task progress first in the profile page");
        return false;
      }
      const response = await fetch(`http://localhost:5000/api/tasks/addnote/`, {
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
      });

      const note = await response.json();
      setNotes(notes.concat(note));
      setTaskStatus((prevTaskStatus) => ({
        ...prevTaskStatus,
        dailyTasks: {
          ...prevTaskStatus.dailyTasks,
          totalTask: prevTaskStatus.dailyTasks.totalTask + 1,
        },
      }));
    } catch (error) {
      console.log("Error while adding the note " + error);
    }
  };

  // *addmonthlytasks
  const addMonthly = async (
    title,
    description,
    tag,
    deadline,
    deadlinetime
  ) => {
    try {
      if (Number(taskStatus.monthlyTasks.inpercentage) === 100) {
        alert("Reset the Monthly Task progress first in the profile page");
        return false;
      }
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
      setTaskStatus((prevTaskStatus) => ({
        ...prevTaskStatus,
        monthlyTasks: {
          ...prevTaskStatus.monthlyTasks,
          totalTask: prevTaskStatus.monthlyTasks.totalTask + 1,
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // *add yearly
  const addYearly = async (title, description, tag, deadline, deadlinetime) => {
    try {
      if (Number(taskStatus.yearlyTasks.inpercentage) === 100) {
        alert("Reset the yearly Task progress first in the profile page");
        return false;
      }
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
      setTaskStatus((prevTaskStatus) => ({
        ...prevTaskStatus,
        yearlyTasks: {
          ...prevTaskStatus.yearlyTasks,
          totalTask: prevTaskStatus.yearlyTasks.totalTask + 1,
        },
      }));
      return note;
    } catch (err) {
      console.log(err);
    }
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

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);

    setTaskStatus((prevTaskStatus) => ({
      ...prevTaskStatus,
      dailyTasks: {
        ...prevTaskStatus.dailyTasks,
        totalTask: prevTaskStatus.dailyTasks.totalTask - 1,
      },
    }));
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
    setTaskStatus((prevTaskStatus) => ({
      ...prevTaskStatus,
      monthlyTasks: {
        ...prevTaskStatus.monthlyTasks,
        totalTask: prevTaskStatus.monthlyTasks.totalTask - 1,
      },
    }));
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
    setTaskStatus((prevTaskStatus) => ({
      ...prevTaskStatus,
      yearlyTasks: {
        ...prevTaskStatus.yearlyTasks,
        totalTask: prevTaskStatus.yearlyTasks.totalTask - 1,
      },
    }));
  };
  //* delete goal
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
    setTaskStatus((prevTaskStatus) => ({
      ...prevTaskStatus,
      goals: {
        ...prevTaskStatus.goals,
        totalTask: prevTaskStatus.goals.totalTask - 1,
      },
    }));
  };

  // *dailyTaskCompleted
  const dailyTaskCompleted = async (id) => {
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

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    setTaskStatus((prevTaskStatus) => ({
      ...prevTaskStatus,
      dailyTasks: {
        ...prevTaskStatus.dailyTasks,

        completedTask: prevTaskStatus.dailyTasks.completedTask + 1,
      },
    }));
  };

  //*monthly task completed
  const monthlyTaskCompleted = async (id) => {
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
    setTaskStatus((prevTaskStatus) => ({
      ...prevTaskStatus,
      monthlyTasks: {
        ...prevTaskStatus.monthlyTasks,
        completedTask: prevTaskStatus.monthlyTasks.completedTask + 1,
      },
    }));
  };

  //* yearly task completed
  const yearlyTaskCompleted = async (id) => {
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
    setTaskStatus((prevTaskStatus) => ({
      ...prevTaskStatus,
      yearlyTasks: {
        ...prevTaskStatus.yearlyTasks,
        completedTask: prevTaskStatus.yearlyTasks.completedTask + 1,
      },
    }));
  };

  //*goals completed
  const goalCompleted = async (id) => {
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
    setTaskStatus((prevTaskStatus) => ({
      ...prevTaskStatus,
      goals: {
        ...prevTaskStatus.goals,
        completedTask: prevTaskStatus.goals.completedTask + 1,
      },
    }));
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
      if (Number(taskStatus.goals.inpercentage) === 100) {
        alert("Reset Goals progress first in the profile page");
        return false;
      }
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
      setTaskStatus((prevTaskStatus) => ({
        ...prevTaskStatus,
        goals: {
          ...prevTaskStatus.goals,
          totalTask: prevTaskStatus.goals.totalTask + 1,
        },
      }));

      return addedGoal;
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

  //* update Taskprogress:
  //algo:
  //get the statevariable ,
  //put this state variable as req.body , by seperating the goals,dailyTask,monthlyTask,yearlyTask
  //send the req to backend
  //get the response
  const updateTaskProgress = async (stateVariable) => {
    try {
      // Get the state variable
      let { goals, dailyTasks, monthlyTasks, yearlyTasks } = stateVariable;

      // Separate the goals, dailyTask, monthlyTask, yearlyTask
      const data = {
        goals,
        dailyTasks,
        monthlyTasks,
        yearlyTasks,
      };

      // Send the request to the backend
      const response = await fetch(
        "http://localhost:5000/api/progress/updateprogress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        }
      );

      // Get the response
      const result = await response.json();
      if (!result) {
        console.log("Error updating task progress");
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  //*forgot password ..
  //algo: three different api calls
  //1.get email and send otp to the email.
  //2.varify otp by giving email and otp
  //3.change password by giving email, password and conform password

  const sendOtp = async (email) => {
    const response = await fetch(
      "http://localhost:5000/api/auth/forgotPasswordgetOtp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    const json = await response.json();
    console.log(json);
  };
  const verifyOtp = async (email, otp) => {
    const response = await fetch(
      "http://localhost:5000/api/auth/otp/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      }
    );
    const json = await response.json();
    console.log(json);
  };

  const changePassword = async (email, password, conformPassword) => {
    const response = await fetch(
      "http://localhost:5000/api/auth/password/change",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, conformPassword }),
      }
    );
    const json = await response.json();
    console.log(json);
  };

  //* reset progress
  //algo:
  //1.send which task you want to update in the req.body
  //2.send the req to backend
  //3.get the response
  const resetProgress = async (Task) => {
    const response = await fetch(
      "http://localhost:5000/api/progress/resetprogress",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ Task }),
      }
    );
    const json = await response.json();
    console.log(json);
  };

  //*edit Profile and upload image
  //algo:
  //get the crediantials from the user and call two backend functions
  //1.editProfile
  //2.uploadImage
  const editProfile = async (name, email, phone, image, whatsappNumber) => {
    try {
      await fetch("http://localhost:5000/api/auth/editprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ name, email, phone, whatsappNumber }),
      });
      await fetch("http://localhost:5000/api/auth/uploadProfilePic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ image }),
      });
    } catch (err) {
      console.log(err);
    }
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
        userdetails,
        getUser,
        getTaskStatus,
        taskStatus,
        monthlyTaskCompleted,
        dailyTaskCompleted,
        goalCompleted,
        yearlyTaskCompleted,
        sendOtp,
        verifyOtp,
        changePassword,
        resetProgress,
        editProfile,
        updateTaskProgress,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
