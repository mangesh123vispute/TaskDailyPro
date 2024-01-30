import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PersonalProfile from "./components/PersonalProfile";
import Tables from "./components/Tables";
import { useState } from "react";
import MentorTable from "./components/Mentor";
import AddDailyTask from "./components/AddDailyTask";
import Monthly from "./components/Monthly";
import Yearly from "./components/Yearly";
import AddGoal from "./components/AddGoal";

function App() {
  // const context = useContext(noteContext);
  // const { mentors, handleMentorEdit } = context;
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home showAlert={showAlert} path="home" />}
          />
          <Route
            exact
            path="/about"
            element={<About showAlert={showAlert} />}
          />
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup showAlert={showAlert} />}
          />
          <Route
            exact
            path="/monthly"
            element={<Home showAlert={showAlert} path="Monthly" />}
          />
          <Route
            exact
            path="/yearly"
            element={<Home showAlert={showAlert} path="Yearly" />}
          />
          <Route
            exact
            path="/roadmap"
            element={<Home showAlert={showAlert} path="Goal" />}
          />
          <Route
            exact
            path="/Tables"
            element={<Tables showAlert={showAlert} />}
          />

          <Route exact path="/mentor" element={<MentorTable />} />

          <Route exact path="/profile" element={<PersonalProfile />} />
          <Route
            exact
            path="/AddDailyTask"
            element={<AddDailyTask showAlert={showAlert} />}
          />
          <Route
            exact
            path="/AddMonthlyTask"
            element={<Monthly showAlert={showAlert} />}
          />
          <Route
            exact
            path="/AddYearlyTask"
            element={<Yearly showAlert={showAlert} />}
          />
          <Route
            exact
            path="/AddGoal"
            element={<AddGoal showAlert={showAlert} />}
          />
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
