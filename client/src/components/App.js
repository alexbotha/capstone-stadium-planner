import React, { useContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { UserContext } from "../context/user";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import NavBar from "./NavBar";
import StadiumContainer from "./StadiumContainer";
import Stadium from "./Stadium";

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
        <Route
          exact
          path="/"
          element={loggedIn ? <StadiumContainer /> : <Login />}
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/stadiums" element={<StadiumContainer />} />
        <Route exact path="/stadiums/:id" element={<Stadium users={users} />} />
      </Routes>
    </div>
  );
}

export default App;
