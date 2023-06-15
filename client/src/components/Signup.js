import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const { signup, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  function login() {
    navigate("/login");
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (!user.errors) {
          signup(user);
          navigate("/myaccount");
        } else {
          const errorLis = user.errors.map((e) => <li>{e}</li>);
          setErrorsList(errorLis);
        }
      });
  }
  if (!loggedIn) {
    return (
      <div className="login-register">
        <h3>To register, simply fill in the form below.</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              value={username}
            />

            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              value={email}
            />

            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              value={password}
            />

            <input
              type="password"
              name="password_confirmation"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Password Confirmation"
              value={passwordConfirmation}
            />
            <input type="submit" />
            <ul>{errorsList}</ul>
          </form>
        </div>
        <button onClick={login}>Already have an account? Login here</button>
      </div>
    );
  } else {
    return <h3 className="errorHandle">You are already signed in</h3>;
  }
}

export default Signup;
