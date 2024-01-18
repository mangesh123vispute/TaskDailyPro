import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const slideIn = keyframes`
  0% { transform: translateY(-20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const Note = styled.div`
  margin-top: 10px;
  animation: 1s ${fadeIn} ease-out, 0.5s ${slideIn} ease-out;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 2px 5px;
  font-size: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: lightgray;
  }
  &:active {
    animation: 0.5s ${shake} ease-in-out;
  }
`;

function Learning() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  const handleAddNote = () => {
    const date = new Date();
    const noteWithDate = { note: input, date: date.toLocaleDateString() };
    setNotes([...notes, noteWithDate]);
    setInput("");
  };

  const handleDeleteNote = (noteIndex) => {
    const newNotes = notes.filter((_, index) => index !== noteIndex);
    setNotes(newNotes);
  };

  const handleUpdateNote = (noteIndex, newValue) => {
    const newNotes = notes.map((note, index) =>
      index === noteIndex ? { ...note, note: newValue } : note
    );
    setNotes(newNotes);
  };

  return (
    <div className="container" style={{ paddingBottom: "40px" }}>
      <h1 className="title">Add your learnings!</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input-field"
        placeholder="Write a note..."
      />
      <button
        onClick={handleAddNote}
        className="add-button"
        style={{ marginBottom: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Add Note
      </button>
      {notes.map((note, index) => (
        <Note key={index}>
          <p>Date: {note.date}</p>
          <input
            value={note.note}
            onChange={(e) => handleUpdateNote(index, e.target.value)}
            className="input-field"
          />
          <Button
            onClick={() => handleDeleteNote(index)}
            className="delete-button"
          >
            Delete
          </Button>
        </Note>
      ))}
    </div>
  );
}

export default Learning;
