import React from "react";
import { NavLink } from "react-router-dom";

export default function Card(props) {
  return (
    <NavLink to={`/recipes/${props.id}`}>
      <div>
        
        <h1>{props.name}</h1>
        <img src={props.image} alt={props.name} />
        {props.diets ? <ul>{props.diets.map((diet) => (
          <li key={diet}>{diet}</li>
        ))}</ul>
        : ''
        }
        <h4> HealthScore: {props.healthScore}</h4>
      </div>
    </NavLink>
  );
}
