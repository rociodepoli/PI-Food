import './App.css';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path={'/'} ></Route>
      <Route path={'/home'}></Route>
      <Route path={'/recipes/:id'}></Route>
      <Route path={'/createRecipe'}></Route>

    </div>
  );
}

export default App;
