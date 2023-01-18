import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Card from "../Card/Card";
import NavBar from "../NavBar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getDiets , orderByName} from "../../actions/actions";
import { Pagination } from "../Pagination/Pagination";
import styles from './Home.module.css'

export default function Home(props) {
const dispatch= useDispatch();
const recipes= useSelector(state=> state.showedrecipes);
const [search, setSearch]=useState('')
const [order, setOrder]= useState({
  name:'default',
  score:'default'
})

const [page,setPage]=useState(1);
const recipespage= 9;
const end= page * recipespage; 
const start= end- recipespage;
const currentp= recipes ? recipes.slice(start,end) : console.log('no me toma recipes');
const totalp= Math.ceil(recipes.length / recipespage)

useEffect(()=>{
  dispatch(getDiets());
  dispatch(getAllRecipes());
  console.log(recipes)
}, [])

const previous=()=>{
  setPage(page-1)
}

const next= ()=>{
  setPage(page+1)
}

const pagenumber=(pageN)=>{
setPage(pageN)
}

// const ordernameHandler=(e)=>{
//   e.preventDefault();
//   dispatch(orderByName(e.target.value));
//   setOrder(`Order by Name: ${e.target.value}`)
//   console.log(e.target)
//   setPage(1)
//     }

  return (
    <div className={styles.container}>
      <NavBar/>
      <SearchBar search={search} setSearch={setSearch} setOrder={setOrder} order={order} setPage={setPage} />
      {/* <div>
        <select id='ordername' defaultValue={order.name} onChange={(e)=> ordernameHandler(e)}>
            <option value='default' disabled> Order by name</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
          
        </div> */}
      <Pagination totalp={totalp} page={page} previous={previous} next={next} pagenumber={pagenumber}/>
      <div className={styles.recipes}>
        {currentp.length>0 ?
         currentp.map(r=>{
          return(
            
            <Card
            key={r.id}
        name={r.name}
        id={r.id}
        image={r.image}
        healthScore= {r.healthScore}
        diets={r.diets.map(d=> d)}
        />
        
        )}) : <span>Loading...</span> 
      }
        
      </div>
    </div>
  );
}
