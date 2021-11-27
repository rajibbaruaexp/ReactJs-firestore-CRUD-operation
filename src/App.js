import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import initializeAuthentication from "./firebase/firebase.init";
import Subject from "./components/Subject/Subject";
import AddMark from "./components/AddMark/AddMark";

initializeAuthentication();

function App() {
  const [newSubject, setNewSubject] = useState("");
  const [newMark, setNewMark] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(initializeAuthentication().db, "users");

  const createNote = async (e) => {
    e.preventDefault();
    if (newSubject === "") {
      alert("Please put your subject name and marks");
      return;
    }
    await addDoc(usersCollectionRef, {
      name: newSubject,
      marks: parseInt(newMark),
    });
  };

  const updateMark = async (id, mark) => {
    const newMark = prompt("Please enter new mark");
    if (isNaN(newMark) || newMark === "") {
      alert("Only numbers are allowed");
      return;
    }
    const markDoc = doc(initializeAuthentication().db, "users", id);

    const newFields = { marks: parseInt(newMark) };
    await updateDoc(markDoc, newFields);
  };

  const deleteSubject = async (id) => {
    const confirmatin = window.confirm("Are you sure?");

    if (confirmatin) {
      const markDoc = doc(initializeAuthentication().db, "users", id);
      await deleteDoc(markDoc);
    }
  };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [usersCollectionRef]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>CRUD operation with firestore</h2>
        <p>A simple database to save your Obtained marks in the University</p>
        <AddMark
          createNote={createNote}
          setNewSubject={setNewSubject}
          setNewMark={setNewMark}
        />
        <div className="subjects-area">
          <table>
            <tr>
              <th>Subject Name</th>
              <th>Obtained Marks</th>
              <th>Modify</th>
            </tr>
            {users.map((user) => (
              <>
                <Subject
                  key={user.id}
                  user={user}
                  updateMark={updateMark}
                  deleteSubject={deleteSubject}
                ></Subject>
              </>
            ))}
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
