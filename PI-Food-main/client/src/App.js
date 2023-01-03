import "./App.css";
import { Route } from "react-router-dom";
import React from "react";
import Landing from "./components/Landing";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Route exact path={"/"}>
        <Landing />
      </Route>
      <Route path={"/home"}>
        <Home/>
      </Route>
      <Route path={"/recipes/:id"}></Route>
      <Route path={"/createRecipe"}></Route>
    </div>
  );
}

export default App;
