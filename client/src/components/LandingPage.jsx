import React from 'react';
import { Link } from 'react-router-dom';
import S from '../styles/LandingPage.module.css';

export default function HomeClick() {
  return (
    <div className={S.landing}>
      <h1>Recetas Para Todos</h1>
      <div className={S.boton}>
        <Link to={'/home'}>
          <button>Enter</button>
        </Link>
      </div>
    </div>
  );
}
