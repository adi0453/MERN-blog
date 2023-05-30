import React from "react";
import { Form as RouterForm, Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  return (
    <>
   <RouterForm method="post" style={{padding: "1em"}} id="container-html">
      <div >
        <h2>Sign-up</h2>
        <div style={{display: "flex", justifyContent: "left", margin: "0.2em 0em"}}>
          <label htmlFor="username">Email:</label>
        </div>
        <div className="input">
          <i className="fa fa-thin fa-envelope"></i>
          <input
            type="email"
            name="username"
            id="email"
            placeholder="Type your email"
          />
        </div>
        <div style={{display: "flex", justifyContent: "left", margin: "0.2em 0em"}}>
          <label htmlFor="password">Password:</label>
        </div>
        <div className="input">
          <i className="fa fa-light fa-lock"></i>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Type your password"
          />
        </div>
        <div>
          <button type="submit" className="btn-html">submit</button>
        </div>
        <p>or sign-up using</p>
        <span className="social-icons">
        {/* <Link to="http://localhost:5000/api/auth/google"> */}
        <Link to="http://165.22.208.229:5000/api/auth/google">
          <i className="fa-brands fa-google" id="google"></i>
          </Link>
          <i className="fa-brands fa-twitter" id="twitter" style={{margin: '1em'}}></i>
          <i className="fa-brands fa-facebook-f" id="facebook"></i>
        </span>
    </div>
    </RouterForm>
  </>
  );
}

export async function signupAction({ request }) {
  const formData = await request.formData();
  // const signUp = await fetch("http://localhost:5000/api/auth/signup", {
  const signUp = await fetch("http://165.22.208.229:5000/api/auth/signup", {
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

export async function  googleAction() {
  const response = await fetch("http://localhost:5000/api/auth/google")
  if(response.status === 200){
    toast.success('Sign-up Successful')
    return redirect("/home")
  }
  toast.error('Something went wrong, Please try again')
  return("/auth/signup");
}
