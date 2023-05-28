import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, NavLink } from "react-router-dom";
import AuthButton from "./AuthButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NavigationBar() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>NoteVerse</Navbar.Brand>
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
        <AuthButton/>
      </Navbar>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />

      <main>
        <Outlet />
      </main>
    </>
  );
}

