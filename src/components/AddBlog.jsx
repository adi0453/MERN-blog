import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Form as RouterForm, redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddBlog() {
  return (
    <RouterForm method="POST" className="m-3">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title of your note..."
          name="title"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={3} name="content" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </RouterForm>
  );
}

export async function blogAction({ request }) {
  const data = await request.formData();
  // const ifAdded = await fetch("http://localhost:5000/notes/add", {
  const ifAdded = await fetch("http://165.22.208.229:5000/notes/add", {
    method: "POST",
    credentials: "include",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: data.get("title"),
      content: data.get("content"),
    }),
  });
  if(ifAdded.status === 200){
    toast.success('Note Added Successfully')
    return redirect("/home")
  }
  toast.error('Something went wrong, Please try again')
  return redirect("/contact");
}