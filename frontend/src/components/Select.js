import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Select = ({ notes, monthText }) => {
  const context = useContext(noteContext);
  const { tags, selectedValue, setSelectedValue } = context;
  console.log("this is the tags", tags);

  const uniquetags = new Set(tags);
  console.log("uniquetags", uniquetags);
  const uniqueTagsArray = Array.from(uniquetags);
  console.log("this is the selected value", selectedValue);
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const renderOptions = () => {
    if (monthText === "Task") {
      return (
        <>
          <option value="All"> All task</option>
          {console.log("this is the unique tags", uniqueTagsArray)}
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
          <option value="">All Months</option>
          {uniqueTagsArray.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </>
      );
    } else if (monthText === "Year") {
      console.log("this is the unique tags++", uniqueTagsArray);
      return (
        <>
          <option value=""> ALL Years</option>
          {uniqueTagsArray.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
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
      style={{
        marginLeft: "50px",
        display: notes === undefined || notes.length === 0 ? "none" : "block",
      }}
    >
      <select
        className="form-control"
        id="tag"
        value={selectedValue}
        name="tag"
        required
        onChange={handleSelectChange}
        style={{ width: "205px", backgroundColor: "#f8f9fa" }}
      >
        {renderOptions()}
      </select>
    </div>
  );
};

export default Select;
