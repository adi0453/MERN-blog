import React from "react";
import { useLoaderData, redirect } from "react-router-dom";
import { toast } from "react-toastify";

export async function blogLoader({ params }) {
  const blog = await fetch("http://localhost:5000/notes/" + params.blogId, {
  // const blog = await fetch("http://165.22.208.229:5000/notes/" + params.blogId, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return blog;
}

export async function blogDeleteAction({ params }) {
  const status = await fetch("http://localhost:5000/notes/" + params.blogId, {
  // const status = await fetch("http://165.22.208.229:5000/notes/" + params.blogId, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(status.status === 200){
    toast.success('Note Deleted Successfully')
  } else{
    toast.error('Something went wrong, Please try again')
  }
  return redirect("/home");
}

export default function Blog() {
  const note = useLoaderData();
  return (
    <div id="full-blog-page">
      <h1 id="blog-title">{note.title}</h1>
      <p id="blog-body">{note.content}</p>
    </div>
  );
}
