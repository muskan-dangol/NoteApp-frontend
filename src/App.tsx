import React from "react";
import UserLogin from "./component/Login";
import Notes from "./component/NotesList";
import UserSignUp from "./component/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/notes" element={<Notes />}  />
      </Routes>
    </Router>
  );
};

export default App;
