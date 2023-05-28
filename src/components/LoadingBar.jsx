import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function LoadBar(props) {
  const [progress, setProgress] = useState(50);
  return (
    <>
    <div>
      <LoadingBar
        color="#f11946"
        progress={progress}
        // onLoaderFinished={() => {
        //   setProgress(0);
        // }}
      />
    <Outlet />
    </div>
    </>
  );
}
