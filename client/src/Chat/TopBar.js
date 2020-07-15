import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router-dom";


function TopBar({ location }) {
  const { pathname } = location;

  return (
    <Navbar bg="transparent" expand="lg" variant="light">
      <Navbar.Brand href="#home">PlanIT Chat Room </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/chat" active={pathname === "/chat"}>
            Join Another Chat Room
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(TopBar);
