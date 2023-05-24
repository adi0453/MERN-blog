import React from "react";
import Card from "react-bootstrap/Card";
import {
  redirect,
  useLoaderData,
  Link,
  Form,
} from "react-router-dom";
import {
  AiOutlineExpandAlt,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";

const Home = () => {
  const blogs = useLoaderData();
  return blogs.map((eachBlog) => {
    return (
      <Card
        key={eachBlog._id}
        style={{
          display: "inline-block",
          width: "17em",
          margin: "2em",
        }}
      >
        <Card.Body>
          <Card.Title>{eachBlog.title}</Card.Title>
          <Card.Text>
            {eachBlog.content}
          </Card.Text>
          <Link to={eachBlog._id}>
            <AiOutlineExpandAlt />
          </Link>
          <Form method="put" action="edit">
            <Link to={`${eachBlog._id}/edit`}>
              <AiOutlineEdit />
            </Link>
          </Form>
          <Link to={`${eachBlog._id}/delete`}>
            <AiOutlineDelete />
          </Link>
        </Card.Body>
      </Card>
    );
  });
};


export async function allBlogsLoader() {
  const response = await fetch("http://localhost:5000/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 401) {
    return redirect("/auth/login");
  }
  return response.json();
}

export default Home;
