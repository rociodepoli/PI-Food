import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
 

  return (
    <nav>
      <div>
        <NavLink to={"/home"}>HOME</NavLink>
      </div>
      <div>
        <NavLink to={"/createRecipe"}>CREATE YOUR RECIPE</NavLink>
      </div>
    </nav>
  );
}
