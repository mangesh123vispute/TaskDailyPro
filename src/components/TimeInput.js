import React, { useState } from "react";

const TimeInput = ({ time, meridian, setTime, setMeridian }) => {
  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  const handleChangeMeridian = (event) => {
    setMeridian(event.target.value);
  };

  return (
    <>
      <label htmlFor="time">Select time:</label>
      <input
        type="text"
        id="time"
        value={time}
        onChange={handleChangeTime}
        placeholder="Start time-End time (example: 10:00-11:00)"
        style={{ marginLeft: "10px", width: "400px" }}
      />

      <select
        id="meridian"
        value={meridian}
        onChange={handleChangeMeridian}
        style={{ marginLeft: "10px" }}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </>
  );
};

export default TimeInput;
