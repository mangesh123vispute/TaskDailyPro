import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PersonalProfile from "./components/PersonalProfile";
import Monthly from "./components/Monthly";
import Yearly from "./components/Yearly";
import Roadmap from "./components/Roadmap";
import Tables from "./components/Tables";
import Learning from "./components/Learning";
import { useState } from "react";

function App() {
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
            element={<Home showAlert={showAlert} path="Roadmap" />}
          />
          <Route
            exact
            path="/Tables"
            element={<Tables showAlert={showAlert} />}
          />
          <Route
            exact
            path="/learnings"
            element={<Learning showAlert={showAlert} path="learnings" />}
          />
          <Route exact path="/profile" element={<PersonalProfile />} />
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
