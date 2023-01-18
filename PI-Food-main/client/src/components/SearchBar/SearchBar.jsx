import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanRecipes,
  filterDiet,
  getAllRecipes,
  getDiets,
  getRecipesByName,
  orderByName,
  orderByScore,
} from "../../actions/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const allrecipes = useSelector((state) => state.allrecipes);
  const showedrecipes = useSelector((state) => state.showedrecipes);
  const [filter, setFilter] = useState("default");

  useEffect(() => {
    dispatch(getDiets());
    console.log(diets);
  }, [dispatch, setFilter, props.setOrder, props.order]);

  const changeHandler = (e) => {
    props.setSearch(e.target.value);
    console.log("input", props.search);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(cleanRecipes());
    dispatch(getRecipesByName(props.search));
    props.setSearch("");
  };

  const showallHandler = (e) => {
    dispatch(cleanRecipes());
    dispatch(getAllRecipes());
    e.preventDefault();
    props.setPage(1);
    setFilter("default");
    // props.setOrder(`default`);
    document.getElementById("ordername").value = "default";
    document.getElementById("orderscore").value = "default";
  };

  const orderHandler = (e) => {
    e.preventDefault();
    if (e.target.name === "name") {
      dispatch(getAllRecipes())
      dispatch(orderByName(e.target.value));
    }
    if (e.target.name === "score") {
      dispatch(getAllRecipes())
      dispatch(orderByScore(e.target.value));
    }
    props.setOrder({ ...props.order, [e.target.name]: e.target.value });
    props.setPage(1);
  };

  const filterHandler = (e) => {
    e.preventDefault();
    dispatch(filterDiet(e.target.value));
    console.log(e.target.value);
    //console.log(allrecipes.filter(r=> r.diets.includes('lacto ovo vegetarian')))
    props.setPage(1);
    setFilter(e.target.value);
    document.getElementById("ordername").value = "default";
    document.getElementById("orderscore").value = "default";
  };
  return (
    <>
      <div>
        <div className={styles.divsearch}>
          <div className={styles.searchname}>
            <input
              className={styles.input}
              type={"text"}
              name="name"
              placeholder="search recipe"
              value={props.search}
              onChange={(e) => changeHandler(e)}
            ></input>
            <button className={styles.btn} onClick={(e) => searchHandler(e)}>
              Search
            </button>
          </div>
          <br />

          <button
            className={styles.showallbtn}
            onClick={(e) => showallHandler(e)}
          >
            Show All Recipes
          </button>
        </div>
        <div className={styles.divorders}>
          <div className={styles.divinput}>
            <select
            className={styles.inputs}
              id="ordername"
              name="name"
              defaultValue={props.order.name}
              onChange={(e) => orderHandler(e)}
            >
              <option value="default" disabled>
                {" "}
                Order by Name
              </option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>

          <div className={styles.divinput}>
            <select
            className={styles.inputs}
              id="orderscore"
              name="score"
              defaultValue={props.order.score}
              onChange={(e) => orderHandler(e)}
            >
              <option value="default" disabled>
                {" "}
                Order by Health Score
              </option>
              <option value="high">Highest Score</option>
              <option value="low">Lowest Score</option>
            </select>
          </div>
          <div className={styles.divinput}>
            <select
            className={styles.inputs}
              name="filter"
              id="filterdiets"
              value={filter}
              onChange={(e) => {
                filterHandler(e);
                //setFilter('default')
              }}
            >
              <option value="default" disabled>
                Filter by Diets
              </option>
              {diets ? diets.map((d) => {
                return (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                );
              }): ''}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
