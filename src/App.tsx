import React from "react";
import Notes from "./component/NotesList";
import AddNewNote from "./component/NewNote";

const App: React.FC = () => {
  return (
    <>
      <AddNewNote />
      <Notes />
    </>
  );
};

export default App;
