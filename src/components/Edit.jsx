import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Form as RouterForm, redirect, useLoaderData } from "react-router-dom";

function Edit() {
    const blog = useLoaderData();
    const { title, content } = blog;
    const [field, setField] = useState({ title, content });
    const changeHandler = (e) => {
        setField({ ...field, [e.target.name]: e.target.value });
    };
  return (
    <RouterForm method="POST" className="m-3">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title of your note..."
          name="title"
          value={field.title}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={3} name="content" value={field.content} onChange={changeHandler}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </RouterForm>
  );
}

export async function editLoader({ params }) {
    const blog = await fetch("http://localhost:5000/notes/" + params.blogId, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if(blog.status === 200){
        return blog.json();
    }
    return redirect("/contact")
}

export async function blogEditAction({params, request}) {
    const data = await request.formData();
    const blog = await fetch("http://localhost:5000/notes/" + params.blogId, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: data.get("title"),
            content: data.get("content"),
        })
    });
    if(blog.status === 200){
        return redirect("/home")
    }
    return null;
}

export default Edit;
