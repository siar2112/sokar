import React from 'react';
import { useUserSession } from './UserSession';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Logo from './logo.js';
import {useNavigate} from 'react-router-dom';


const Navigation = () => {
    const { userSession, setUserSession } = useUserSession();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await fetch('http://localhost:9000/logout');

        if (response.ok) {
            localStorage.removeItem('userSession');
            // Remove the user session
            setUserSession(null);
            alert('Logout successful');
            navigate("/");
        } else {
            console.log('Logout failed');
        }
    }

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
                    <Nav.Link style={{ marginLeft: "40px" }} href="/eventsPage">Events</Nav.Link>
                    <Nav.Link style={{ marginLeft: "40px" }} href="/profile">Profile</Nav.Link>
                    <NavDropdown style={{ marginLeft: "40px" }} title="Stats" id="basic-nav-dropdown">
                        <NavDropdown.Item style={{ backgroundColor: "purple"}}  href="/teams">Players</NavDropdown.Item>
                        <NavDropdown.Item style={{ backgroundColor: "purple"}} href="/teams">Teams</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link style={{ marginLeft: "40px" }} href="/teams">Contact Us</Nav.Link>
                    {
                        userSession
                            ?(  <>

                                    <Nav.Link style={{ marginLeft: "40px" }} onClick={handleLogout}>Logout</Nav.Link>
                                    <Navbar.Text style={{ color:"white", border:"solid white 1px", padding:"10px", marginLeft: "40px" }}>
                                        Welcome {userSession.username}
                                    </Navbar.Text>
                                </>
                            )
                            : <Nav.Link style={{ marginLeft: "40px" }} href="/login">Login</Nav.Link>
                    }

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
