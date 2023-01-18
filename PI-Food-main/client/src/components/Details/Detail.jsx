import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanRecipes, getRecipeId } from "../../actions/actions";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/Navbar";
import styles from "./Detail.module.css";

export function RecipeDetail(props) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.recipedetail);
  const recipeId = useParams();
  console.log(recipeId);
  useEffect(() => {
    dispatch(getRecipeId(recipeId.id));
    return () => {
      dispatch(cleanRecipes());
    };
  }, []);

  return recipeId.id === detail.id ? (
    <div className={styles.back}>
      <NavBar />
      <div className={styles.container}>
        <div >
          <h2 className={styles.title}>{detail.name}</h2>
        </div>
        <div className={styles.divinfo}>
          <div className={styles.firstblock}>
            <img className={styles.img} src={detail.image} alt={detail.name} />
            <div className={styles.health}>
              <h4> Health Score: {detail.healthScore}</h4>
            </div>
            <div className={styles.health}>
              <h4>Diets:</h4>
              {/* <p>{detail.diets}</p> */}
              <div >
                {detail.diets ? (
                  detail.diets.map((d) => {
                    return <ul className={styles.diets}key={d}>{d}</ul>;
                  })
                ) : (
                  <h6>No diets registered</h6>
                )}
              </div>
            </div>
          </div>
          <div className={styles.secondblock}>
            <div className={styles.divtext}>
              <h3>Summary</h3>
              <p className={styles.sum}>
                {detail.summary ? detail.summary.replace(/<[^>]*>/g, "") : ""}
              </p>
            </div>
            <div className={styles.divtext}>
              <h3>How To</h3>
              {detail.steps ? (
                <p className={styles.steps}>{detail.steps.replace(/<[^>]*>/g, "")}</p>
              ) : (
                <p className={styles.steps}>
                  There are no instructions to follow for this recipe, but we're
                  working on it!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading/>
  );
}
