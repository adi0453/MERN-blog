import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function LogOutButton() {
    return (
        <Link to="/auth/logout">
        <Button className="btn btn-primary">
        Log In
        </Button>
        </Link>

    );
}