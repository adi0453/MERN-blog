import React, { useState, useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function LoadBar(props) {
  const navigation = useNavigation();
  const progress =
    navigation.state === "submitting"
      ? 50
      : navigation.state === "loading"
      ? 75
      : 100;

  return (
    <div>
      <LoadingBar
        color="#f11946"
        progress={
          navigation.state === "submitting"
            ? 50
            : navigation.state === "loading"
            ? 75
            : 100
        }
        onLoaderFinished={0}
      />
    </div>
  );
}
