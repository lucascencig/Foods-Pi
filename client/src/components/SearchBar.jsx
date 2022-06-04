import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipesName, searchBarName } from '../actions/actions';
import S from '../styles/SearchBar.module.css';

export default function SearchBar({ search }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    try {
      dispatch(getRecipesName(name));
      search();
    } catch (error) {
      return error;
    }
    setName('');
  }

  return (
    <div className={S.contenedor}>
      <input
        className={S.search}
        type="text"
        placeholder="Search recipe..."
        value={name}
        onChange={handleChange}
      />
      <button className={S.botonSearch} type="submit" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}
