import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Form as RouterForm, redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddBlog() {
  return (
    <RouterForm method="POST" className="m-3">
      <div id="entire-addBlog">
        <div id="addBlog-form">
          <h3 className="blog-default">Add blog</h3>
          <div id="addBlog-input">
            <label>Blog title:</label>
            <input type="text" name="title"  />
            <label>Add content:</label>
            <textarea
              name="content"
              
              cols="10"
              rows="10"
              style={{margin: "0.8em 0em"}}
            ></textarea>
            <button type="submit" id="blog-submit">
              <p style={{fontSize: "1.2em", fontFamily: 'Fira Sans, sans-serif'}}>Submit</p>{" "}
            </button>
          </div>
        </div>
      </div>
    </RouterForm>
  );
}

export async function blogAction({ request }) {
  const data = await request.formData();
  const ifAdded = await fetch("http://localhost:5000/notes/add", {
    // const ifAdded = await fetch("http://165.22.208.229:5000/notes/add", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.get("title"),
      content: data.get("content"),
    }),
  });
  if (ifAdded.status === 200) {
    toast.success("Note Added Successfully");
    return redirect("/home");
  }
  toast.error("Something went wrong, Please try again");
  return redirect("/contact");
}
