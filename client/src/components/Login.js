import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const { login, loggedIn, user } = useContext(UserContext);
  const navigate = useNavigate();

  function signUp() {
    navigate("/signup");
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.error) {
          const error = <li>{user.error}</li>;
          setError(error);
        } else {
          //Our call back of login sent down from usercontext takes in our user
          login(user);
          navigate("/myaccount");
        }
      });
  }
  if (!loggedIn) {
    return (
      <div className="login-register">
        <h3>Welcome, to youTours. Please login in to access the site.</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" />
            <ul>{error}</ul>
          </form>
        </div>
        <button onClick={signUp}>Don't have an account? Register here</button>
      </div>
    );
  } else {
    return <h3 className="styles">{user.username}</h3>;
  }
}

export default Login;
