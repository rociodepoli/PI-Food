import "./App.css";
import { Route } from "react-router-dom";
import React from "react";
import Landing from "./components/LandingPage/Landing";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import { RecipeDetail } from "./components/Details/Detail";

function App() {
  return (
    
    <div className="App">
      <Route exact path={"/"}>
        <Landing />
      </Route>
      <Route path={"/home"}>
        <Home/>
      </Route>
      <Route path={"/recipes/:id"}>
        <RecipeDetail/>
      </Route>
      <Route path={"/createRecipe"}>
        <Form/>
      </Route>
    </div>
  );
}

export default App;
