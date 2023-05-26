import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  Outlet,
  NavLink,
} from "react-router-dom";
import AuthButton from "./AuthButton";
import LoadBar from "./LoadingBar";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NavigationBar() {
//  toast.success('🦄 Wow so easy!')
  return (
    <>
      <LoadBar />
      <Navbar bg="light" variant="light">
        <div></div>
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
          <AuthButton signupButton="SignUp" />
        </NavLink>
        <NavLink to="auth/login">
          <AuthButton signinButton="SIgnIn" />
        </NavLink>
      </Navbar>
      <ToastContainer
        position="top-center"
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

// export function barLoader() {
//   const navigation = useNavigation();
//   const progress =
//     navigation.state === "submitting"
//       ? 50
//       : navigation.state === "loading"
//       ? 75
//       : 100;
//   return progress;
// }
