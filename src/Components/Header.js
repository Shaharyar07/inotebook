import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/signup");
  };
  return (
    <Navbar bg="dark" expand="lg">
      <div className="container ">
        <LinkContainer to="/">
          <Navbar.Brand className="text-light fw-bold">iNotebook</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-sm-auto">
            <LinkContainer className="text-light ms-sm-2  fw-bold" to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about" className="text-light ms-sm-2 fw-bold">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          {localStorage.getItem("token") ? (
            <Button onClick={handleLogout} variant="outline-success">
              Log Out
            </Button>
          ) : (
            <Form>
              <LinkContainer to="/login">
                <Button className=" mx-2" variant="outline-warning">
                  Login
                </Button>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Button className=" mx-2" variant="outline-danger">
                  Sign Up
                </Button>
              </LinkContainer>
            </Form>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
