import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, Navbar, Nav, Container, Row, Col } from "react-bootstrap";

function NavBar() {
  const { user, logout, loggedIn, loading } = useContext(UserContext);
  const navigate = useNavigate();

  function logoutUser() {
    fetch("/logout", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    }).then(() => {
      navigate("/");
      logout();
    });
  }

  if (loggedIn) {
    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="fs-5 m-3">user.username</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-container">
            <NavLink
              to="/myaccount"
              className="fs-5 m-3 no-underline inline-button"
            >
              myAccount
            </NavLink>
            <NavLink
              to="/stadiums"
              className="fs-5 m-3 no-underline inline-button"
            >
              Stadiums
            </NavLink>
            <Button
              onClick={logoutUser}
              className="fs-5 m-3 no-underline inline-button"
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Nav className="ms-auto">
        <NavLink to="/login" className="fs-5 m-3 no-underline"></NavLink>
        <NavLink to="/signup" className="fs-5 m-3 no-underline"></NavLink>
      </Nav>
    );
  }
}

export default NavBar;
