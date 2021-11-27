import React from "react";
import "./AddMark.css";

const AddMark = ({ createNote, setNewSubject, setNewMark }) => {
  return (
    <div className="add-sub-form">
      <form>
        <input
          type="text"
          placeholder="Subject"
          onChange={(e) => {
            setNewSubject(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Obtained mark"
          onChange={(e) => {
            setNewMark(e.target.value);
          }}
        />
        <button onClick={createNote}>➕</button>
      </form>
    </div>
  );
};

export default AddMark;
