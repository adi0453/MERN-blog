import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, NavLink } from "react-router-dom";
import AuthButton from "./AuthButton";

export default function NavigationBar() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav className="me-auto m-3">
            <NavLink to="home" className={"navlinkStyle"}>
              Home
            </NavLink>
            <NavLink to="addBlogs" className={"navlinkStyle"}>
              blogs
            </NavLink>
            <NavLink to="contact" className={"navlinkStyle"}>
              contact us
            </NavLink>
          </Nav>
        </Container>
        <NavLink to="auth/signup">
          <AuthButton signupButton="SignUp"/> 
        </NavLink>
        <NavLink to="auth/login">
          <AuthButton signinButton="SIgnIn"/> 
        </NavLink>
      </Navbar>
      
      <main>
        <Outlet />
      </main>
    </>
  );
}
