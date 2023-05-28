import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { redirect, useLoaderData, Link, Form, useNavigate  } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export default function EachNote() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch("http://localhost:5000/notes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (response.status === 401) {
                return navigate("/auth/login")
            }
              response.json().then((data) => {
                setBlogs(data);
              })
            
        }
        fetchBlog();
    })


    return(
            blogs.map((eachBlog) => {
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
          <div>
            <Card.Title>{eachBlog.title}</Card.Title>
          </div>
          <div>
            <Card.Text>
              {eachBlog.content.substring(0, 100) + "..."}
              <Link to={eachBlog._id}>Read more</Link>
            </Card.Text>
          </div>
          <Form
            method="put"
            action="edit"
            style={{ display: "inline", margin: "0em 1em" }}
          >
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
  })
    )
}