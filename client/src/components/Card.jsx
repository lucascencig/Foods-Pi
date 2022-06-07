import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import S from '../styles/Card.module.css';

export default function Card({ name, score, image, id, diets, Dish, Steps }) {
  return (
    <div className={S.cardBody}>
      <Link to={'/recipes/' + id}>
        <img className={S.image} src={image} alt="not found" />

        <p className={S.titulo}>Name: {name}</p>
        <ul>Type Diet: {diets?.join('; ')}</ul>
        <p>Dish type: {Dish}</p>
        {/* <p>Score: {score}</p> */}
      </Link>
    </div>
  );
}
