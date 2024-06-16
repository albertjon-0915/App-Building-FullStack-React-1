import { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../App.css";

import { Link, NavLink } from "react-router-dom";

import UserContext from "../UserContext";

export default function AppNavbar() {
     const { user } = useContext(UserContext);

     return (
          <Navbar bg="black" expand="lg">
               <Container fluid>
                    <Navbar.Brand as={Link} className="text-white" to="/">
                         Fitness<span className="text-primary">Tracker</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                         <Nav className="ms-auto">
                              <Nav.Link as={NavLink} className="text-white" to="/" exact="true">
                                   Home
                              </Nav.Link>
                              {user.id ? (
                                   <>
                                        <Nav.Link as={Link} className="text-white" to={"/workouts"}>
                                             Workouts
                                        </Nav.Link>
                                        <Nav.Link as={Link} className="text-white" to="/logout">
                                             Logout
                                        </Nav.Link>
                                   </>
                              ) : (
                                   <>
                                        <Nav.Link as={Link} className="text-white" to="/login">
                                             Login
                                        </Nav.Link>
                                        <Nav.Link as={Link} className="text-white" to="/register">
                                             Register
                                        </Nav.Link>
                                   </>
                              )}
                         </Nav>
                    </Navbar.Collapse>
               </Container>
          </Navbar>
     );
}
