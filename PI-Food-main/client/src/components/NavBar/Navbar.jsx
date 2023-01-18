import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './Nav.module.css'

export default function NavBar() {
 

  return (
    <nav className={styles.container}>
      <div >
        <NavLink className={styles.link} to={"/home"}>HOME</NavLink>
      </div>
      <div >
        <NavLink className={styles.link} to={"/createRecipe"}>CREATE YOUR RECIPE</NavLink>
      </div>
    </nav>
  );
}
