import React from "react";
// import { userNotes as blogs} from "./Login";
import Accordion from "react-bootstrap/Accordion";
import { redirect, useLoaderData } from "react-router-dom";

// const blogs = []

const Home = () => {
  const blogs = useLoaderData();
  return blogs.map((eachBlog) => {
    return (
      <Accordion key={eachBlog._id} className="m-3">
        <Accordion.Item >
          <Accordion.Header>{eachBlog.title}</Accordion.Header>
          <Accordion.Body>{eachBlog.content}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  });
};

// const Home = () => {
//   const blogs = useLoaderData();
//   return(
//     console.log(blogs)
//   )
// }

export async function blogLoader() {
  const response = await fetch("http://localhost:5000/notes",{
    method: "GET",
    headers:{
      "Content-Type": "application/json"
    },
    credentials: "include",
  })
  if(response.status === 401){
    return redirect("/auth/login")
  }
  return response.json();
}


export default Home;
