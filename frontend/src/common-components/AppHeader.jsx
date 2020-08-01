import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logoimage from "../img/tracker_icon.png";
import { Navbar, Nav } from "react-bootstrap";
import "../common-css/styles.css";

class AppHeader extends Component {
  render() {
    return (
      <section>
        {/*The navigation bar libraries are taken from https://react-bootstrap.github.io/components/navbar/ [7]. */}
        <Navbar className="navHeader" expand="lg">
          <Navbar.Brand href="/">
            <img className="logoimage" src={logoimage} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="text-light font-weight-bold"
          >
            Menu
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link className="text-light font-weight-bold" href="/login">
                Login
              </Nav.Link>
              <Nav.Link
                className="text-light font-weight-bold"
                href="/register"
              >
                Register
              </Nav.Link>
              <Nav.Link
                className="text-light font-weight-bold"
                href="/about-us"
              >
                About Us
              </Nav.Link>
              <Nav.Link
                className="text-light font-weight-bold"
                href="/contact-us"
              >
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </section>
    );
  }
}

export default AppHeader;
