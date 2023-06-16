import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [stadiums, setStadiums] = useState([]);
  const [error, setError] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        if (data.error) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
      });
    fetchStadiums();
  }, []);

  function fetchStadiums() {
    fetch("/stadia")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError([]);
          setStadiums(data);
          setLoading(false);
        }
      });
  }

  console.log(stadiums);

  function login(user) {
    setUser(user);
    setLoggedIn(true);
    fetchStadiums();
  }

  function logout() {
    setLoggedIn(false);
    setUser(null);
  }

  function signup(user) {
    setUser(user);
    setLoggedIn(true);
    fetchStadiums();
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        signup,
        loggedIn,
        loading,
        stadiums,
        setStadiums,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
