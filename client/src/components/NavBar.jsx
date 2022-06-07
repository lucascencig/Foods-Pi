import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  filterByOrder,
  orderByScore,
  getFilterByDiets,
} from '../actions/actions';
import { useDispatch } from 'react-redux';
import S from '../styles/NavBar.module.css';

export default function NavBar({ typesAll, setCurrentPage, setOrder }) {
  const dispatch = useDispatch();

  function handleFilterByDiets(evt) {
    dispatch(getFilterByDiets(evt.target.value));
    setCurrentPage(1);
    setOrder(`${evt.target.value}`);
    console.log(evt.target.value);
  }

  function handleFilterByOrder(evt) {
    evt.preventDefault();
    dispatch(filterByOrder(evt.target.value));
    setCurrentPage(1);
    setOrder(`${evt.target.value}`);
  }

  function handleOrderByScore(evt) {
    evt.preventDefault();
    dispatch(orderByScore(evt.target.value));
    setCurrentPage(1);
    setOrder(`${evt.target.value}`);
  }

  return (
    <div className={S.nav}>
      <ul className={S.filterContenedor}>
        <select
          className={S.filtros}
          defaultValue="Order"
          onChange={evt => handleFilterByOrder(evt)}
        >
          <option>Filter by Order</option>
          <option key="up" value="up">
            Ascendent
          </option>
          <option key="down" value="down">
            Descendent
          </option>
        </select>

        <select
          className={S.filtros}
          defaultValue="Order by Score"
          onChange={evt => handleOrderByScore(evt)}
        >
          <option key="SSc" value="SSc">
            Spooncular Score
          </option>
          <option key="HSc" value="HSc">
            Health Score
          </option>
        </select>

        <select
          className={S.filtros}
          defaultValue="Filter by Type"
          onChange={evt => handleFilterByDiets(evt)}
        >
          <option>Filter by Diets</option>
          {typesAll?.map(type => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </ul>

      <div className={S.divP}>
        <Link to={'/create'}>
          <button className={S.add}>Create a new recipe</button>
        </Link>
      </div>
    </div>
  );
}
