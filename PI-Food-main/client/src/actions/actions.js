import axios from "axios";

export function createRecipe(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/recipes",
        payload
      );
      console.log(response.data)
      return dispatch({
        type: "CREATE_RECIPE",
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/diets");
      return dispatch({
        type: "GET_DIETS",
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function getAllRecipes() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/recipes");
      console.log(response)
      return dispatch({
        type: "GET_ALL_RECIPES",
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function getRecipesByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );
      return dispatch({
        type: "GET_RECIPES_QUERY",
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function cleanRecipes(){
  return {
    type: 'CLEAN_RECIPES'
  }
}

export function getRecipeId(id){
  return async function(dispatch){
    try {
      const response= await axios.get(`http://localhost:3001/recipes/${id}`);
      console.log(response.data)
      return dispatch({
        type: 'GET_RECIPE_ID',
        payload: response.data
      })
    } catch (error) {
      return error
    }
  }
}

export function orderByName(payload){
  return {
    type: 'ORDER_BY_NAME',
    payload
  }
}

export function orderByScore(payload){
  return{
    type:'ORDER_BY_SCORE',
    payload
  }
}

export function filterDiet(payload){
  return{
    type: 'FILTER_DIET',
    payload
  }
}