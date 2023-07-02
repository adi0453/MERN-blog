import React from "react";
import { Form as RouterForm, Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Login() {
  return (
    <RouterForm method="post" style={{padding: "1em"}} id="container-html">
      <div id="auth-content">
        <h2>Login</h2>
        <div style={{display: "flex", justifyContent: "left", margin: "0.2em 0em", outline:"none"}}>
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
        <p>or sign-up/Login using</p>
        <span className="social-icons">
        <Link to="/auth/signup">
          <i className=" fa fa-light fa-envelope" style={{margin: '1em'}}></i>
        </Link>
        <Link to="http://localhost:5000/api/auth/google">
        {/* <Link to="http://165.22.208.229:5000/api/auth/google"> */}
          <i className="fa-brands fa-google" id="google"></i>
          </Link>
          <i className="fa-brands fa-twitter" id="twitter" style={{margin: '1em'}}></i>
          <i className="fa-brands fa-facebook-f" id="facebook"></i>
        </span>
    </div>
    </RouterForm>
  );
}

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const response = await 
  // toast.promise(
    fetch("http://localhost:5000/api/auth/login", {
    // fetch("http://165.22.208.229:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
    }),
    
  })
  // {
  //   pending: 'Promise is pending',
  //   success: 'Promise resolved 👌',
  //   error: 'Promise rejected 🤯'
  // }
  // )
  if(response.status === 401){
    toast.error('Wrong Credentials, Please try again')
    return redirect("/auth/login")
  }
  toast.success('Login Successful')
  return redirect("/home")
};
