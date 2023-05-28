// import "../index.css";
import React from "react";
import EachNote from "./EachNote";
import AddBlogButton from "./AddBlogButton";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
    <EachNote />
    <Link to = "/addBlogs" id="addButton">
      <svg
      // id="addButton"
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        fill="currentColor"
        className="bi bi-plus-circle-fill"
        viewBox="0 0 16 16"
        // style={{ position: "fixed", bottom: "2em", right: "2em", color: "#db7a16", cursor: "pointer", transition: "all 0.3s ease"}}
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
      </svg>
      </Link >
    </>
  );
};

export default Home;
