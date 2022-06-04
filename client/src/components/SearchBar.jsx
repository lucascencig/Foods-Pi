import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getRecipesAll,
  getRecipesName,
  searchBarName,
} from '../actions/actions';
import S from '../styles/SearchBar.module.css';

// export default function SearchBar({ search }) {
//   const dispatch = useDispatch();
//   const [name, setName] = useState('');

//   function handleChange(e) {
//     e.preventDefault();
//     setName(e.target.value);
//   }

//   // function handleSubmit(e) {
//   //   try {
//   //     dispatch(getRecipesName(name));
//   //     search();
//   //   } catch (error) {
//   //     return error;
//   //     alert('No hay ninguna receta con ese nombre');
//   //   }

//   //   setName('');
//   // }
//   function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       if (name.length) {
//         dispatch(getRecipesName(name));
//       } else {
//         alert('Debe escribir un nombre de un pais');
//       }
//     } catch (err) {
//       throw new Error(err);
//     }
//   }

//   return (
//     <div className={S.contenedor}>
//       <input
//         className={S.search}
//         type="text"
//         placeholder="Escribir..."
//         value={name}
//         onChange={handleChange}
//       />
//       <button className={S.botonBuscar} type="Submit" onClick={handleSubmit}>
//         Buscar
//       </button>
//     </div>
//   );
// }

export default function SearchBar({ onSearch }) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (name.length) {
        dispatch(getRecipesName(name));
      } else {
        alert('Debe escribir el nombre de una receta');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <form>
      <input
        className={S.input}
        type="text"
        placeholder="Escribir..."
        value={name}
        onChange={handleChange}
      />
      <button className={S.botonBuscar} type="Submit" onClick={handleSubmit}>
        Buscar
      </button>
    </form>
  );
}
