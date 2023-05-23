import React from "react";
import { Outlet } from "react-router-dom";


export const user = true;
export default function Authenticate() {
  return (
    <>
    <Outlet/>
    </>
  );
}

