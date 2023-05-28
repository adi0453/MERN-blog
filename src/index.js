import React from "react";
import ReactDOM from "react-dom/client";
import AddBlog, { blogAction } from "./components/AddBlog";
import NavigationBar from "./components/NavigationBar";
import Contact from "./components/Contact";
import Home, { allBlogsLoader } from "./components/Home";
import Authenticate from "./components/Authenticate";
import SignUp, { signupAction } from "./components/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login, { loginAction } from "./components/Login";
import Blog, { blogLoader, blogDeleteAction } from "./components/Blog";
import Edit, { editLoader, blogEditAction } from "./components/Edit";
import "./index.css"



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
        // loader: allBlogsLoader,
        path: "home",
        element: <Home />,
      },
      {
        path: "home/:blogId",
        element: <Blog />,
        loader: blogLoader,
      },
      {
        path: "home/:blogId/edit",
        element: <Edit />,
        action: blogEditAction,
        loader: editLoader,
      },
      {
        path: "home/:blogId/delete",
        loader: blogDeleteAction,
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
          // {
          //   path: "logout",
          //   loader: logoutAction
          // }
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   {/* <App/> */}
    <RouterProvider router={router}/>
  </React.StrictMode>
);
