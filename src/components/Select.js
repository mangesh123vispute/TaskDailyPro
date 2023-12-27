import React from "react";
import { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Select = ({ notes, monthText }) => {
  const context = useContext(noteContext);
  const { tags, selectedValue, setSelectedValue } = context;
  console.log("this is the tags", tags);
  const uniquetags = new Set(tags);
  const uniqueTagsArray = Array.from(uniquetags);
  console.log(selectedValue);
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  console.log("calligin repediately");

  const renderOptions = () => {
    if (monthText === "Task") {
      return (
        <>
          <option value="All">All</option>
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
          <option value="">All</option>
          {uniqueTagsArray.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
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
          <option value="">All</option>
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
        onChange={handleSelectChange}
        style={{ width: "205px" }}
      >
        {renderOptions()}
      </select>
    </div>
  );
};

export default Select;
