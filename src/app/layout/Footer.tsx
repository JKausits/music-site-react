import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar fixed="bottom" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          href={"https://www.facebook.com/JoeKausitsMusic"}
          target={"_blank"}
        >
          <i className="bi bi-facebook"></i>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Footer;
