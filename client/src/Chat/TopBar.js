import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router-dom";


function TopBar({ location }) {
  const { pathname } = location;

  return (
    <Navbar bg="transparent" expand="lg" variant="light">
      <Navbar.Brand href="#home">PlanIT Chat Room </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/chat" active={pathname === "/chat"}>
            Join Another Chat Room
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(TopBar);
