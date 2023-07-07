import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [stadiums, setStadiums] = useState([]);
  const [error, setError] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  function addReview(review) {
    fetch("/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((review) => {
        if (review.errors) {
          setError(review.errors);
        } else {
          setUser({ ...user, reviews: [...user.reviews, review] });

          let stadiumId = review.stadium.id;

          let stad = stadiums.find((s) => s.id === stadiumId);

          function updatedStadium() {
            let updatedStad = { ...stad, reviews: [...stad.reviews, review] };

            return stadiums.map((stadium) => {
              if (stadium.id === stadiumId) {
                return updatedStad;
              } else {
                return stadium;
              }
            });
          }
          setStadiums(updatedStadium);
          setError([]);
          navigate(`/stadiums/${stadiumId}`);
        }
      });
  }

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
        setError,
        addReview,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
