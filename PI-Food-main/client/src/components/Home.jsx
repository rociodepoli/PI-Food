import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Card from "./Card";

export default function Home(props) {
const [input, setInput]=useState('');

const changeHandler=(e)=>{
setInput(e.target.value);
console.log('input', input)
}

const clickHandler=(e)=>{
  e.preventDefault()
}

  return (
    <>
      <h1>Esto es el Home</h1>
      <nav>
        <div>
        <NavLink to={'/home'}>HOME</NavLink>
        </div>
        <div>
        <NavLink to={'/createRecipe'}>CREATE YOUR RECIPE</NavLink>
        </div>
        <div>
          <input
            type={"text"}
            name="name"
            placeholder="search recipe"
            value={input}
            onChange={(e) => changeHandler(e)}
          ></input>
          <button onClick={e=> clickHandler(e)}>Search</button>
      </div>
      </nav>
      <div>
        <Card
        name='Pepito'
        id={54668}
        image='https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1'
        healthScore= {80}
        diets={['vegan', 'pepe']}
        />
      </div>
    </>
  );
}
