import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import AuthenticatedWrapper from "../components/authentication-wrappers/AuthenticatedWrapper";
import AnonymousWrapper from "../components/authentication-wrappers/AnonymousWrapper";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          Joe Kausits Music
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to={"/press-kit"}>
              Press Kit
            </Nav.Link>
            <AuthenticatedWrapper>
              <Nav.Link as={Link} to={"/venues"}>
                Venues
              </Nav.Link>
              <Nav.Link as={Link} to={"/logout"}>
                Log Out
              </Nav.Link>
            </AuthenticatedWrapper>
            <AnonymousWrapper>
              <Nav.Link as={Link} to={"/login"}>
                Login
              </Nav.Link>
            </AnonymousWrapper>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
