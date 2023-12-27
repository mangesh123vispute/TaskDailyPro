import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Select = ({ notes, onChange, monthText }) => {
  const context = useContext(noteContext);
  const { tags } = context;
  const uniquetags = new Set(tags);
  const uniqueTagsArray = Array.from(uniquetags);

  const renderOptions = () => {
    if (monthText === "Task") {
      return (
        <>
          <option value="All">Search a Task</option>
          {uniqueTagsArray.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </>
      );
    } else if (monthText === "Month") {
      return (
        <>
          <option value="">Select a Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </>
      );
    } else if (monthText === "Year") {
      const currentYear = new Date().getFullYear();
      const years = Array.from(
        { length: 11 },
        (_, index) => currentYear + index
      );

      return (
        <>
          <option value="">Select a Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </>
      );
    }

    return null; // Default case
  };

  return (
    <div
      className="mb-3 col-md-4"
      style={{ marginTop: "10px", marginLeft: "0px" }}
    >
      <select
        className="form-control"
        id="tag"
        value={notes.tag}
        name="tag"
        required
        onChange={onChange}
        style={{ width: "205px" }}
      >
        {renderOptions()}
      </select>
    </div>
  );
};

export default Select;
