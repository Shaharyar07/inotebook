import React, { useState } from "react";

const GlobalContext = React.createContext();

const Context = ({ children }) => {
  const [Notes, setNotes] = useState([]);

  const host = "http://localhost:5000";
  const [showModal, setshowModal] = useState(false);
  //fetch note
  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    console.log(data);
    setNotes(data);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const data = await response.json();
    console.log(data);

    setNotes(Notes.concat(data));
  };

  //delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    console.log(data);
    const filteredNotes = Notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(filteredNotes);
  };

  //update note
  const updateNote = async (id, title, description, tag) => {
    setshowModal(true);
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id, title, description, tag }),
    });
    const data = await response.json();
    console.log(data);
    let newNotes = JSON.parse(JSON.stringify(Notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    setshowModal(false);
  };
  return (
    <GlobalContext.Provider
      value={{
        Notes,
        addNote,
        deleteNote,
        fetchNotes,
        updateNote,
        setshowModal,
        showModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { Context, GlobalContext };
