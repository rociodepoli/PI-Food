import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Card.module.css'

export default function Card(props) {
  return (
    <NavLink to={`/recipes/${props.id}`}>
      <div className={styles.container}>
        
        <h1 className={styles.name}>{props.name}</h1>
        <img className={styles.img} src={props.image} alt={props.name} />
        {props.diets ? <ul className={styles.ul}>{props.diets.map((diet) => (
          <li className={styles.diets} key={diet}>{diet}</li>
        ))}</ul>
        : ''
        }
        <h4 className={styles.healthscore}> HealthScore: {props.healthScore}</h4>
      </div>
    </NavLink>
  );
}
