import React, { useContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { UserContext } from "../context/user";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import NavBar from "./NavBar";

function App() {
  const { loggedIn, error, user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, [user]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={loggedIn ? <Home /> : <Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />

        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;