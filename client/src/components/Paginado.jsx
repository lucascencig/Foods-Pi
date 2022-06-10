import React from 'react';
import { Link } from 'react-router-dom';
import S from '../styles/Paginado.module.css';

export default function Paginadofn({
  foodsPerPage,
  getFood,
  paginado,
  currentPage,
}) {
  let pageNumbers = [];
  for (let i = 0; i < Math.ceil(getFood / foodsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  console.log(currentPage);

  if (currentPage === 1) {
    pageNumbers = pageNumbers.slice(currentPage - 1, currentPage + 2); // corte de la 0 a la 4
  }

  if (currentPage > 1 && currentPage < Math.ceil(getFood / foodsPerPage)) {
    pageNumbers = pageNumbers.slice(currentPage - 2, currentPage + 1);
  }
  if (currentPage === Math.ceil(getFood / foodsPerPage)) {
    console.log(currentPage, 'pageu');
    pageNumbers = pageNumbers.slice(currentPage - 2, currentPage); // corte 8 a la 12
  }

  // if (curretPage === 11) {
  //   pageNumbers = pageNumbers.slice(
  //     Math.ceil(getFood / foodsPerPage) - 3,
  //     Math.ceil(getFood / foodsPerPage)
  //   ); // corte de la 0 a la 4
  // }
  console.log(pageNumbers);

  return (
    <nav>
      <ul className={S.paginado}>
        <button className={S.botonesCostados} onClick={() => paginado('start')}>
          Inicio
        </button>
        <button
          className={S.botonesCostados}
          onClick={() => paginado('previous')}
        >
          Anterior
        </button>
        {pageNumbers &&
          pageNumbers.map(n => (
            <li key={n}>
              <button className={S.boton} onClick={() => paginado(n)}>
                {n}
              </button>
            </li>
          ))}
        <button className={S.botonesCostados} onClick={() => paginado('next')}>
          Siguiente
        </button>
        <button
          className={S.botonesCostados}
          onClick={() => paginado('finish')}
        >
          Final
        </button>
      </ul>
    </nav>
  );
}
