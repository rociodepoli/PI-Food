import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanRecipes, getRecipeId } from "../../actions/actions";
import NavBar from "../NavBar/Navbar";

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
    <div>
      <NavBar />
      <>
        <h2>{detail.name}</h2>
        <div>
          <img src={detail.image} alt={detail.name} />
          <div>
            <h4> Health Score: {detail.healthScore}</h4>
          </div>
          <div>
            <h4>Diets:</h4>
            {/* <p>{detail.diets}</p> */}
            <div>
              {detail.diets ? (
                detail.diets.map((d) => {
                  return <ul key={d}>{d}</ul>;
                })
              ) : (
                <h6>No diets registered</h6>
              )}
            </div>
          </div>
        </div>
        <div>
          <div>
            <h3>Summary</h3>
            <p>
              {detail.summary ? detail.summary.replace(/<[^>]*>/g, "") : ""}
            </p>
          </div>
          <div>
            <h3>How To</h3>
            {detail.steps ? (
              <p>{detail.steps.replace(/<[^>]*>/g, "")}</p>
            ) : (
              <p>
                There are no instructions to follow for this recipe, but we're
                working on it!
              </p>
            )}
          </div>
        </div>
      </>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
