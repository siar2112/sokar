import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Logo from './logo.js';


const Navigation = () => {
    return (
        <Navbar expand="lg" style={{fontSize: "25px", backgroundImage:"linear-gradient(to bottom left,blue,purple)"}}>
            <Navbar.Brand href="#home">
                <Logo />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto" style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                    <Nav.Link style={{ marginLeft: "40px" }} href="/">Home</Nav.Link>
                    <Nav.Link style={{ marginLeft: "40px" }} href="/about">About</Nav.Link>
                    <Nav.Link style={{ marginLeft: "40px" }} href="/events">Events</Nav.Link>
                    <Nav.Link style={{ marginLeft: "40px" }} href="/teams">Profile</Nav.Link>
                    <NavDropdown style={{ marginLeft: "40px" }} title="Stats" id="basic-nav-dropdown">
                        <NavDropdown.Item  href="/teams">Action</NavDropdown.Item>
                        <NavDropdown.Item href="/teams">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="/teams">Something else here</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link style={{ marginLeft: "40px" }} href="/teams">Contact Us</Nav.Link>
                    <Nav.Link style={{ marginLeft: "40px" }} href="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
