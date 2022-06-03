import React from 'react';
import { Link } from 'react-router-dom';
import S from '../styles/LandingPage.module.css';

export default function HomeClick() {
  return (
    <div>
      <Link to={'/home'}>
        <button>Enter</button>
      </Link>
    </div>
  );
}
