import React from "react";
import ReactDOM from "react-dom/client";
import AddBlog, { blogAction } from "./components/AddBlog";
import NavigationBar from "./components/NavigationBar";
import Contact from "./components/Contact";
import Home, { blogLoader } from "./components/Home";
import Authenticate from "./components/Authenticate";
import SignUp, { signupAction } from "./components/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login, { loginAction } from "./components/Login";
// import {signUp as userAction } from './backend'

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    children: [
      {
        path: "addBlogs",
        element: <AddBlog />,
        action: blogAction,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        loader: blogLoader,
        path: "home",
        element: <Home />,
      },
      {
        path: "auth",
        element: <Authenticate />,
        children: [
          {
            path: "signup",
            element: <SignUp />,
            action: signupAction,
          },
          {
            path: "login",
            element: <Login />,
            action: loginAction,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// ReactDOM.render(
//   document.getElementById("root"),
//   <>
//   <h1>This is my react app</h1>
//   </>
// )
