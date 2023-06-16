import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { Container, Form, Button } from "react-bootstrap";

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
      <div className="background-images">
        <Container className="d-flex align-items-center justify-content-center vh-100">
          <div>
            <h3 className="pb-2">To register fill in the form</h3>

            <Form className="form-style" onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                value={username}
              />

              <Form.Control
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
              />

              <Form.Control
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                value={password}
              />

              <Form.Control
                type="password"
                name="password_confirmation"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Password Confirmation"
                value={passwordConfirmation}
              />
              <div className="d-flex justify-content-center">
                <Form.Control type="submit" />
              </div>
              <ul className="error-text-color">{errorsList}</ul>
            </Form>
            <div className="d-flex justify-content-center">
              <Button onClick={login}>
                Already have an account? Login here
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return <h3 className="errorHandle">You are already signed in</h3>;
  }
}

export default Signup;
