import React from "react";
import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <div>
        <h1>Welcome to</h1>
        <h1>Delicipes!</h1>
      </div>
      <h3>Discover over 1000 recipes</h3>
      <NavLink to={"/home"}>
        <button>START NOW!</button>
      </NavLink>
    </>
  );
}
