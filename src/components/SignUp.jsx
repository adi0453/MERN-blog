import React from "react";
import { Form as RouterForm } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  return (
    <RouterForm method="post" className="m-3">
      <h1>Sign-up</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="username" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </RouterForm>
  );
}

export async function signupAction({ request }) {
  const formData = await request.formData();
  const signUp = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: formData.get("username"), password: formData.get("password")}),
  })
  if(signUp.status === 200){
    toast.success('Sign-up Successful')
    return redirect("/auth/login")
  }
  toast.error('Something went wrong, Please try again')
  return("/auth/signup")
   
}
