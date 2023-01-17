const initialState = {
  allrecipes: [],
  showedrecipes: [],
  recipedetail: {},
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_RECIPE":
      return {
        ...state,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "GET_ALL_RECIPES":
      return {
        ...state,
        allrecipes: action.payload,
        showedrecipes: action.payload,
      };
    case "GET_RECIPES_QUERY":
      return {
        ...state,
        showedrecipes: action.payload,
      };
    case "CLEAN_RECIPES":
      return {
        ...state,
        showedrecipes: [],
        recipedetail: {},
      };
    case "GET_RECIPE_ID":
      return {
        ...state,
        recipedetail: action.payload,
      };
    case "ORDER_BY_NAME":
      let ordername = [...state.showedrecipes];
      ordername=
        action.payload === "a-z"
          ? state.showedrecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              else return 0;
            })
          : state.showedrecipes.sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              else return 0;
            });
      return {
        ...state,
        showedrecipes: ordername,
      };

    case "ORDER_BY_SCORE":
      let orderscore =[...state.showedrecipes];
      orderscore=
        action.payload === "low"
          ? state.showedrecipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
              else return 0;
            })
          : state.showedrecipes.sort(function (a, b) {
              if (a.healthScore < b.healthScore) return 1;
              if (a.healthScore > b.healthScore) return -1;
              else return 0;
            });
      return {
        state,
        showedrecipes: orderscore,
      };
    case "FILTER_DIET":
      let recipes= state.allrecipes
      let filtered= recipes.filter(r=> r.diets.includes(action.payload))
      //console.log(state.showedrecipes.map(r=> r.diets))
      return{
        ...state,
        showedrecipes: filtered
      }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;

let array = [
  { name: "Lentil Salad" },
  { name: "Fried chips" },
  { name: "Tomato Pasta" },
];

function sort(a, b) {
  console.log(a.name);
  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  else return 0;
}
