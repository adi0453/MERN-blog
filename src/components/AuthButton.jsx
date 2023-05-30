import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function AuthButton(props) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  useEffect(() => {
    const status = async () => {
      const response = await fetch("http://localhost:5000/authentication", {
        method: "GET",
        credentials: "include",
      });
      response.status === 200?setLoggedIn(true):setLoggedIn(false);
    };
    status()
  });

  function logout() {
    // fetch("http://localhost:5000/api/auth/logout", {
    fetch("http://165.22.208.229:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/home");
    toast.info("Logged out succesfully")
    setLoggedIn(false);
  }
  return (
    <>
      <div>
        {loggedIn&&<Button variant="outline-info" className="mx-3" onClick={logout}>
          Log out
        </Button>}
        {!loggedIn&&
        <Link to="/auth/login">
        <Button variant="outline-info" className="mx-3">
          Log In
        </Button>
        </Link>}
      </div>
    </>
  );
}
