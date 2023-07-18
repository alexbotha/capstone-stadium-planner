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

  function editReview(review) {
    fetch(`/reviews/${review.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((review) => {
        if (review.errors) {
          setError(review.errors);
        } else {
          const userReview = user.reviews.map((r) =>
            r.id === review.id ? review : r
          );
          const x = { ...user, reviews: userReview };

          let stadiumId = review.stadium.id;

          let updatedStadiums = stadiums.map((stadium) => {
            if (stadium.id === stadiumId) {
              let updatedReviews = stadium.reviews.map((r) => {
                if (r.id === review.id) {
                  return review;
                } else {
                  return r;
                }
              });
              stadium.reviews = updatedReviews;
              stadium.average_rating = review.stadium.average_rating;
            }
            return stadium;
          });

          setStadiums(updatedStadiums);
          setUser(x);
          setError([]);
          navigate(`/stadiums/${review.stadium.id}`);
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
          setUser({
            ...user,
            reviews: user.reviews ? [...user.reviews, review] : [review],
          });

          let stadiumId = review.stadium.id;

          let updatedStadiums = stadiums.map((stadium) => {
            if (stadium.id === stadiumId) {
              return {
                ...stadium,
                reviews: stadium.reviews
                  ? [...stadium.reviews, review]
                  : [review],
              };
            } else {
              return stadium;
            }
          });

          setStadiums(updatedStadiums);
          setError([]);
          navigate(`/stadiums/${review.stadium.id}`);
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
        editReview,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
