import React from "react";
import { useLoaderData, redirect } from "react-router-dom";

export async function blogLoader({ params }) {
  const blog = await fetch("http://localhost:5000/notes/" + params.blogId, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return blog;
}

export async function blogDeleteAction({ params }) {
  await fetch("http://localhost:5000/notes/" + params.blogId, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return redirect("/home");
}

export default function Blog() {
  const note = useLoaderData();
  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}
