import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const { login, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const images = [
    "https://images.unsplash.com/photo-1577223645169-1e13f9056226?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    "https://images.unsplash.com/photo-1598121876853-82437626c783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    "https://images.unsplash.com/photo-1665606462626-a3bc2f1f786b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    "https://images.unsplash.com/photo-1646491513192-60c3d88c04f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80",
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImageUrl = images[randomIndex];
    setBackgroundImage(`url(${randomImageUrl})`);
  }, []);

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
      <div
        style={{
          backgroundImage: backgroundImage,
          backgroundRepeat: "no-repeat",
          backgroundSize: "600px 900px",
          backgroundPosition: "top left",
        }}
      >
        <div className="background-image-login">
          <Container className="d-flex align-items-center justify-content-center vh-100">
            <div>
              <h3 className="pb-2">Welcome, to youTours</h3>
              <Form className="form-style" onSubmit={handleSubmit}>
                <Form.Control
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="d-flex justify-content-center">
                  <Form.Control type="submit" />
                </div>
                <ul className="error-text-color">{error}</ul>
              </Form>
              <div className="d-flex justify-content-center">
                <Button onClick={signUp}>Click to register</Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  } else {
    return <h3 className="errorHandle">You are already signed in</h3>;
  }
}

export default Login;

// Form.Control component is react-bootstrap version of input. Has similar attribute types: name, type and placeholder. Provides consistant styling and functionality

// Container component used to create a responsive container for the content. We use container over div as it ensures the content is properly aligned and responsive according to bootstraps grid system and it also deals with padding as well as adjusting the content layout based on screen size. Using a div will span the entire parent container and wont have responsive behavior provided like react bootstrap will provide
