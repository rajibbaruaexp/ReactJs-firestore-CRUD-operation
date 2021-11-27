import React from "react";

const Subject = (props) => {
  const { name, marks, id } = props.user;
  return (
    <tr>
      <td>{name}</td>
      <td>{marks}</td>
      <td>
        <button onClick={() => props.updateMark(id, marks)}>Edit Marks</button>
        <button onClick={() => props.deleteSubject(id)}>Delete Subject</button>
      </td>
    </tr>
  );
};

export default Subject;
