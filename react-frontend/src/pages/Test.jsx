import React from "react";
import "../App.css";

//console.log("Test page was requested");

const Test = () => {
  console.log("Inside Test...");
  return (
    <>
      <div>
        <br></br>
        <h2>Hello from Test</h2>
        <p>This page doesn't require the user to be logged in</p>
      </div>
    </>
  );
};

export default Test;
