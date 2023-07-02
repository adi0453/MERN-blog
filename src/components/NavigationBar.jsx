import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import AuthButton from "./AuthButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NavigationBar() {
  return (
    <>
      <div id="container">
        <div id="hamburger">
          <div className="hamburger-lines"></div>
          <div className="hamburger-lines"></div>
          <div className="hamburger-lines"></div>
        </div>
        <i className="fa-brands fa-square-pied-piper" id="brand-logo"></i>
        <ul id="menu-items">
          <li><NavLink to="home" className="menu-items nav-home">Home</NavLink></li>
          <NavLink to="addBlogs" className="menu-items nav-blog">Blog</NavLink>
          <li className="menu-items nav-category">Categories</li>
          <NavLink to="contact" className="menu-items nav-about">About</NavLink>
        </ul>
        <input
          type="text"
          name="search"
          id="search-bar"
          placeholder="Search your topic..."
        />
        <i className="fa-regular fa-heart" id="fav"></i>
        <i className="fa-regular fa-user"></i>
        <AuthButton />
      </div>
      <div id="sidebar" className="hidden">
        <ul>
            <NavLink to="home" className={"navlinkStyle"}>
              Home
            </NavLink>
          <NavLink to="addBlogs" className={"navlinkStyle"}>
            Blog
          </NavLink>
          <li>Categories</li>
          <NavLink to="contact" className={"navlinkStyle"}>
            Contact
          </NavLink>
        </ul>
      </div>
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
