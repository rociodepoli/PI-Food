import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./landing.module.css";

export default function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.div}>
        <div>
          <h1>Welcome to</h1>
          <h1 className={styles.title}>Delicipes!</h1>
        </div>
        <h3>Discover over 1000 recipes</h3>
        <NavLink to={"/home"}>
          <button className={styles.btn}>START NOW!</button>
        </NavLink>
      </div>
    </div>
  );
}
