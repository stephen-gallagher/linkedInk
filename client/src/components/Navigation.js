import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';
import { Container } from 'react-bootstrap';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

export default function Navigation(props) {
  const handleLogout = () => {
    logout().then(() => {
      props.setUser(null);
    });
  };
  return (
    <div>
      <Navbar
        className="righteous bg-darkBlue"
        collapseOnSelect
        expand="lg"
        // bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/">Linked Ink</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/explore">Explore</Nav.Link>
              {props.user &&
                (props.user.role === 'User' ? (
                  <Nav.Link href={`/${props.user._id}/user-dashboard`}>
                    My Dashboard
                  </Nav.Link>
                ) : (
                  <Nav.Link href={`/${props.user._id}/artist-profile`}>
                    My Profile
                  </Nav.Link>
                ))}
              <NavDropdown title="Find" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/all-artists">
                  Find an Artist
                </NavDropdown.Item>
                <NavDropdown.Item href="/all-studios">
                  Find a Studio
                </NavDropdown.Item>

                <NavDropdown.Divider />
                {props.user && props.user.role === 'Artist' && (
                  <NavDropdown.Item href="/new-studio">
                    Add a Studio
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
            <Nav>
              {!props.user && (
                <>
                  <Nav.Link href="#deets">Log In</Nav.Link>
                  <Nav.Link eventKey={2} href="/signup">
                    Sign Up
                  </Nav.Link>
                </>
              )}
              {props.user && (
                <Nav.Link href="/" onClick={() => handleLogout()}>
                  Log Out
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
