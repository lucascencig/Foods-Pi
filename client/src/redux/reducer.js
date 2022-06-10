const POST_RECIPES = 'POST_RECIPES';
const GET_RECIPES = 'GET_RECIPES';
const GET_DATABASE = 'GET_DATABASE';
const GET_TYPES = 'GET_TYPES';
const GET_STATE_ID = 'GET_STATE_ID';

const GET_RECIPES_ID = 'GET_RECIPES_ID';
const GET_RECIPES_NAME = 'GET_RECIPES_NAME';
const FILTER_BY_SEARCHBAR = 'FILTER_BY_SEARCHBAR';
const FILTER_BY_ORDER = 'FILTER_BY_ORDER';
const ORDER_BY_SCORE = 'ORDER_BY_SCORE';
const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
const URLLOCALFOOD = 'http://localhost:3001';

const initialState = {
  recipes: [],
  recipesAll: [],
  types: [],
  detail: [],
};

export const reducerroot = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      console.log(action.payload);
      return {
        ...state,
        recipes: action.payload,
        recipesAll: action.payload,
      };

    case GET_RECIPES_ID: {
      return {
        ...state,
        detail: action.payload,
      };
    }

    case GET_TYPES: {
      return {
        ...state,
        types: action.payload,
      };
    }

    case GET_RECIPES_NAME: {
      const addRecipe = state.recipesAll;
      return {
        ...state,
        recipes: Array.isArray(action.payload)
          ? action.payload
          : [action.payload],
        recipesAll: addRecipe,
      };
    }

    case FILTER_BY_SEARCHBAR:
      const filtSearch = state.recipesAll;
      const filtOnState = filtSearch.filter(recipe => {
        let name = recipe.name.toLowerCase();
        if (name.includes(action.payload)) return recipe;
      });
      return {
        ...state,
        recipes: filtOnState,
      };

    case ORDER_BY_SCORE:
      const recypesByScore =
        action.payload === 'SSc'
          ? state.recipesAll.sort((a, b) => {
              if (a.score - b.score < 0) return 1;
              else return -1;
            })
          : state.recipesAll.sort((a, b) => {
              if (a.healthScore - b.healthScore < 0) return 1;
              else return -1;
            });

      const recipesFilter =
        action.payload === 'SSc'
          ? state.recipes.sort((a, b) => {
              if (a.score - b.score < 0) return 1;
              else return -1;
            })
          : state.recipes.sort((a, b) => {
              if (a.healthScore - b.healthScore < 0) return 1;
              else return -1;
            });
      console.log(recypesByScore.length);
      console.log(recipesFilter.length);
      return {
        ...state,
        recipes:
          recypesByScore.length === recipesFilter.length
            ? recypesByScore
            : recipesFilter,
      };

    case FILTER_BY_ORDER:
      const recypesByOrder =
        action.payload === 'up'
          ? state.recipesAll.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              else return -1;
            })
          : state.recipesAll.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              else return -1;
            });

      const recypesByOrfil =
        action.payload === 'up'
          ? state.recipes.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              else return -1;
            })
          : state.recipes.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              else return -1;
            });

      return {
        ...state,
        recipes:
          recypesByOrder.length === recypesByOrfil.length
            ? recypesByOrder
            : recypesByOrfil,
      };

    case FILTER_BY_DIETS:
      const recipes_All = state.recipesAll;

      const filtByDiets =
        action.payload === 'Filter by type'
          ? state.recipesAll
          : recipes_All.filter(recipe => {
              console.log(recipe.diets);
              if (recipe.diets.length > 0) {
                if (recipe.diets.find(element => element === action.payload))
                  return recipe;

                console.log(recipe);
              }
            });

      const filter2 =
        action.payload === 'Filter by type'
          ? state.recipesAll
          : state.recipes.filter(recipe => {
              console.log(recipe.diets);
              if (recipe.diets.length > 0) {
                if (recipe.diets.find(element => element === action.payload))
                  return recipe;
              }

              console.log(recipe);
            });
      return {
        ...state,
        recipes: filtByDiets.length === filter2.length ? filtByDiets : filter2,
      };
      return {
        ...state,
        recipesAll:
          filtByDiets.length === filter2.length ? filtByDiets : filter2,
      };

    case 'DELETE':
      return {
        ...state,
        detail: [],
      };

    default:
      return state;
  }
};
