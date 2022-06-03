import axios from 'axios';
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

// import {
//   GET_RECIPES,
//   GET_TYPES,
//   GET_DATABASE,
//   GET_STATE_ID,
//   GET_RECIPES_NAME,
//   GET_RECIPES_ID,
//   FILTER_BY_SEARCHBAR,
//   FILTER_BY_ORDER,
//   ORDER_BY_SCORE,
//   FILTER_BY_DIETS,
//   URLLOCALFOOD,
// } from './TypesActions.js';

console.log(URLLOCALFOOD);

//TODAS LAS RECETAS
export function getRecipesAll() {
  return function (dispatch) {
    return fetch('http://localhost:3001/recipes')
      .then(res => res.json())
      .then(foods => dispatch({ type: GET_RECIPES, payload: foods }))
      .catch(e => {
        console.log(e);
      });
  };
}

//TIPOS DE DIETAS
export function getTypes() {
  return function (dispatch) {
    try {
      axios
        .get(`${URLLOCALFOOD}/types`)
        .then(types => dispatch({ type: GET_TYPES, payload: types.data }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDatabase() {
  return async function (dispatch) {
    try {
      let dataBase = await axios.get(`${URLLOCALFOOD}/recipes/dates`);

      return dispatch({ type: GET_DATABASE, payload: dataBase.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postRecipes(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URLLOCALFOOD}/recipe`, payload);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

//RECETAS POR NOMBRE
export function getRecipesName(name) {
  return async function (dispatch) {
    try {
      const recipes = await axios.get(`${URLLOCALFOOD}/recipes?name=${name}`);
      console.log(recipes.data);
      return dispatch({
        type: GET_RECIPES_NAME,
        payload: recipes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//DETALLE DE RECETA
export function getDetail(id) {
  return async function (dispatch) {
    try {
      const recipes = await axios.get(`${URLLOCALFOOD}/recipes/${id}`);
      return dispatch({
        type: GET_RECIPES_ID,
        payload: recipes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchId(payload) {
  return {
    type: GET_STATE_ID,
    payload: payload,
  };
}

export function searchBarName(payload) {
  return {
    type: FILTER_BY_SEARCHBAR,
    payload: payload,
  };
}

export function getFilterByDiets(payload) {
  return {
    type: FILTER_BY_DIETS,
    payload: payload,
  };
}

export function filterByOrder(payload) {
  return {
    type: FILTER_BY_ORDER,
    payload: payload,
  };
}

export function orderByScore(payload) {
  return {
    type: ORDER_BY_SCORE,
    payload: payload,
  };
}
